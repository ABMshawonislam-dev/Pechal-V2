import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CommonButton = styled(Button)({
  width: "100%",
  padding: "19px 12px",
  backgroundColor: "#5F35F5",
  marginTop: "56px",
  fontFamily: ["Nunito", "sans-serif"],

  "&:hover": {
    backgroundColor: "#000",
  },
});

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

const Login = () => {
  let auth = getAuth();
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [formData, setFormData] = useState({
    email: "",
    password: "",
    fgp: "",
  });

  let [error, setError] = useState({
    email: "",
    password: "",
  });

  let handleClick = () => {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        dispatch(activeUser(userCredential.user));
        localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
        navigate("/pechal");
        
        // if (userCredential.user.emailVerified) {
        //   navigate("/pechal");
        // } else {
        //   toast("Please Verify your email first and try again");
        // }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  let handleForm = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setError({ ...error, [name]: "" });
  };

  let handleGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("Google Done");
    });
  };

  let handleFgp = () => {
    sendPasswordResetEmail(auth, formData.fgp).then(() => {
      console.log("Mail gese");
    });
  };

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
          <div className="regleftside">
            <div>
              <Header>
                <Heading
                  title="Login to your account!"
                  className="heading"
                  as="h2"
                />
                <img
                  onClick={handleGoogle}
                  style={{ marginTop: "20px" }}
                  src="assets/googlelogin.png"
                />
              </Header>
              <div className="inputboxcontainer">
                <InputBox
                  textChange={handleForm}
                  className="logininput"
                  label="Email Address"
                  variant="standard"
                  name="email"
                />
                <InputBox
                  textChange={handleForm}
                  className="logininput"
                  label="Password"
                  variant="standard"
                  name="password"
                />
                <PButton
                  click={handleClick}
                  bname={CommonButton}
                  title="Login to Continue"
                />
                <AuthenticationLink
                  className="reglink"
                  title="Don’t have an account ?"
                  href="/"
                  hreftitle="Sign Up"
                />
                <Button onClick={handleOpen}>Forgot Password</Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className="registrationimg" src="assets/registrationimg.png" />
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Forgot Password
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <InputBox
                textChange={handleForm}
                className="logininput"
                label="Email"
                variant="standard"
                name="fgp"
              />
              <PButton
                click={handleFgp}
                bname={CommonButton}
                title="Send Email"
              />
            </Typography>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};

export default Login;
