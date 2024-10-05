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

      const response = await axios.request(options);//api isteği yapılır
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Favori şarkıları getirmek işlemi
export const fetchFavorites = createAsyncThunk(
  'music/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/favorites');// Favori şarkıları almak için API isteği yapılır(GET)
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch favorites');
      }
      
      const data = await response.json();
      return data.favorites;// Favori şarkılar döndürülür
    } catch (error) {
      console.error("Fetch Favorites Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// FAVORİ ŞARKI EKLEME VEYA ÇIKARMA İŞLEMİ (toggleFavorite)
export const toggleFavorite = createAsyncThunk(
  'music/toggleFavorite',
  async (song, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST', // POST isteği, favori ekleme veya çıkarma için
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song }),// Şarkı bilgisi isteğe eklenir
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle favorite');
      }
      
      const data = await response.json();
      return data.favorites;// Güncellenen favori şarkılar listesi döndürülür
    } catch (error) {
      console.error("Toggle Favorite Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPlaylist = createAsyncThunk(
  'music/fetchPlaylist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/playlist');// playlist şarkılarını almak için API isteği yapılır(GET)
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch playlist');
      }
      
      const data = await response.json();
      return data.playlist;
    } catch (error) {
      console.error("Fetch Playlist Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const togglePlaylist = createAsyncThunk(
  'music/togglePlaylist',
  async(song,{rejectWithValue}) => {
    try {
      const response = await fetch('/api/playlist', {
        method: 'POST', // POST isteği, ekleme veya çıkarma için
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song }),// Şarkı bilgisi isteğe eklenir
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle playlist');
      }
      
      const data = await response.json();
      return data.playlist;
    } catch (error) {
      console.error("Toggle Playlist Error:", error);
      return rejectWithValue(error.message);
    }
  }
)


const musicSlice = createSlice({
  name: 'music',
  initialState: {
    songs: [],
    favorites: [],
    playlist:[],   
    status: 'idle',
    error: null
  },
  reducers: {},
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
        state.favorites = action.payload; // Güncellenen favori şarkılar state'e eklenir
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchPlaylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playlist = action.payload;
        state.error = null;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(togglePlaylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(togglePlaylist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playlist = action.payload; // Güncellenen favori şarkılar state'e eklenir
        state.error = null;
      })
      .addCase(togglePlaylist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default musicSlice.reducer;






