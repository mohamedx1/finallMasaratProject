import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../config";

interface BootResponse {
  chat_id: string;
  messages: { id: string, sender_type: "system", content: Content }[];
}

type Content = { id?: string; question_text?: string; student_answer?: string };




// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwNjY3NzE0LCJpYXQiOjE3MzA2Mzc3MTQsImp0aSI6ImJhMDg2MDMzZjMwYjQ3NTdhNWIxY2E3OWMxZDg0Njk0IiwidXNlcl9pZCI6Mn0.fYZeQIR6ugWKyzHPW8chSQjdLA9FMTtqSnNZC5pYmNc";


const getRestoreChat = createAsyncThunk("restoreMainChat/getRestoreChat", async (token:any, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const response = await axios.get<BootResponse>(`${BASE_API_URL}/chats/retrieve-messages/?lesson_id=6675eaf5-2d4c-458f-8bb3-9671ead1a1ab`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export default getRestoreChat

