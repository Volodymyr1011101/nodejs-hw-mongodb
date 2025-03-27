import mongoose from "mongoose";
import {getEnvVariable} from "../utils/getEnvVariable.js";

export const initMongoCollection = async () => {
    const password = getEnvVariable('MONGODB_PASSWORD')
    const user = getEnvVariable('MONGODB_USER')
    const url = getEnvVariable('MONGODB_URI')
    const db = getEnvVariable('MONGODB_DB')
    try {
    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('Mongo connection successfully established!')
    }catch(err) {console.log(err); throw err; }
}