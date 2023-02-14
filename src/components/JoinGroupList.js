import React, { useEffect, useState } from "react";
import { TextField, Box, Button, Typography, Modal } from "@mui/material/";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

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

const JoinGroupList = () => {

    const db = getDatabase();

    let data = useSelector((state) => state);
  
    console.log(data.userdata.userInfo.uid);
  
    let [glist, setGlist] = useState([]);
    let [gmlist, setGmlist] = useState([]);
    let [gname, setGname] = useState("");
    let [gtag, setGtag] = useState("");
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    let handleCreateGroup = () => {
      console.log("ami grpoup");
      set(push(ref(db, "groups")), {
        groupname: gname,
        grouptag: gtag,
        adminid: data.userdata.userInfo.uid,
        adminname: data.userdata.userInfo.displayName,
      }).then(() => {
        setOpen(false);
      });
    };

    useEffect(() => {

        
            const starCountRef = ref(db, "groupmembers");
            onValue(starCountRef, (snapshot) => {
              let arr = [];
              snapshot.forEach((item) => {
                arr.push(item.val().groupid+item.val().userid)
              });
              console.log("arrm")
              setGmlist(arr);
            
            })
      

                
          
        

      }, []);
  
    useEffect(() => {
      const starCountRef = ref(db, "groups");
      onValue(starCountRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (data.userdata.userInfo.uid == item.val().adminid ) {
            arr.push({ ...item.val(), gid: item.key });
          }else if(gmlist.includes(item.key+data.userdata.userInfo.uid)){
            arr.push({ ...item.val(), gid: item.key });
          }
        });
        setGlist(arr);
      });
    }, [gmlist.length]);
  
    let handleGroupJoin = (item) => {
      set(push(ref(db, "grouprequest")), {
        adminid: item.adminid,
        groupid: item.gid,
        groupname: item.groupname,
        userid: data.userdata.userInfo.uid,
        username: data.userdata.userInfo.displayName,
      }).then(() => {
        console.log("Joined");
      });
    };

  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Groups List a</h3>
        <button onClick={handleOpen}>Create Group</button>
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
              <button onClick={() => handleGroupJoin(item)} className="boxbtn">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                onChange={(e) => setGname(e.target.value)}
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setGtag(e.target.value)}
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Group Tag"
                variant="outlined"
              />{" "}
              <br />
              <Button onClick={handleCreateGroup} variant="contained">
                Contained
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default JoinGroupList
