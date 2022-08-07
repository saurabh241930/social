import React from 'react'
import {
    Grid,
    IconButton,
    Input,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";





export default function Message({ message_id, message }) {
    return (
        <>
        <Link
        to={`/`}
        style={{ textDecoration: "none", color: "inherit" }}
        >
             <Box
          padding="1rem"
          sx={{
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ paddingRight: "1rem" }}>
              <Link to={`/profile/${message.relativeUserId._id}`}>
                <img src="/logo.png" alt="lgoog" width="50px" />
              </Link>
            </Grid>
            <Grid item flexGrow="1">
              <Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <Box display="flex">
                      <Typography
                        sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                      >
                        {message.relativeUserId.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        @{message.relativeUserIdhandle}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        .
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        {formatDistanceToNow(new Date(message.createdAt))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        {message.messageText}
                      </Typography>
                    </Box>
                  </Grid>
                  {/* <Grid item>
                    {post.author._id === _id && (
                      <IconButton
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(e);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      onClick={(e) => e.stopPropagation()}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={(e) => handleDeletePost(e)}>
                        Delete Post
                      </MenuItem>
                    </Menu>
                  </Grid> */}
                </Grid>
                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  marginRight="5rem"
                  marginTop=".8rem"
                >
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleModalOpen();
                    }}
                    size="small"
                  >
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <SyncIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={handleLike} size="small">
                    {post.isLiked ? (
                      <FavoriteIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton size="small">
                    <IosShareIcon fontSize="small" />
                  </IconButton>
                </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        </Link>
            
        </>
    )
}