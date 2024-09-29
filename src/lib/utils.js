import mongoose from "mongoose";
const connection = {};

const connectToDb = async () => {
    // console.log("mongoose",mongoose);
    console.log("Mongoose connect function:", mongoose.connect);
    try {
      if(mongoose.connections[0].readyState){
          console.log("using existing connection");
          return true;
      }
       const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO) ;
       connection.isConnected = db.connections[0].readyState;
        console.log("mongo connection successful");
        return true;
      } catch (error) {
        console.log(error);
        throw new Error(error)
      }
}

export default connectToDb; 
