import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {getEnvVariable} from "./utils/getEnvVariable.js";
import {logger} from "./middlewares/logger.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import contactsRouter from "./routes/contacts.js";

dotenv.config();
export const startServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(logger)

    app.get("/ping", (req, res) => {
        res.json({
            message: "Pong!",
        })
    })

    app.use('/contacts', contactsRouter);

    app.use(notFoundHandler)

    app.use(errorHandler)

    const port = Number(getEnvVariable('PORT', 3000));

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}