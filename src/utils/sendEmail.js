import nodemailer from "nodemailer";
import {getEnvVariable} from "./getEnvVariable.js";
import createHttpError from "http-errors";

const host = getEnvVariable('SMTP_HOST');
const port = getEnvVariable('SMTP_PORT');
const user = getEnvVariable('SMTP_USER');
const pass = getEnvVariable('SMTP_PASSWORD');
const from = getEnvVariable('SMTP_FROM');
const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
        user,
        pass,
    }
})

export async function sendEmail(data) {
    try {
        await transporter.sendMail({...data, from});
    } catch (error) {
        throw createHttpError(500, 'Failed to send the email, please try again later.');
    }
}