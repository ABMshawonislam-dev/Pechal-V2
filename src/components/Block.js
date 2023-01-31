import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Block = () => {
  let db = getDatabase();
  let [block, setBlock] = useState([]);

  let data = useSelector((state) => state);

  useEffect(() => {
    const usersRef = ref(db, "block");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == data.userdata.userInfo.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            bclockid: item.val().bclockid,
          });
        }
      });
      setBlock(arr);
    });
  }, []);

  let handleunblock = (item) => {
    console.log(item);
    set(push(ref(db, "friends")), {
      sendername: data.userdata.userInfo.displayName,
      senderid: data.userdata.userInfo.uid,
      receivername: item.block,
      receiverid: item.bclockid,
    }).then(() => {
      remove(ref(db, "block/" + item.id)).then(() => {
        console.log("Delete");
      });
    });
  };

  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Block List</h3>
      </div>
      <div className="boxholder">
        {block.map((item) => (
          <div className="box">
            <div className="boximgholder">
              <img src="assets/profile.png" />
            </div>
            <div className="title">
              <h3>{item.block}</h3>
              <p>Hi Guys, Wassup!</p>
            </div>
            <div>
              <button onClick={() => handleunblock(item)} className="boxbtn">
                UnBlock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Block;
