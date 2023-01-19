import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const RootLayout = () => {


  let data = useSelector((state)=> state)
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

// start
const [image, setImage] = useState(defaultSrc);
const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      console.log(files)
    } else if (e.target) {
      files = e.target.files;
      console.log(files)
    }
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result)
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {

      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

// end





  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sidebarbox">
            <div className="sidebar">
              <div className="imgholder">
                <img onClick={handleOpen} src="assets/profile.png" />
                
              </div>
              <h5>{data.userdata.userInfo.displayName}</h5>
              <div className="iconholder">
                <AiOutlineHome className="icon" />
                <AiOutlineMessage className="icon" />
                <IoIosNotifications className="icon" />
                <AiFillSetting className="icon" />
                <AiOutlineLogout  className="icon" />
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
            <div className="img-preview"></div>
                
              </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input onChange={onChange} type="file"/>
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
