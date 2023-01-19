import React, { useState } from 'react'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Grid from '@mui/material/Grid';
import InputBox from '../components/InputBox';
import PButton from '../components/PButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AuthenticationLink from '../components/AuthenticationLink';
import Alert from '@mui/material/Alert';
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile  } from "firebase/auth";
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from  'react-loader-spinner'
import { getDatabase,set,ref,push } from "firebase/database";


const CommonButton = styled(Button)({
    width: "100%",
    padding: '19px 12px',
    backgroundColor: '#5F35F5',
    borderRadius: "86px",
    marginTop: "56px",
    fontFamily:['Nunito', "sans-serif"],
    
    '&:hover': {
      backgroundColor: '#000',
    },
  });




const Registration = () => {

  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate()
  let [formData,setFormData] = useState({
    email: "",
    fullname:"",
    password: ""
  })

  let [show,setShow] = useState(false)
  let [pro,setPro] = useState(0)
  let [loader,setLoader] = useState(false)

  let [error,setError] = useState({
    email: "",
    fullname:"",
    password: ""
  })


  let handleForm = (e)=>{
    let {name,value} = e.target

    // if(name == "password"){
    //   console.log(pro)
    //   let capi = /[A-Z]/
    //   let lower = /[a-z]/
    //   let num = /[0-9]/
    //   console.log(value)
    //   if(!capi.test(value)){
    //     setError({...error,password: "One Capital  LEtter Required"})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){

    //       setPro(pro+25)
    //     }
    //   }

    //   if(!lower.test(value)){
    //     setError({...error,password: "One Lower LEtter Required"})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){

    //       setPro(pro+25)
    //     }
    //   }

    //   if(!num.test(value)){
    //     setError({...error,password: "One Number Required"})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){

    //       setPro(pro+25)
    //     }
    //   }

    //   if(value.length < 6){
    //     setError({...error,password: "Paaword length atleast 6 "})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){
    //       setPro(pro+25)
    //     }
    //   }


    // }

    setFormData({...formData,[name]:value})

    setError({...error,[name]:""})

   
  }

  let handleClick=()=>{
    setLoader(true)
    let expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   
    if(formData.email == ""){
      setError({...error,email: "Email Required"})
    }else if(!expression.test(formData.email)){
      setError({...error,email: "Valid Email Required"})
    }
    else if(formData.fullname == ""){
      setError({...error,fullname: "Fullname Required"})
    }else if(formData.password == ""){
      setError({...error,password: "Password Required"})
    }else{
      createUserWithEmailAndPassword(auth,formData.email,formData.password).then((user)=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          console.log(user.user)

          updateProfile(auth.currentUser, {
            displayName: formData.fullname
          }).then(() => {
            set(ref(db, 'users/' + user.user.uid), {
              displayName: user.user.displayName,
              email: user.user.email,
            }).then(()=>{
              setLoader(false)
              toast("Registration Successful. Please Cheak Your Email");
  
              setTimeout(()=>{
  
                navigate("/login")
              },2000)
            })
            
          }).catch((error) => {
            // An error occurred
            // ...
          });
        })
          

    
      }).catch((error) => {
        const errorCode = error.code;
        if(errorCode.includes("auth/email-already-in-use")){
          setError({...error,email:"Email Already Exists"})
        }
        
      });
    
    }


  }

  let handlePassword = ()=>{
    console.log("password")
  }

  return (
   <>

<Grid container spacing={2}>
<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
  <Grid item xs={6}>
    <div className='regleftside'>
      <div>
        <Header>
          <Heading title="Get started with easily register" className="heading" as="h2"/>
          <p className='regsubheading'>Free register and you can enjoy it</p>
        </Header>
          <div className='inputboxcontainer'>
            <InputBox type="email" name="email" textChange={handleForm} className="reginput" label="Email Address" variant="outlined"/>

              {error.email &&
                <Alert className='error' variant="filled" severity="error">
                  {error.email}
                </Alert>
              }

 
            <InputBox className="reginput"  type="text" name="fullname" textChange={handleForm}  label="Full Name" variant="outlined"/>
            {error.fullname &&
                <Alert className='error' variant="filled" severity="error">
                  {error.fullname}
                </Alert>
              }

            <div style={{width:"100%",position:"relative"}}>
              <InputBox type={show? "text": "password"} name="password" textChange={handleForm} className="reginput" label="Password" variant="outlined"/>
              {show 
              ?
              <AiFillEye onClick={()=>setShow(false)} className="eyeicon"/>
              :
              <AiFillEyeInvisible onClick={()=>setShow(true)} className="eyeicon"/>
              }
              <LinearProgress variant="determinate" value={pro} />
              
              
            </div>
            {error.password &&
                <Alert className='error' variant="filled" severity="error">
                  {error.password}
                </Alert>
              }
          
            
            
            {loader ?
            <Oval
              height = "80"
              width = "80"
              radius = "9"
              color = 'green'
              ariaLabel = 'three-dots-loading'     
              wrapperStyle
              wrapperClass
            />
            :
            <PButton click={handleClick}  bname={CommonButton} title="Sign up"/>
          }
            <AuthenticationLink className="reglink" title="Already  have an account ?" href="/login" hreftitle="Sign In"/>
          </div>
      </div>
    </div>
  </Grid>
  <Grid item xs={6}>
    <img className='registrationimg' src="assets/registrationimg.png"/>
  </Grid>
  
</Grid>

    

   </>
  )
}

const kire ={
    borderRadius: 50
}



export default Registration