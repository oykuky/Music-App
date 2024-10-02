import { upFavorites } from "./action";
import {toggleFavoriteRedux} from "@/redux/musicSlice";

export const toggleFavoriteAsync = (song) => async (dispatch) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error("Kullanıcı ID'si bulunamadı.");
      return;
    }
  
    try {
      dispatch(toggleFavoriteRedux(song.id));
      await upFavorites(userId, song);
    } catch (err) {
      console.error("Failed to update favorites in DB:", err);
      // Hata durumunda Redux state'i geri alınır
       dispatch(toggleFavoriteRedux(song.id));
    }
  };


