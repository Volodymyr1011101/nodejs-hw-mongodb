import createHttpError from "http-errors";
import {findSession, findUser} from "../services/auth.js";

export const authenticate = async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        return next(createHttpError(401, 'Authorization token is required'));
    }

    const [bearer, accessToken] = authorization.split(' ');

    if (bearer !== 'Bearer') {
        return next(createHttpError(401, 'Header must be a Bearer'));
    }

    const session = await findSession({accessToken});

    if (!session) {
        return next(createHttpError(401, 'Session not found'));
    }

    if (session.accessTokenValidUntil < Date.now()) {
        return next(createHttpError(401, 'Session token is expired'));
    }

    const user = await findUser({_id: session.userId});

    if (!user) {
        return next(createHttpError(401, 'User not found'));
    }

    req.user = user;

    next()
}