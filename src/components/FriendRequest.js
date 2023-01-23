import React, { useEffect } from "react";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const FriendRequest = () => {
  const db = getDatabase();

  let [freq, setFreq] = useState([]);

  let data = useSelector((state) => state);

  console.log(data.userdata.userInfo.uid);

  useEffect(() => {
    const starCountRef = ref(db, "frienrequest");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == data.userdata.userInfo.uid) {
          arr.push(item.val());
        }
      });
      setFreq(arr);
    });
  }, []);

  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Friend Request</h3>
      </div>
      <div className="boxholder">
        {freq.length > 0 ? (
          freq.map((item) => (
            <div className="box">
              <div className="boximgholder">
                <img src="assets/profile.png" />
              </div>
              <div className="title">
                <h3>{item.sendername}</h3>
                <p>Hi Guys, Wassup!</p>
              </div>
              <div>
                <button className="boxbtn">Accept</button>
                <button className="boxbtn">Reject</button>
              </div>
            </div>
          ))
        ) : (
          <Alert style={{ marginTop: "20px" }} variant="filled" severity="info">
            No Friend Request
          </Alert>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
