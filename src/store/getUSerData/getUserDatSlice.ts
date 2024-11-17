import { createSlice , } from "@reduxjs/toolkit";
import getUserData from "./actGetUserData"





const initialState:any = {
    username: "",
    student_profile: {
        academic_year: "",
        first_time_login: false,
    },
  isLoading: "idle",
  error: null,
};

const userDataSlice = createSlice({
  name: "uaerData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserData.pending, (state) => {
      state.isLoading = "pending";
      state.error = null;
    })
    builder.addCase(getUserData.fulfilled, (state , action) => {
      state.isLoading = "succeeded";
      state.error = null;
      state.username = action.payload.username;
    state.student_profile.academic_year = action.payload.student_profile.academic_year;
    state.student_profile.first_time_login = action.payload.student_profile.first_time_login
    })
    builder.addCase(getUserData.rejected, (state , action) => {
      state.isLoading = "failed";
        state.error = action.payload as string;
    })
  },
});
export { getUserData };

export default userDataSlice.reducer;
