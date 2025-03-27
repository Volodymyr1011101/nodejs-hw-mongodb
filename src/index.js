import {startServer} from "./server.js";
import {initMongoCollection} from "./db/initMongoCollection.js";

await initMongoCollection();

startServer();