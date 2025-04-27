import {Router} from "express";
import {validateBody} from "../utils/validateBody.js";
import {
    authLoginSchema,
    authNewPasswordSchema,
    authRegistrationSchema,
    authResetPasswordSchema
} from "../validation/auth.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {
    loginController,
    logoutController,
    refreshController,
    registerUserController,
    resetPasswordController,
    setNewPasswordController
} from "../controllesrs/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authRegistrationSchema), ctrlWrapper(registerUserController));

authRouter.post('/login', validateBody(authLoginSchema), ctrlWrapper(loginController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/send-reset-email', validateBody(authResetPasswordSchema), ctrlWrapper(resetPasswordController))

authRouter.post('/reset-pwd', validateBody(authNewPasswordSchema), ctrlWrapper(setNewPasswordController));

export default authRouter;