import { getServerSession } from "next-auth/next";
import connectToDb from "@/lib/utils";
import User from "@/lib/model";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await connectToDb();
      const user = await User.findById(session.user.id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ favorites: user.favorites || [] });
    } catch (error) {
      console.error("GET Favorites Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { song } = req.body;
      
      await connectToDb();
      const user = await User.findById(session.user.id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const existingSongIndex = user.favorites.findIndex(fav => fav.id === song.id);
      
      if (existingSongIndex > -1) {
        // Remove from favorites
        user.favorites.splice(existingSongIndex, 1);
      } else {
        // Add to favorites
        user.favorites.push(song);
      }
      
      await user.save();
      
      return res.status(200).json({ favorites: user.favorites });
    } catch (error) {
      console.error("POST Favorites Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}