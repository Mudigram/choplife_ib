import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "@/types/place";
import { fetchPlaces } from "@/redux/thunks/placesThunks";

interface PlacesState {
  items: Place[];
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  items: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlaces.fulfilled,
        (state, action: PayloadAction<Place[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch places";
      });
  },
});

export default placesSlice.reducer;
