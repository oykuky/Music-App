import User  from "../../lib/model";
import connectToDb from "../../lib/utils";


//formData: form verilerini içerir.
//Object.fromEntries(formData): Form verilerini bir nesneye dönüştürür.
// export const register = async (formObject) => {
//     console.log("FORMFORM", formObject)
//     // formData'dan username, email, img, password ve passwordRepeat alanlarını alır.
//    const {username,email,password,passwordRepeat} = Object.fromEntries(formObject);
//    if(passwordRepeat !== password) {
//     return { success: false, message: "Password does not match!" };
//    }
//    try {
//      await connectToDb();
//      const user = await User.findOne({username});
//      if(user){
//        return {error: "User already exists"};
//      }
 
//      const newUser = new User({
//        username,
//        email,
//        password,
//      })
//      await newUser.save();
//      console.log("new user saved successfully to db");
//      return { success: true };
   
//    } catch (error) {
//      console.log(error)
//      return {error: "something went wrong"}
//    }
//  }
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, email, password, passwordRepeat } = req.body;
  
      if (password !== passwordRepeat) {
        return res.status(400).json({ error: "Şifreler uyuşmuyor!" });
      }
  
      try {
        await connectToDb();
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: "Kullanıcı zaten mevcut!" });
        }
  
        const newUser = new User({
          username,
          email,
          password,
        });
        await newUser.save();
        return res.status(201).json({ success: true });
      } catch (error) {
        console.error("Kayıt hatası:", error);
        return res.status(500).json({ error: "Bir şeyler ters gitti" });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}