import Joi from 'joi'
import {typeList} from "../constants/contacts.js";

export const addContactSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).messages({
        "any.required": "The name is required",
    }),
    email: Joi.string().email(),
    phoneNumber: Joi.string().required().messages({
        "any.required": "The phone number is required",
        "string.base": "The phone number must be a string",
    }),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).messages({
        "any.required": "The contactType must be 'work' | 'home' | 'personal'",
    }),
    age: Joi.number().required().messages({
        "any.required": "The age is required",
    }),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList),
    age: Joi.number(),
})