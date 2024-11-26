import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../config";


const getUserData = createAsyncThunk("uaerData/getUserData", async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
    const {rejectWithValue} =thunkAPI
    try {
        const response = await axios.get(`${BASE_API_URL}/users/user/`,
            {headers:{
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
      },
        }
        );
        const data = response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message)
        } else
            return rejectWithValue("An Unexpected Error")
    }
  }
);

export default getUserData

