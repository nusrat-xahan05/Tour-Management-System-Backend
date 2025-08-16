import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);

        console.log("Connected To MongoDB");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is Listening To Port ${envVars.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

(async() => {
    await startServer();
})()
