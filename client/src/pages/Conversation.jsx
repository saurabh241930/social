import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesOf } from '../redux/messageSlice'
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutline from "@mui/icons-material/PersonOutline";
import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import formatDistanceToNow from "date-fns/formatDistanceToNow";



function getChatUsername(currUser, relativeUserinfo) {
    if (currUser._id === relativeUserinfo._id) return 'you'
    return relativeUserinfo.name
}


export default function Conversation() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessagesOf(id));
    }, [dispatch, id]);



    const { status, messages, messageDetails } = useSelector((state) => state.message)
    const { user } = useSelector((state) => state.auth);

    const relativeUserinfo = messages ? messages.find(message => message.relativeUserId._id === id).relativeUserId : null


    console.log(messageDetails, typeof (messageDetails));




    return (
        <>
            <Box>
                <Box borderBottom="1px solid #ccc" padding="8px 20px">
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <span>
                                <PersonOutline fontSize="large" color="action" />
                                <Typography variant="h6">{relativeUserinfo.name}</Typography>
                            </span>


                        </Grid>
                    </Grid>
                </Box>
                <Box height="92vh" sx={{ overflowY: "scroll" }}>
                    {/* {Array.isArray(messageDetails) && messageDetails.map((message) => <p key={message._id}>{message.messageText}</p>)} */}
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                        {Array.isArray(messageDetails) && messageDetails.map((message) =>
                            <>
                                <ListItem key={message._id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonOutline />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={message.messageText} secondary={getChatUsername(user, message.relativeUserId)} />
                                </ListItem>
                            </>)}


                    </List>
                </Box>
            </Box>
        </>
    )
}