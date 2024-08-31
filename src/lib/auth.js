// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDb } from "@/lib/utils";
// import { User } from "@/lib/model";

// // Kullanıcı girişini doğrulayan ve kullanıcıyı döndüren asenkron fonksiyon
// const login = async (credentials) => {
//     try {
//       await connectToDb();
//       const user = await User.findOne({ username: credentials.username });

//       if (!user) throw new Error("Wrong credentials!");

//       const isPasswordCorrect = (credentials.password === user.password);
//       if (!isPasswordCorrect) throw new Error("Wrong credentials!");
//       return user;
//     } catch (err) {
//       console.log('Login Error:', err.message); // Hata mesajını loglayın
//       throw new Error("Failed to login!");
//     }
// };

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);
//           if (user) {
//             return user;  // Bu kısımda kullanıcıyı döndürmelisiniz.
//           } else {
//             return null;
//           }
//         } catch (error) {
//           console.log("Authorize Error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log(user, account, profile);
//       return true;
//     },
//   }
// });
