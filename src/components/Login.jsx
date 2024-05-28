import { useState } from "react";
import swal from "sweetalert2";
import "../Styles/Login.css";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Mainpage from "./Mainpage";
import Mtu from "../assets/Mtu.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState(null);
  const [ismainpageopen, setisMainpageopen] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async (event) => {
    event.preventDefault();
    setSignInError(null);

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is successfully logged in
          console.log("User logged in:", user);
          swal
            .fire({
              title: "Login Successful!",
              text: "You are now logged in.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Proceed to Venue Direction page",
            })

            .then(() => {
              navigate("/mainpage");
            });
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      let errorMesssage;
      switch (error.code) {
        case "auth/network-request-failed":
          errorMesssage =
            "Network error: Please check your internet connection.";
          break;
        case "auth/invalid-crediential":
          errorMesssage = "incorrect password.Please try again";
          break;
        case "auth/user-not-found":
          errorMesssage =
            "Email address not found. Please check your email or create an account";
          break;
        default:
          errorMesssage =
            "invalid login credientials. Please check you password and email";
          break;
      }
      setSignInError(errorMesssage);
    }
  };
  return (
    <div className="containerone">
      <br /> <br />
      <img
        src={Mtu}
        alt="Mtu"
        style={{ width: "90px" }}
        className="logo"
      />{" "}
      
      <h1 style={{ fontSize: "20px" }} className="MTU">
        MTU LOCATION NAVIGATION SYSTEM
      </h1>
      
      <h2 style={{ fontSize: "19px" }} className="welcome">Welcome To MTU </h2>
      
      <h1 style={{ fontSize: "20px" }} className="login">
        LOG IN
      </h1>
      <form action="">
        <input
          type="email"
          placeholder="Enter your email address"
          className="inputfields"
          onChange={handleEmailChange}
          value={email}
          required
        />
      
        <input
          type="password"
          placeholder="Enter your password"
          className="inputfields1"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <br /> <br />
        <button className="button" onClick={signIn}>
          SIGN IN
        </button>
      
        {signInError && (
          <p className="error-message" style={{ color: "red" }}>
            {signInError}
          </p>
        )}
        <h3 style={{ fontSize: "20px" }}>
          Dont have an account ?{" "}
          <Link to="/signup" style={{ fontSize: "18px", color: "blue" }}>
            SignUp
          </Link>
        </h3>
      </form>
      {ismainpageopen && <Mainpage onClose={() => setisMainpageopen(false)} />}
    </div>
  );
};
