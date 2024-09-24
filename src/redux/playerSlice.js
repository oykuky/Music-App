import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (Array.isArray(action.payload.data)) {
        state.currentSongs = action.payload.data;
      } else if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = [];
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs.length > 0) {
        if (state.currentSongs[action.payload]?.track) {
          state.activeSong = state.currentSongs[action.payload]?.track;
        } else {
          state.activeSong = state.currentSongs[action.payload];
        }

        state.currentIndex = action.payload;
        state.isActive = true;
      }
    },

    prevSong: (state, action) => {
      if (state.currentSongs.length > 0) {
        if (state.currentSongs[action.payload]?.track) {
          state.activeSong = state.currentSongs[action.payload]?.track;
        } else {
          state.activeSong = state.currentSongs[action.payload];
        }

        state.currentIndex = action.payload;
        state.isActive = true;
      }
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;