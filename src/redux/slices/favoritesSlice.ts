import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const exists = state.items.find((fav) => fav.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((fav) => fav.id !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
