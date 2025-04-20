import {Router} from "express";
import {validateBody} from "../utils/validateBody.js";
import {authLoginSchema, authRegistrationSchema} from "../validation/auth.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {loginController, logoutController, refreshController, registerUserController} from "../controllesrs/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authRegistrationSchema), ctrlWrapper(registerUserController));

authRouter.post('/login', validateBody(authLoginSchema), ctrlWrapper(loginController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;