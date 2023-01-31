import React, { useEffect } from "react";
import { useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
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
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFreq(arr);
    });
  }, []);

  let handleReject = (item) => {
    remove(ref(db, "frienrequest/" + item.id)).then(() => {
      console.log("Delete");
    });
  };

  let handleAccept = (item) => {
    set(push(ref(db, "friends")), {
      ...item,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "frienrequest/" + item.id)).then(() => {
        console.log("Delete");
      });
    });
  };

  // 31/1/2023

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
                <button onClick={() => handleAccept(item)} className="boxbtn">
                  Accept
                </button>
                <button onClick={() => handleReject(item)} className="boxbtn">
                  Reject
                </button>
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
