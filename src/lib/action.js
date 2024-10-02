import { unstable_noStore as noStore } from "next/cache";
import connectToDb from "./utils";
import User from "./model";

export const getUser = async(id)=>{
  noStore();
  try {
    await connectToDb();
    const user = await User.findById(id);
    console.log("user",user);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
  }

