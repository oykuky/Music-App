import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong:  {
    "id": 916445,
    "readable": true,
    "title": "Till I Collapse",
    "title_short": "Till I Collapse",
    "title_version": "",
    "link": "https:\/\/www.deezer.com\/track\/916445",
    "duration": 297,
    "rank": 947515,
    "explicit_lyrics": true,
    "explicit_content_lyrics": 1,
    "explicit_content_cover": 0,
    "preview": "https:\/\/cdn-preview-1.dzcdn.net\/stream\/c-12eca10f7e8e55f7f83c14b3552f1940-9.mp3",
    "md5_image": "ec3c8ed67427064c70f67e5815b74cef",
    "artist": {
        "id": 13,
        "name": "Eminem",
        "link": "https:\/\/www.deezer.com\/artist\/13",
        "picture": "https:\/\/api.deezer.com\/artist\/13\/image",
        "picture_small": "https:\/\/e-cdns-images.dzcdn.net\/images\/artist\/19cc38f9d69b352f718782e7a22f9c32\/56x56-000000-80-0-0.jpg",
        "picture_medium": "https:\/\/e-cdns-images.dzcdn.net\/images\/artist\/19cc38f9d69b352f718782e7a22f9c32\/250x250-000000-80-0-0.jpg",
        "picture_big": "https:\/\/e-cdns-images.dzcdn.net\/images\/artist\/19cc38f9d69b352f718782e7a22f9c32\/500x500-000000-80-0-0.jpg",
        "picture_xl": "https:\/\/e-cdns-images.dzcdn.net\/images\/artist\/19cc38f9d69b352f718782e7a22f9c32\/1000x1000-000000-80-0-0.jpg",
        "tracklist": "https:\/\/api.deezer.com\/artist\/13\/top?limit=50",
        "type": "artist"
    },
    "album": {
        "id": 103248,
        "title": "The Eminem Show",
        "cover": "https:\/\/api.deezer.com\/album\/103248\/image",
        "cover_small": "https:\/\/e-cdns-images.dzcdn.net\/images\/cover\/ec3c8ed67427064c70f67e5815b74cef\/56x56-000000-80-0-0.jpg",
        "cover_medium": "https:\/\/e-cdns-images.dzcdn.net\/images\/cover\/ec3c8ed67427064c70f67e5815b74cef\/250x250-000000-80-0-0.jpg",
        "cover_big": "https:\/\/e-cdns-images.dzcdn.net\/images\/cover\/ec3c8ed67427064c70f67e5815b74cef\/500x500-000000-80-0-0.jpg",
        "cover_xl": "https:\/\/e-cdns-images.dzcdn.net\/images\/cover\/ec3c8ed67427064c70f67e5815b74cef\/1000x1000-000000-80-0-0.jpg",
        "md5_image": "ec3c8ed67427064c70f67e5815b74cef",
        "tracklist": "https:\/\/api.deezer.com\/album\/103248\/tracks",
        "type": "album"
    },
    "type": "track"
}, 
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
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