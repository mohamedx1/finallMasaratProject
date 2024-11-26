import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../config";



const sendCapturedImage = createAsyncThunk("sendImage/sendCapturedImage", async ({ base64String, token }: any, thunkAPI) => {
  const cleanBase64 = base64String.replace("data:image/png;base64,", "");
  const body = {
    frame: cleanBase64,
    subject_id: "ecca904c-9041-4e8d-b2e0-fb5be947dc16",
    lesson_id: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab",
  };
  const { rejectWithValue } = thunkAPI
  try {
        const response = await axios.post<any>(
    `${BASE_API_URL}/questions/track-concentration/`,
    body,
    {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    }
  );

    const data = response.data;
        return data;
    } catch (error) {
    if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message)
        } else
            return rejectWithValue("An Unexpected Error")
    }
  }
);

export default sendCapturedImage

