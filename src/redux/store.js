import { configureStore } from '@reduxjs/toolkit';
import musicSlice from './musicSlice';
import playerReducer from './playerSlice';

export const store = configureStore({
  reducer: {
    music: musicSlice,
    player: playerReducer,
  },
});