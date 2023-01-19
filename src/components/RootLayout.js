import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
const RootLayout = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sidebarbox">
            <div className="sidebar">
              <div className="imgholder">
                <img src="assets/profile.png" />
              </div>
              <div className="iconholder">
                <AiOutlineHome className="icon" />
                <AiOutlineMessage className="icon" />
                <IoIosNotifications className="icon" />
                <AiFillSetting className="icon" />
                <AiOutlineLogout className="icon" />
              </div>
            </div>
          </div>
        </Grid>

        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
