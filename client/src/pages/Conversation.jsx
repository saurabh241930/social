import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesOf } from '../redux/messageSlice'
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutline from "@mui/icons-material/PersonOutline";
import { CircularProgress, Grid, IconButton, Typography, Input } from "@mui/material";
import { Box } from "@mui/system";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import SendIcon from '@mui/icons-material/Send';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { sendMessage } from "../api";
import Pusher from 'pusher-js';



const pusher = new Pusher('7e4c08f6b6f630769b3c', {
    cluster: "ap2",
    encrypted: true
});



function getChatUsername(currUser, relativeUserinfo) {
    if (currUser._id !== relativeUserinfo._id) return 'you'
    return relativeUserinfo.name
}


export default function Conversation() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const channel = pusher.subscribe(user._id.toString());
        channel.bind('message', data => {
            console.log(data);
            dispatch(getMessagesOf(id));

        });
    }, [])

    useEffect(() => {
        dispatch(getMessagesOf(id));
    }, [dispatch, id]);

    const { status, messages, messageDetails } = useSelector((state) => state.message)
    const [message_input, setMessageInput] = useState('')
    const handleMessageSubmit = async () => {
        const data = await sendMessage({ "relativeUserId": relativeUserinfo.id, "messageText": message_input });
        if (data) {
            dispatch(getMessagesOf(id));
            setMessageInput('')
        }

    }

    const relativeUserinfo = messages ? messages.find(message => message.userdetails.id === id).userdetails : null;


    return (
        <>
            <Box>
                <Box borderBottom="1px solid #ccc" sx={{ height: '10vh'}}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <span>
                                <PersonOutline fontSize="large" color="action" />
                                <Typography variant="h6">{relativeUserinfo.name}</Typography>
                            </span>


                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ overflowY: "scroll", height: '80vh' }}>
                    <List sx={{ width: '100%' }}>
                        {Array.isArray(messageDetails) && messageDetails.map((message) =>
                            <>
                                <ListItem key={message._id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonOutline />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={getChatUsername(user, message.relativeUserId)} secondary={message.messageText} />
                                    <span style={{ color: "grey", fontSize: '10px' }}>{formatDistanceToNow(new Date(message.createdAt))} ago</span>
                                </ListItem>
                            </>)}
                    </List>
                </Box>
                <Box sx={{ position: 'relative', bottom: '0', width: '100%', height: '10vh' }}>
                    <Input
                        style={{ backgroundColor: '#EEEEEE',position:'absolute',top:'50%',transform:'translateY(-50%)',padding:'2px'}}
                        value={message_input}
                        onChange={(e) => setMessageInput(e.target.value)}
                        type="text"
                        inputProps={{
                            style: { padding: "10px" },
                        }}
                        disableUnderline
                        fullWidth
                        placeholder="Type message...."
                        startAdornment={
                            <TagFacesIcon
                                sx={{
                                    paddingLeft: "20px",
                                    color: "#777",
                                }}
                            />
                        }
                        endAdornment={
                            <IconButton sx={{ paddingRight: "20px", }} onClick={handleMessageSubmit}>
                                <SendIcon
                                    sx={{ color: "#777" }}
                                />

                            </IconButton>

                        }
                    />

                </Box>


            </Box>
        </>
    )
}