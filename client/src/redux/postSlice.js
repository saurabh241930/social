import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sleep } from "../utils/sleep";

const initialState = {
  status: "idle",
  posts: [],
  postDetails: {},
  commentStatus: "idle",
  comments: [],
};

export const getPosts = createAsyncThunk("post/getPosts", async (pageno) => {
  await sleep(3000)
  const { data } = await axios.get("/api/posts/"+pageno);
  return data;
});

export const getPostDetails = createAsyncThunk(
  "post/getPostDetails",
  async (id) => {
    const { data } = await axios.get("/api/posts/post/" + id);
    console.log(data);
    return data;
  }
);

export const getComments = createAsyncThunk("post/getComments", async (id) => {
  const { data } = await axios.get("/api/comments/" + id);
  console.log(data);
  return data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateLike: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );
      state.posts[index].isLiked = !state.posts[index].isLiked;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";

      const curr_state_obj = {}
      const res_obj = {}
      state.posts.map(e => curr_state_obj[e._id] = e)
      action.payload.response.posts.map(e => res_obj[e._id] = e)
      state.posts = Object.values(Object.assign(curr_state_obj,res_obj)) ;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPostDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPostDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.postDetails = action.payload.response.post;
    },
    [getPostDetails.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getComments.pending]: (state, action) => {
      state.commentStatus = "loading";
    },
    [getComments.fulfilled]: (state, action) => {
      state.commentStatus = "success";
      state.comments = action.payload.response.comments;
    },
    [getComments.rejected]: (state, action) => {
      state.commentStatus = "failed";
    },
  },
});

export default postSlice.reducer;
export const { updateLike } = postSlice.actions;
