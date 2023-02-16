import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector,useDispatch } from "react-redux";
import { activeChatUser } from "../slices/activeChatSlice";

const Friends = ({block,msg}) => {
  let db = getDatabase();
 let dispatch = useDispatch()

 console.log("msg frinedn",msg)

  let [friends, setFriends] = useState([]);

  let data = useSelector((state) => state);

  useEffect(() => {
    const usersRef = ref(db, "friends");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.userdata.userInfo.uid == item.val().receiverid ||
          data.userdata.userInfo.uid == item.val().senderid
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  let handleSendMsg = (id)=>{
    console.log("active user", data.activeUser.activeChatUser)
    if(data.activeUser.activeChatUser.status == "single"){
      set(push(ref(db, 'singlemsg')), {
        whosendid: data.userdata.userInfo.uid,
        whosendname: data.userdata.userInfo.displayName,
         whoreceivedid: id,
         whoreceivedname: "shawon",
         msg: msg,
         date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      })
    }
  }

  let handleBlock = (item) => {
    console.log(item);
    if (data.userdata.userInfo.uid == item.senderid) {
      set(push(ref(db, "block")), {
        block: item.receivername,
        bclockid: item.receiverid,
        blockby: item.sendername,
        blockbyid: item.senderid,
      }).then(() => {
        remove(ref(db, "friends/" + item.key)).then(() => {
          console.log("Delete");
        });
      });
    } else {
      set(push(ref(db, "block")), {
        block: item.sendername,
        bclockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid,
      }).then(() => {
        remove(ref(db, "friends/" + item.key)).then(() => {
          console.log("Delete");
        });
      });
    }
  };

  let handleActiveChat = (item)=>{
   
    dispatch(activeChatUser({...item,status:"single"}))
    
  }

  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Friends</h3>
      </div>
      <div className="boxholder">
        {friends.map((item) => (
          <div className="box" onClick={()=>handleActiveChat(item)}>
            <div className="boximgholder">
              <img src="assets/profile.png" />
            </div>
            <div className="title">
              {item.receiverid == data.userdata.userInfo.uid ? (
                <h3>{item.sendername}</h3>
              ) : (
                <h3>{item.receivername}</h3>
              )}
              <p>Hi Guys, Wassup!</p>
            </div>
            <div>
              {!block ?
              <button  onClick={() => handleBlock(item)} className="boxbtn">
                Block
              </button>
              :
              <button onClick={handleSendMsg(item.receiverid == data.userdata.userInfo.uid?item.senderid : item.receiverid)}  className="boxbtn">
                send
              </button>
}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
