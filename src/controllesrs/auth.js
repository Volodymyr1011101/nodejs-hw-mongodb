import {
    loginUser,
    logoutUser,
    refreshToken,
    registerUser,
    resetPassword,
    setNewUserPassword,
    verifyUser
} from "../services/auth.js";

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

export const verifyController = async (req, res) => {
    await verifyUser(req.query.token);

    res.json({
        status: 200,
        message: "Successfully verified the user!",
    });
}

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body.email);

    res.json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {}
    })
}

export const setNewPasswordController = async (req, res) => {
    const {token, password} = req.body;
    await setNewUserPassword(password, token);

    res.json({
        status: 200,
        message: 'Password has been successfully reset.',
        data: {}
    })
}