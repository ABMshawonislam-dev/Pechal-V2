import React, { useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import Grid from "@mui/material/Grid";
import GroupList from "../components/GroupList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import MyGroups from "../components/MyGroups";
import UserList from "../components/UserList";
const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let data = useSelector((state) => state);

  useEffect(() => {
    if (!data.userdata.userInfo) {
      console.log("ki re");
      navigate("/login");
    }
  }, []);

  let handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo");
      dispatch(activeUser(null));
      navigate("/login");
    });
  };
  return (
    <>
      {/* <h1>Home</h1> */}
      <Grid item xs={4}>
        <GroupList />
        <FriendRequest />
      </Grid>
      <Grid item xs={3}>
        <Friends />
        <MyGroups />
      </Grid>
      <Grid item xs={3}>
        <UserList />
      </Grid>
      {/* <button onClick={handleLogOut}>Logout</button> */}
    </>
  );
};

export default Home;
