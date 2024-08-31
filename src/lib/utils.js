const mongoose = require('mongoose');


import dotenv from 'dotenv';

dotenv.config(); // .env.local dosyasını yükler

const connection = {};

export const connectToDb = async () => {
  console.log("mongoooo", process.env.MONGO); // MONGO değerini loglayın
    try {
        if (connection.isConnected) {
            console.log("using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connection.isConnected = db.connections[0].readyState;
        console.log("MongoDB connected:", connection.isConnected);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
        throw new Error("Failed to connect to MongoDB");
    }
}
