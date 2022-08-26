import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect,useRef,useState } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import AddPost from "../components/AddPost";
import { useInView } from 'react-intersection-observer';


export default function Home() {
  const dispatch = useDispatch();
  const { status, posts } = useSelector((state) => state.post);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };
  const { ref, inView, entry } = useInView(options);

  useEffect(() => {
    console.log(entry,inView);
  }, [entry])
  




  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box  ref={ref} height="92vh" sx={{ overflowY: "scroll" }}>
        <AddPost />
        <Box textAlign="center" marginTop="1rem">
          {status === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {status === "success" &&
          posts.map((post) => <Post key={post._id} post={post} />)}
          <h2>{`Header inside viewport ${inView}.`}</h2>
      </Box>
    </Box>
  );
}
