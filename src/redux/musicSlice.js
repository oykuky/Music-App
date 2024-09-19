import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API isteği için async thunk oluşturuyoruz
export const fetchTopCharts = createAsyncThunk(
  'music/fetchTopCharts',
  async () => {
    const options = {
        method: 'GET',
        url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
        headers: {
          'x-rapidapi-key': '0867da32cdmshf729ecc4e583415p18c2c4jsn6865dca4afcc',
          'x-rapidapi-host': 'shazam-core.p.rapidapi.com'
        }
    };

    const response = await axios.request(options);
    return response.data;
  }
);

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    topCharts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCharts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopCharts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topCharts = action.payload;
      })
      .addCase(fetchTopCharts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default musicSlice.reducer;