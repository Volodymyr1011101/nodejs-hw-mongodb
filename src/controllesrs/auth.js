import {loginUser, logoutUser, refreshToken, registerUser} from "../services/auth.js";

const setUpSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenExpires,
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenExpires
    })
}

export const registerUserController = async (req, res) => {
    const result = await registerUser(req.body);

    const data = {
        username: result.username,
        email: result.email,
    }

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data
    });
}

export const loginController = async (req, res) => {
    const session = await loginUser(req.body);

    setUpSession(res, session);

    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken
        }
    })
}

export const refreshController = async (req, res) => {
    const session = await refreshToken(req.cookies);

    setUpSession(res, session);

    res.json({
        status: 200,
        message: "Session refresh successful",
        data: {
            accessToken: session.accessToken
        }
    })
}

export const logoutController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send()
}