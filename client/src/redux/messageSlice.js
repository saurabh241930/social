import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    messages: [],
    messageDetails: {}
};


export const getMyMessages = createAsyncThunk("message/getAllMessages", async () => {
    const { data } = await axios.get("/api/message/all");
    return data;
});



export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: {
        [getMyMessages.pending]: (state, action) => {
            state.status = "loading";
        },
        [getMyMessages.fulfilled]: (state, action) => {
            state.status = "success";
            state.messages = action.payload.response.messages;
        },
        [getMyMessages.rejected]: (state, action) => {
            state.status = "failed";
        }

    }
})

export default messageSlice.reducer;
