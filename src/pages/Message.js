import React from "react";
import Grid from "@mui/material/Grid";
const Message = () => {
  return (
    <>
      <Grid item xs={4}>
        <h1>xs=4 message</h1>
      </Grid>
      <Grid item xs={3}>
        <h1>xs=3</h1>
      </Grid>
      <Grid item xs={3}>
        <h1>xs=3</h1>
      </Grid>
    </>
  );
};

export default Message;
