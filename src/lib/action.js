import { User } from "./model";
import { connectToDb } from "./utils";


//formData: form verilerini içerir.
//Object.fromEntries(formData): Form verilerini bir nesneye dönüştürür.
export const register = async (formData) => {
    console.log("FORMFORM", formData)
    // formData'dan username, email, img, password ve passwordRepeat alanlarını alır.
   const {username,email,password,passwordRepeat} = Object.fromEntries(formData);
   if(passwordRepeat != password) {
     return {error: "Password does not match!"};
   }
   try {
     connectToDb();
     const user = await User.findOne({username});
     if(user){
       return {error: "User already exists"};
     }
 
     const newUser = new User({
       username,
       email,
       password,
       img,
     })
     await newUser.save();
     console.log("new user saved successfully to db");
     return { success: true };
   
   } catch (error) {
     console.log(error)
     return {error: "something went wrong"}
   }
 }
