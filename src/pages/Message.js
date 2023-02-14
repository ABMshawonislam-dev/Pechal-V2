import React from "react";
import Grid from "@mui/material/Grid";
import GroupList from "../components/GroupList";
import Friends from "../components/Friends";
import Chat from "../components/Chat";
const Message = () => {
  return (
    <>
      <Grid item xs={4}>
        <GroupList />
        <Friends />
      </Grid>
      <Grid item xs={6}>
        <Chat />
      </Grid>
    </>
  );
};

export default Message;
