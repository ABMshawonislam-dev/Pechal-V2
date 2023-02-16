import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getDatabase, ref, set,push,onValue } from "firebase/database";


const Chat = () => {
  const db = getDatabase();
  let data = useSelector((state)=> state)
  console.log("data",data.userdata.userInfo.uid)
  console.log("data",data)

  let [msg,setMsg] = useState("")
  let [msglist,setMsgList] = useState([])

  let handleSendMsg = ()=>{
    if(data.activeUser.activeChatUser.status == "single"){
      set(push(ref(db, 'singlemsg')), {
        whosendid: data.userdata.userInfo.uid,
        whosendname: data.userdata.userInfo.displayName,
         whoreceivedid: data.userdata.userInfo.uid == data.activeUser.activeChatUser.senderid ? data.activeUser.activeChatUser.receiverid
         :
         data.activeUser.activeChatUser.senderid,
         whoreceivedname: data.userdata.userInfo.uid == data.activeUser.activeChatUser.senderid ? data.activeUser.activeChatUser.receivername
         :
         data.activeUser.activeChatUser.sendername,
         msg: msg,
         date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  }


  useEffect(()=>{
    const usersRef = ref(db, "singlemsg");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      
  let id = data.activeUser.activeChatUser.receiverid == data.userdata.userInfo.uid ? data.activeUser.activeChatUser.senderid : data.activeUser.activeChatUser.receiverid
      snapshot.forEach((item) => {
        if((item.val().whosendid == data.userdata.userInfo.uid && item.val().whoreceivedid == id) || (item.val().whosendid == id && item.val().whoreceivedid == data.userdata.userInfo.uid)){
          arr.push(item.val());

        }
     
        console.log("user data",id)
   
      });
      setMsgList(arr);
    });
  },[data])


  return (
    <div className="chat">
      <div className="toparea">
        <div className="info">
          <div className="img">
            <img src="assets/images/friendrequest.png" />
            <div className="round"></div>
          </div>
          <div className="indentity">
            {data.userdata.userInfo.uid == data.activeUser.activeChatUser.senderid
            ?
            <h3>{data.activeUser.activeChatUser.receivername}</h3>
            
            :
            <h3>{data.activeUser.activeChatUser.sendername}</h3>
            }
            <p>Online</p>
          </div>
        </div>
        <div className="dots">
          <BiDotsVerticalRounded />
        </div>
      </div>
      <div className="chatarea">
        <>
        {msglist.map(item=>(
          item.whosendid == data.userdata.userInfo.uid
          ? 
          <div className="msg" style={alignRight}>
            <p className="name" style={dateReceive}>
              Shawon
            </p>
            <p style={msgsend}>{item.msg}</p>
            <p className="date" style={dateReceive}>
              2 minutes ago
            </p>
          </div>
          :
          <div className="msg" style={alignLeft}>
          <p className="name" style={dateSend}>
            islam
          </p>
          <p style={msgreceive}>{item.msg}</p>
          <p className="date" style={dateSend}>
            2 minutes ago
          </p>
        </div>
        ))}
          
        </>
        {/* <div className="msg" style={alignLeft}>
          <p className="name" style={dateSend}>
            islam
          </p>
          <p style={msgreceive}>effadfasdfasdf</p>
          <p className="date" style={dateSend}>
            2 minutes ago
          </p>
        </div> */}
        {/* <>
          <div className="msg" style={alignRight}>
            <p style={msgsend}>qweqwe</p>
            <p className="date" style={dateReceive}>
              2 minutes ago
            </p>
          </div>
        </> */}

        {/* <div className="msg" style={alignRight}>
          <div className="chatimg" style={msgsend}>
            <img src="assets/profile.png" alt="chat-img"></img>
            <p className="date" style={dateReceive}>
              2 minutes ago
            </p>
          </div>
        </div> */}

        {/* <div className="msg" style={alignLeft}>
          <p style={msgreceive}>tyutyu</p>
          <p className="date" style={dateSend}>
            2 minutes ago
          </p>
        </div> */}
        {/* } */}
      </div>

      <div className="msgbox">
        <div className="msgwrite">
          <input onChange={(e)=>setMsg(e.target.value)} type="text" placeholder="Message" />
          <AiOutlineCamera className="camera" />
          <button onClick={handleSendMsg}>
            <FiSend />
          </button>
        </div>
      </div>

      {/* <div className="msgbox">
        <div className="msgwrite">
          <input type="text" placeholder="Message" />
          <AiOutlineCamera className="camera" />
          <button>
            <FiSend />
          </button>
        </div>
      </div> */}
    </div>
  );
};

let msgreceive = {
  background: "#F1F1F1",
};

let msgsend = {
  background: "#5F35F5",
  color: "#fff",
};

let alignLeft = {
  justifyContent: "flex-start",
};

let alignRight = {
  justifyContent: "flex-end",
};

let dateSend = {
  left: "-49px",
};

let dateReceive = {
  right: "-49px",
};

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

export default Chat;
