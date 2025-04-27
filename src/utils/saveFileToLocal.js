import fs from 'fs/promises';
import path from "path";
import {UPLOADS_FILES_DIR} from "../constants/index.js";
import {getEnvVariable} from "./getEnvVariable.js";

export const saveFileToLocal = async function (file) {
    const newPath = path.join(UPLOADS_FILES_DIR, file.filename);
    await fs.rename(file.path, newPath);
    return `${getEnvVariable('APP_DOMAIN')}/uploads/${file.filename}`;
}