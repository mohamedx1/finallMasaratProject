import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../../config";



type respose = {id:string , code:string , description:string , name:string ,    is_active:boolean , progress_percentage:number ,   academic_year:string    }[]
const getSubjects = createAsyncThunk("subjects/getSubjects", async (token:any, thunkAPI) => {

  const { rejectWithValue } = thunkAPI
  try {
        const response = await axios.get<any>(`${BASE_API_URL}/cms/subjects_with_lessons` , {headers:{
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
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

export default getSubjects

