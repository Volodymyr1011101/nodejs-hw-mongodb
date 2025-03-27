import express from "express";
import cors from "cors";
import pino from "pino-http";
import dotenv from "dotenv";
import {getEnvVariable} from "./utils/getEnvVariable.js";
import {getContactById, getContacts} from "./services/contacts.js";

dotenv.config();
export const startServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(pino({
        transport: {
            target: "pino-pretty",
        }
    }))

    app.get('/api/contacts', async (req, res) => {
        try {
            const data = await getContacts();

            res.json({
                status: 200,
                message: "Successfully retrieved movies.",
                data,
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Error retrieving movies.",
                error: error.message,
            });
        }
    })

    app.get('/api/contacts/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const data = await getContactById(id);

            if(!data){
                return res.status(404).json({
                    status: 404,
                    message: `Could not find ${id}`
                })
            }

            res.json({
                status: 200,
                message: `Successfully retrieved contact ${id}`,
                data,
            });
        }catch (error) {
            console.log(error);
        }
    })

    app.get("/api/ping", (req, res) => {
        res.json({
            message: "Pong!",
        })
    })

    app.use((req, res) => {
        res.status(404).json({
            message: `${req.url} not found`,
        })
    })

    app.use((req, res) => {
        res.status(500).json({
            message: `${err}`,
        })
    })

    const port = Number(getEnvVariable('PORT', 3000));

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}