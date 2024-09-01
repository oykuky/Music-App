import mongoose from "mongoose";
const connection = {};

const connectToDb = async () => {
    try {
        if(connection.isConnected){
            console.log("using existing connection");
            return;
        }
       const db =  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO) ;
       connection.isConnected = db.connections[0].readyState;
       console.log("mongo db ", connection.isConnected )
       console.log("mongo db connected")
      } catch (error) {
        console.log(error);
        throw new Error(error)
      }
}

 export default connectToDb;

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

