import { User } from "./model";
import connectToDb from "./utils";


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
export const register = async (formData) => {
  const {username, email, password, passwordRepeat} = Object.fromEntries(formData);
  console.log("Kayıt formu verileri:", {username, email, password, passwordRepeat});

  if (passwordRepeat !== password) {
      return { error: "Şifreler uyuşmuyor!" };
  }
  try {
      await connectToDb(); // Bağlantı fonksiyonu 'await' ile çağrılmalı
      const user = await User.findOne({ username });
      if (user) {
          return { error: "Kullanıcı zaten mevcut" };
      }

      const newUser = new User({
          username,
          email,
          password,
      });
      await newUser.save();
      console.log("Yeni kullanıcı başarıyla kaydedildi");
      return { success: true };

  } catch (error) {
      console.log("Kayıt hatası:", error);
      return { error: "Bir şeyler ters gitti" };
  }
};
