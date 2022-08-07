import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getMyMessages } from "../redux/messageSlice";
import AddPost from "../components/AddPost";
import Message from "../components/Message";

export default function Messages() {
  const dispatch = useDispatch();
  const { status, messages } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(getMyMessages());
  }, [dispatch]);

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Messages</Typography>
          </Grid>
          {/* <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid> */}
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        {/* <AddPost /> */}
        <Box textAlign="center" marginTop="1rem">
          {status === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {status === "success" &&
          messages.map((message) => <Message key={message._id} message={message}/>)}
      </Box>
    </Box>
  );
}
