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

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    songs: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.songs = action.payload.data;
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default musicSlice.reducer;