import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  let db = getDatabase()
  let [userlist,setUserlist] = useState([])

  let data = useSelector(state=>state)

  console.log(data.userdata.userInfo.uid)


  useEffect(()=>{
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(data.userdata.userInfo.uid != item.key){
          arr.push(item.val())
        }
      })
      setUserlist(arr)
    });
  },[])


  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Users List</h3>
      </div>
      <div className="boxholder">
        {userlist.map(item=>(
          <div className="box">
          <div className="boximgholder">
            <img src="assets/profile.png" />
          </div>
          <div className="title">
            <h3>{item.displayName}</h3>
            <p>{item.email}</p>
          </div>
          <div>
            <button className="boxbtn">Send Request</button>
          </div>
          </div>
        ))}
       
       
      </div>
    </div>
  );
};

export default UserList;
