import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface BootResponse {
    message: string;
    content: Question[];
}

interface Question {
    id?: string;
    lesson?: string;
    topic?: string;
    learning_phase?: LearningPhase;
    blooms_level?: BloomsLevel;
    learning_type?: LearningType;
    question_text?: string;
    content_type?: string;
    video_contents?: { url: string };
    question_type?: QuestionType;
    difficulty?: Difficulty;
    created_at?: string;
    updated_at?: string;
    cause?: string | null;
    question_location_in_video?: string | null;
    true_false_question?: TrueFalseQuestion;
    student_answer: boolean;
    long_answer_question?: LongAnswerQuestion;
    sorting_question?: SortingQuestion;
    mcq_question?: MultipleChoiceQuestion;
    audio_base64?: string;
    combined_audio_base64?: string;
}

type LearningPhase = "INTRO_EXAM" | string;
type BloomsLevel = "UNDERSTAND" | "EVALUATE" | "ANALYZE" | "REMEMBER" | string;
type LearningType = "Visual" | string;
type QuestionType = "TRUE_FALSE" | "LONG_ANSWER" | "SORTING" | "MULTIPLE_CHOICE" | string;
type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;

interface TrueFalseQuestion {
    id: string;
    correct_answer: boolean;
    question: string;
}

interface LongAnswerQuestion {
    id: string;
    correct_answer: string;
    question: string;
}

interface SortingQuestion {
    id: string;
    correct_order: string[];
    question: string;
}

interface MultipleChoiceQuestion {
    id: string;
    choices: Choice[];
    correct_answer: string;
    question: string;
}

interface Choice {
    [key: string]: string;
}





const getMainChat = createAsyncThunk("mainChat/getMainChat", async ({ token, content, options }: { token: string; content?: any, options?: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const payloud = { ...(options && { options }), ...(content && { content }) }
    const phase = JSON.parse(localStorage.getItem("second"))

    try {

        if (phase === 1) {
            const response = await axios.get<any>("http://127.0.0.1:8000/questions/vark_exam/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            localStorage.setItem("second", "2")
            return data;
        }
        if (phase === 2) {
            const response = await axios.post<any>("http://127.0.0.1:8000/cms/grade_survey/", { ...payloud, lesson_id: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab" }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            localStorage.removeItem("second")
            return data;
        }
        const response = await axios.post<any>("http://localhost:8000/chats/send_message/", { ...payloud, lesson_id: "6675eaf5-2d4c-458f-8bb3-9671ead1a1ab" }, {
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