import createHttpError from "http-errors";

export const errorHandler = (error, req, res, next) => {
    const {status = 500, message} = error;
    throw createHttpError( status, message);
};