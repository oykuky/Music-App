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

      return res.status(200).json({ playlist: user.playlist || [] }); 
    } catch (error) {
      console.error("GET playlist Error:", error);
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

      const existingSongIndex = user.playlist.findIndex(p => p.id === song.id);
      
      if (existingSongIndex > -1) {
         // Eğer şarkı playlistde varsa, playlistten kaldır
        user.playlist.splice(existingSongIndex, 1);
      } else {
        // Eğer şarkı playlistde değilse, playliste ekle
        user.playlist.push(song);
      }
      
      await user.save();
      
      return res.status(200).json({ playlist: user.playlist }); // Güncellenmiş playlist şarkılar JSON olarak döndürülür
    } catch (error) {
      console.error("POST playlist Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}