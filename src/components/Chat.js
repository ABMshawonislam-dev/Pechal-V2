import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";

const Chat = () => {
  return (
    <div className="chat">
      <div className="toparea">
        <div className="info">
          <div className="img">
            <img src="assets/images/friendrequest.png" />
            <div className="round"></div>
          </div>
          <div className="indentity">
            <h3>Shawon</h3>
            <p>Online</p>
          </div>
        </div>
        <div className="dots">
          <BiDotsVerticalRounded />
        </div>
      </div>
      <div className="chatarea">
        <>
          <div className="msg" style={alignRight}>
            <p className="name" style={dateReceive}>
              Shawon
            </p>
            <p style={msgsend}>amni</p>
            <p className="date" style={dateReceive}>
              2 minutes ago
            </p>
          </div>
        </>
        <div className="msg" style={alignLeft}>
          <p className="name" style={dateSend}>
            islam
          </p>
          <p style={msgreceive}>effadfasdfasdf</p>
          <p className="date" style={dateSend}>
            2 minutes ago
          </p>
        </div>
        <>
          <div className="msg" style={alignRight}>
            <p style={msgsend}>qweqwe</p>
            <p className="date" style={dateReceive}>
              2 minutes ago
            </p>
          </div>
        </>

        <div className="msg" style={alignRight}>
          <div className="chatimg" style={msgsend}>
            <img src="assets/profile.png" alt="chat-img"></img>
            <p className="date" style={dateReceive}>
              2 minutes ago
            </p>
          </div>
        </div>

        <div className="msg" style={alignLeft}>
          <p style={msgreceive}>tyutyu</p>
          <p className="date" style={dateSend}>
            2 minutes ago
          </p>
        </div>
        <div className="msg" style={alignLeft}>
          <div className="chatimg" style={msgreceive}>
            <img src="assets/profile.png" alt="chat-img"></img>
            <p className="date" style={dateSend}>
              2 minutes ago
            </p>
          </div>
        </div>
      </div>

      <div className="msgbox">
        <div className="msgwrite">
          <input type="text" placeholder="Message" />
          <AiOutlineCamera className="camera" />
          <button>
            <FiSend />
          </button>
        </div>
      </div>

      <div className="msgbox">
        <div className="msgwrite">
          <input type="text" placeholder="Message" />
          <AiOutlineCamera className="camera" />
          <button>
            <FiSend />
          </button>
        </div>
      </div>
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
