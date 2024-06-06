import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteSession } from "../../hooks/session";

export const fetchSettings = async (props) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}settings`,
    { headers: { Authorization: `${props.token}` }, withCredentials: true }
  ).then()
  .catch((AxiosError) => {
      if (AxiosError?.response?.status == "401") {
          deleteSession("authorization");
          window.location.href = `${process.env.REACT_APP_BASE_URL}`
      }
  })
  return response;
};

const settingsAddapter = createEntityAdapter({
  selectId: (settings) => settings.id,
});

const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsAddapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        settingsAddapter.setAll(state, action.payload);
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const settingsSelector = settingsAddapter.getSelectors(
  (state) => state.settings
);
export default settingsSlice.reducer;
