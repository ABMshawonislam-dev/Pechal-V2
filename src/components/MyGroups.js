import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

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

const MyGroups = () => {
  let [glist, setGlist] = useState([]);
  let [grlist, setGrlist] = useState([]);
  let [gmlist, setGmlist] = useState([]);
  let data = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    console.log(id);
    const starCountRef = ref(db, "grouprequest");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupid == id) {
          arr.push({ ...item.val(), did: item.key });
        }
      });
      setGrlist(arr);
    });
  };
  const handleClose = () => setOpen(false);
  const handleInfoOpen = (id) => {
    setOpenInfo(true);
    // console.log(id);
    const starCountRef = ref(db, "groupmembers");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupid == id) {
          arr.push({ ...item.val(), did: item.key });
        }
      });
      setGmlist(arr);
    });
  };
  const handleInfoClose = () => setOpenInfo(false);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid == item.val().adminid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGlist(arr);
    });
  }, []);

  let handleDeleteGR = (id) => {
    remove(ref(db, "grouprequest/" + id)).then(() => {
      console.log("delete");
    });
  };

  let handleGroupAccept = (item) => {
    console.log(item);
    set(push(ref(db, "groupmembers")), {
      adminid: item.adminid,
      groupid: item.groupid,
      userid: item.userid,
      username: item.username,
      key: item.did,
    }).then(() => {
      remove(ref(db, "grouprequest/" + item.did));
    });
  };

  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>My Groups</h3>
      </div>
      <div className="boxholder">
        {glist.map((item) => (
          <div className="box">
            <div className="boximgholder">
              <img src="assets/profile.png" />
            </div>
            <div className="title">
              <p>{item.adminname}</p>
              <h3>{item.groupname}</h3>
              <p>{item.grouptag}</p>
            </div>
            <div>
              <button
                className="boxbtn"
                onClick={() => handleInfoOpen(item.gid)}
              >
                Info
              </button>
              <button className="boxbtn" onClick={() => handleOpen(item.gid)}>
                MR
              </button>
              {/* <button className="boxbtn">D</button> */}
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Member Request
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {grlist.map((item) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.username}
                      secondary={
                        <React.Fragment>
                          {" — wants to join your group"}
                        </React.Fragment>
                      }
                    />
                    <Button
                      onClick={() => handleGroupAccept(item)}
                      variant="outlined"
                      color="success"
                    >
                      A
                    </Button>
                    <Button
                      onClick={() => handleDeleteGR(item.did)}
                      variant="outlined"
                      color="error"
                    >
                      D
                    </Button>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openInfo}
        onClose={handleInfoClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Members
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {gmlist.map((item) => (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.username}
                      secondary={
                        <React.Fragment>
                          {" — is a member of your group"}
                        </React.Fragment>
                      }
                    />
                    <Button variant="outlined" color="success">
                      Block
                    </Button>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              </List>
            ))}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MyGroups;
