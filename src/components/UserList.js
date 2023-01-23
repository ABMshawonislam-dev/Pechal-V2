import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  let db = getDatabase();
  let [userlist, setUserlist] = useState([]);
  let [freq, setFreq] = useState([]);

  let data = useSelector((state) => state);

  console.log(data.userdata.userInfo.uid);

  useEffect(() => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid != item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserlist(arr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "frienrequest");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setFreq(arr);
    });
  }, []);

  let handleFriendRequest = (info) => {
    set(push(ref(db, "frienrequest")), {
      sendername: data.userdata.userInfo.displayName,
      senderid: data.userdata.userInfo.uid,
      receivername: info.displayName,
      receiverid: info.id,
    });
  };

  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Users List</h3>
      </div>
      <div className="boxholder">
        {userlist.map((item) => (
          <div className="box">
            <div className="boximgholder">
              <img src="assets/profile.png" />
            </div>
            <div className="title">
              <h3>{item.displayName}</h3>
              <p>{item.email}</p>
            </div>
            <div>
              {freq.includes(item.id + data.userdata.userInfo.uid) ||
              freq.includes(data.userdata.userInfo.uid + item.id) ? (
                <button className="boxbtn">Pending</button>
              ) : (
                <button
                  onClick={() => handleFriendRequest(item)}
                  className="boxbtn"
                >
                  Send Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
