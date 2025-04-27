import Joi from "joi";
import {emailRegex} from "../constants/auth.js";

export const authRegistrationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
})

export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
})

export const authResetPasswordSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
})

export const authNewPasswordSchema = Joi.object({
    password: Joi.string().min(8).required(),
    token: Joi.string().required(),
})