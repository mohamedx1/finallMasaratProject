import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from './../../../config';






const getMainChat = createAsyncThunk("mainChat/getMainChat", async ({ token, content, options }: { token: string; content?: any, options?: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const payloud = { ...(options && { options }), ...(content && { content }) }
    const phase = JSON.parse(localStorage.getItem("second"))

    try {

        if (phase === 1) {
            const response = await axios.get<any>(`${BASE_API_URL}/questions/vark_exam/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            localStorage.setItem("second", "2")
            return data;
        }
        if (phase === 2) {
            const response = await axios.post<any>(`${BASE_API_URL}/cms/grade_survey/`, { ...payloud, lesson_id: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab" }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            localStorage.removeItem("second")
            return data;
        }
        const response = await axios.post<any>(`${BASE_API_URL}/chats/send_message/`, { ...payloud, lesson_id: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab" }, {
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

export default getMainChat