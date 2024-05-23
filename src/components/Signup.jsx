import "../Styles/Signup.css";
//import Validlogin from "./Validlogin";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Mtu from "../assets/Mtu.jpg";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
  };

  const handlePasswordChangeOne = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSignUpError("Password does not match. Please try again");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      swal
        .fire({
          title: "Signup Successful!",
          text: "You created an acount Succesfully",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Proceed to Venue Direction page",
        })
        
        .then(() => {
          navigate("/mainpage");
        });
    } catch (error) {
      console.log("Signup error:", error);
      let errorMessage;
      switch (error.code) {
        case "auth/weak-password":
          errorMessage =
            "Your password is not strong enough. Add more characters.";
          break;
        case "auth/email-already-in-use":
          errorMessage =
            "This email address already exists. Try signing in instead.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Check your internet connection.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Please try again later.";
          break;
        default:
          errorMessage = "An error occurred. Check your details and try again";
          break;
      }
      setSignUpError(errorMessage);
    }
  };

  // Fix: Only call createUserWithEmailAndPasswordAsync when all fields have values
  useEffect(() => {
    if (email && password && confirmPassword) {
      const createUserWithEmailAndPasswordAsync = async () => {};
      createUserWithEmailAndPasswordAsync();
    }
  }, [email, password, confirmPassword]);

  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
        <br />
        <img src={Mtu} alt="Mtu" style={{ width: "90px" }} /> <br />
        <br />
        <h1 style={{ fontSize: "20px" }}>MTU LOCATION NAVIGATION SYSTEM</h1>
        <br />
        <h3 style={{ fontSize: "18px" }}>Sign up to Navigate</h3>
        <input
          type="email"
          placeholder="Enter email Address"
          name="email"
          onChange={handleEmailChange}
          className="inputfields"
          required
        />
        <br /> <br />
        <input
          type="Password"
          name="password"
          placeholder="Password"
          className="inputfields"
          onChange={handlePasswordChangeOne}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="confirmpassword"
          className="inputfields"
          onChange={handleConfirmPasswordChange}
          required
        />
        <br /> <br />
        {signUpError && (
          <p className="error-message" style={{ color: "red" }}>
            {signUpError}
          </p>
        )}
        <button className="button" onClick={handleSubmit}>
          SIGN UP
        </button>
        <br /> <br />
      </form>
    </div>
  );
}
