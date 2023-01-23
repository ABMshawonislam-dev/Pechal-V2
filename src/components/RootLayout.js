import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RootLayout = () => {
  const auth = getAuth();
  let dispatch = useDispatch();
  let data = useSelector((state) => state);
  console.log(data.userdata.userInfo);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // start
  const [image, setImage] = useState();
  const [profile, setProfile] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  console.log(auth.currentUser);
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      console.log(files);
    } else if (e.target) {
      files = e.target.files;
      console.log(files);
    }
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profilepic/${data.userdata.userInfo.uid}`
      );
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        setOpen(false);
        setImage("");
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            console.log("Image Uploaded");
            dispatch(activeUser(auth.currentUser));
            localStorage.setItem("userInfo", JSON.stringify(auth.currentUser));
          });
        });
      });
    }
  };

  useEffect(() => {
    setProfile(data.userdata.userInfo.photoURL);
  }, [data]);
  // end

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sidebarbox">
            <div className="sidebar">
              <div className="imgholder">
                <img
                  onClick={handleOpen}
                  src={profile}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h5>{data.userdata.userInfo.displayName}</h5>
              <div className="iconholder">
                <AiOutlineHome className="icon" />
                <AiOutlineMessage className="icon" />
                <IoIosNotifications className="icon" />
                <AiFillSetting className="icon" />
                <AiOutlineLogout className="icon" />
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Image Upload
                <div className="imgholder">
                  {image ? (
                    <div className="img-preview"></div>
                  ) : data.userdata.userInfo.photoURL ? (
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                      }}
                      src={data.userdata.userInfo.photoURL}
                    />
                  ) : (
                    <img src="assets/profile.png" />
                  )}
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input onChange={onChange} type="file" />

                {image && (
                  <>
                    <Cropper
                      style={{ height: 400, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                    <Button onClick={getCropData} variant="contained">
                      Upload
                    </Button>
                  </>
                )}
              </Typography>
            </Box>
          </Modal>
        </Grid>

        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
