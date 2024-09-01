// import mongoose from "mongoose";
// const connection = {};

// export const connectToDb = async () => {
//     try {
//         if(connection.isConnected){
//             console.log("using existing connection");
//             return;
//         }
//        const db =  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO) ;
//        connection.isConnected = db.connections[0].readyState;
//        console.log("mongo db ", connection.isConnected )
//        console.log("mongo db connected")
//       } catch (error) {
//         console.log(error);
//         throw new Error(error)
//       }
// }

import mongoose from "mongoose";


const connectToDb = async () => {
    console.log("process.env.NEXT_PUBLIC_MONGO",process.env.NEXT_PUBLIC_MONGO)
    console.log("mongoose",mongoose);
    console.log("Mongoose connect function:", mongoose.connect);
    if(mongoose.connections[0].readyState){
        console.log("using existing connection");
        return true;
    }
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO) ;
        console.log("mongo connection successful");
        return true;
      } catch (error) {
        console.log(error);
        throw new Error(error)
      }
}

export default connectToDb; 
// const mongoose = require("mongoose");
// const connection = {};

// export const connectToDb = async () => {
//     console.log("mongoose",mongoose);
//     console.log("Mongoose connect function:", mongoose.connect);

//     try {
//         if (connection.isConnected) {
//             console.log("Mevcut bağlantı kullanılıyor");
//             return;
//         }

//         const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         connection.isConnected = db.connections[0].readyState;
//         console.log("MongoDB'ye başarıyla bağlanıldı");
//     } catch (error) {
//         console.log("Bağlantı hatası:", error);
//         throw new Error(error);
//     }
// };


// import mongoose from "mongoose";

// const DATABASE_URL = process.env.NEXT_PUBLIC_MONGO;

// if (!DATABASE_URL) {
//   throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDb() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectToDb;

