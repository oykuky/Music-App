import { getServerSession } from "next-auth/next";
import connectToDb from "@/lib/utils";
import User from "@/lib/model";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === 'GET') { // Eğer gelen HTTP isteği GET ise
    try {
      const session = await getServerSession(req, res, authOptions); //sunucu tarafında oturum bilgisini almak için
      
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await connectToDb();
      const user = await User.findById(session.user.id);  // Oturuma ait kullanıcı ID'sine göre kullanıcı veritabanında aranır
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ favorites: user.favorites || [] }); // Kullanıcının favori şarkıları JSON olarak döndürülür.
    } catch (error) {
      console.error("GET Favorites Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
   else if (req.method === 'POST') {  // Eğer gelen HTTP isteği POST ise
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { song } = req.body; // İstek gövdesinden şarkı bilgisi alınır.
      
      await connectToDb();
      const user = await User.findById(session.user.id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const existingSongIndex = user.favorites.findIndex(fav => fav.id === song.id);// Şarkının zaten favorilerde olup olmadığı kontrol edilir
      
      if (existingSongIndex > -1) {
         // Eğer şarkı favorilerde varsa, favorilerden kaldır
        user.favorites.splice(existingSongIndex, 1);
      } else {
        // Eğer şarkı favorilerde değilse, favorilere ekle
        user.favorites.push(song);
      }
      
      await user.save();
      
      return res.status(200).json({ favorites: user.favorites }); // Güncellenmiş favori şarkılar JSON olarak döndürülür
    } catch (error) {
      console.error("POST Favorites Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}