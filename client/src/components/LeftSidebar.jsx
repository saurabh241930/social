import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { TextareaAutosize } from "@mui/material";
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Input,
  useTheme,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import { getPosts } from "../redux/postSlice";
import { addPost } from "../api";
import {Work} from "@mui/icons-material"

export default function LeftSidebar() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { _id } = JSON.parse(localStorage.getItem("login"));

  const [openModal, setOpenModal] = React.useState(false);
  const [showAddImage, setShowImage] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [imageUrl, setUrl] = React.useState("");
  const handleModalClose = () => {
    setOpenModal(false);
    setImage("")
    setShowImage(false)
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const [postText, setPostText] = React.useState("");
  const handleAddPost = async () => {
    const data = await addPost({ text: postText , imageUrl});
    if (data) {
      dispatch(getPosts());
      setPostText("");
    }
  };

  const uploadImage = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "upload")
    data.append("cloud_name", "dxotafsfa")
    fetch("  https://api.cloudinary.com/v1_1/dxotafsfa/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setUrl(data.url)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%" }}>
        <Box textAlign="center">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <img src="/logo.png" alt="logo" width="70px" />
          </Link>
        </Box>
        <List>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="medium" style={{color:"white"}} />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: "white",
                  }}
                  primary="Home"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink
            to="/messages"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >

            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <ChatBubbleOutlineIcon fontSize="medium" style={{color:"white"}} />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: "white",
                  }}
                  primary="Messages"
                />
              </Hidden>
            </ListItem>

          </NavLink>
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <Work fontSize="medium" style={{color:"white"}} />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: "white",
                }}
                primary="Jobs"
              />
            </Hidden>
          </ListItem>
          <NavLink
            to={`/profile/${_id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <PersonOutlineIcon fontSize="medium" style={{color:"white"}} />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: "white",
                  }}
                  primary="Profile"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <ListItem
            id="basic-button"
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
            onClick={() => {
              dispatch(logout());
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" style={{color:"white"}} />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: "white",
                }}
                primary="Logout"
              />
            </Hidden>
          </ListItem>
        </List>
        <Hidden lgDown>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="success"
            style={{
              borderRadius: "8px",
              textTransform: "capitalize",
              width:"90%"
            }}
          >
            Post
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Hidden>
      </Box>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Post"}
          len={postText.trimStart().length}
          handleSave={handleAddPost}
        >
          <Box>
            <Grid container>
              {/* <Grid item>
                <img src="/logo.png" alt="logo" width="60px" />
              </Grid> */}
              <Grid item xs={12} flexGrow="1">
                <Box padding=".5rem 0">
                  <TextareaAutosize
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="What is your post about...."
                    style={{ width: "100%",height:'20vh',outline: 'none' ,border:'none'}}
                  />
                </Box>
              </Grid>
              {(imageUrl === "")?
                (<Grid item xs={12}>
                  {!showAddImage && <Button onClick={() => setShowImage(true)}>+ Add Image</Button>}
                  {showAddImage && <> <Input type="file" onChange={(e) => setImage(e.target.files[0])} /><Button onClick={uploadImage}>Upload</Button> </>}
                </Grid>)
                :
                (<Grid item xs={12}> <img style={{maxHeight:"100%",maxWidth:"100%"}} src={imageUrl} alt="ss" /> </Grid>)
              }
              



            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
}
