import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//FETCH THE ARTIST
export const fetchMusic = createAsyncThunk(
  'music/fetchMusic',
  async (artistName, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: artistName },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY ,
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'music/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/favorites');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch favorites');
      }
      
      const data = await response.json();
      return data.favorites;
    } catch (error) {
      console.error("Fetch Favorites Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'music/toggleFavorite',
  async (song, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle favorite');
      }
      
      const data = await response.json();
      return data.favorites;
    } catch (error) {
      console.error("Toggle Favorite Error:", error);
      return rejectWithValue(error.message);
    }
  }
);


const musicSlice = createSlice({
  name: 'music',
  initialState: {
    songs: [],
    favorites: [],
    status: 'idle',
    error: null
  },
  reducers: {
    toggleFavoriteRedux: (state,action) => {
      const songId = action.payload; //şarkının id'si
      const isFavorite = state.favorites.some((song) =>song.id === songId);
      // some() metodu, bir dizideki en az bir öğenin belirtilen koşulu sağladığını kontrol eder ve true veya false döner
      //some() fonksiyonu, bu şarkı zaten favorilerde mi diye kontrol eder
      
      if(isFavorite){
        state.favorites = state.favorites.filter((song)=> song.id !== songId);
        //filter() belirli bir koşulu sağlayan öğeleri içeren yeni bir dizi döndürür
        //favori listeisinde çıkar 
      }else {
        //favorilere ekle
        const addSong = state.songs.find((song)=> song.id === songId) 
        if(addSong) state.favorites.push(addSong);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {  //API isteği başlarken
        state.status = 'loading';
      })
      .addCase(fetchMusic.fulfilled, (state, action) => { // İstek başarılı olduğunda
        state.status = 'succeeded';
        state.songs = action.payload.data;
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred';
      })
     
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default musicSlice.reducer;
export const { toggleFavoriteRedux } = musicSlice.actions;






