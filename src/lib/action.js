import { unstable_noStore as noStore } from "next/cache";
import connectToDb from "./utils";
import User from "./model";
import {toggleFavoriteRedux} from "@/redux/musicSlice";


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

  // export const upFavorites = async (userId,song) => { ///db'ye kaydeder
  //   try {
  //     await connectToDb();
  //     const user = await User.findOne({ email: userId }); // Burada userId aslında email
  //     console.log("USER in upFavorites  ", user);
  //     if (!user) throw new Error("User not found!");
  
  //     // Eğer favorilerdeyse çıkar, değilse ekle
  //     const isFavorite = user.favorites.some((favorite) => favorite.id === song.id);
  
  //     if (isFavorite) {
  //       user.favorites = user.favorites.filter((favorite) => favorite.id !== song.id);
  //     } else {
  //       user.favorites.push(song);
  //     }
  //     await user.save();
  //     console.log("favorites saved to db")
  //     return user;
  //   } catch (err) {
  //     console.error(err);
  //     throw new Error("Failed to update favorites");
  //   }
  // }
  export const upFavorites = async (userId, song) => {
    try {
      console.log("Connecting to DB...");
      await connectToDb();
      console.log("Connected to DB. Searching for user with email:", userId);
  
      const user = await User.findOne({ email: userId });
      console.log("User search result:", user);
  
      if (!user) throw new Error("User not found!");
      console.log("User found:", user);
  
      const isFavorite = user.favorites.some((favorite) => favorite.id === song.id);
      console.log("Is song already a favorite?", isFavorite);
  
      if (isFavorite) {
        user.favorites = user.favorites.filter((favorite) => favorite.id !== song.id);
        console.log("Removed song from favorites");
      } else {
        user.favorites.push(song);
        console.log("Added song to favorites");
      }
  
      const savedUser = await user.save();
      console.log("User saved:", savedUser);
  
      return savedUser;
    } catch (err) {
      console.error("Error in upFavorites:", err);
      throw new Error("Failed to update favorites: " + err.message);
    }
  }


    //db'yi günceller
    // export const toggleFavoriteAsync = (song) => async (dispatch) => {
    //   const userId = localStorage.getItem('userId'); // Kullanıcı id'sini localStorage'dan alın
    //   if (!userId) {
    //     console.error("Kullanıcı ID'si bulunamadı.");
    //     return;
    //   }
    
    //   try {
    //     // Favori durumunu Redux'ta güncelleyin
    //     dispatch(toggleFavoriteRedux(song.id));
    //     // MongoDB'deki favori listesini güncelleyin
    //     await upFavorites(userId, song);
    //   } catch (err) {
    //     console.error("Failed to update favorites in DB:", err);
    //     dispatch(toggleFavoriteRedux(song.id));
    //   }
    // };

    export const toggleFavoriteAsync = (song) => async (dispatch) => {
      const userId = localStorage.getItem('userId');
      console.log("UserId from localStorage:", userId);
    
      if (!userId) {
        console.error("Kullanıcı ID'si bulunamadı.");
        return;
      }
    
      try {
        dispatch(toggleFavoriteRedux(song.id));
        const updatedUser = await upFavorites(userId, song);
        console.log("Favorites updated successfully:", updatedUser);
      } catch (err) {
        console.error("Failed to update favorites in DB:", err);
        // Hata durumunda Redux state'ini geri alıyoruz
        dispatch(toggleFavoriteRedux(song.id));
      }
    };