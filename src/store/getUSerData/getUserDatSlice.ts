import { createSlice , } from "@reduxjs/toolkit";
import getUserData from "./actGetUserData"





const initialState:any = {
  first_name: "",
  last_name:"",
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
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
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
