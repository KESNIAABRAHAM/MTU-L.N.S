// import {useState} from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import propTypes from "prop-types";
// import {getAuth,signInWithPhoneNumber,RecaptchaVerifier,onAuthStateChanged} from "firebase/auth";
// // import firebase from "firebase/compat/app";

// // import { auth } from "../firebase/firebase ";


// function OTPmodal() {
//   // const [show, setShow] = useState(false);
//   const [signInError, setSignInError] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");





//   const handleClose = () => {
//     //onClose()
//   };
//   //const handleShow = () => setShow(true);

//   OTPmodal.propTypes = {
//     onClose: propTypes.func.isRequired, // Define 'onClose' prop as a required function
//   };

//    async function valid (event) {
//     event.preventDefault();
//     setSignInError(null);

// // console.log ("Recaptcha verifier ", window.recaptchaVerifier);

//     try {

//       const auth = getAuth();

//       // const PhoneAuthProvider = new firebase.auth.PhoneAuthProvider(auth);

//       if (!window.recaptchaVerifier){
//         window.recaptchaVerifier = new RecaptchaVerifier('recaptchaVerifier', {
//           'size': 'invisible',
//         });
      
      
//       window.recaptchaVerifier.container = document.getElementById("recaptchaVerifier");
//       // const appVerifier = window.recaptchaVerifier;
//       }

//        await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);

//   onAuthStateChanged(auth, (user) => {
//     if(user){
//       console.log("OTP modal worked redirecting....");
    
//     }

//   });
//       }
//       catch (error) {
//       console.log("Error during phone number authentication", error);
      
//       let errorMessage;

//       switch (error.code) {
//           case "auth/invalid-phone-number":
//               errorMessage = "phone number is invalid";
//               break;
//           case "auth/network-requests-failed":
//               errorMessage = "check your internet connection";
//               break;
//           case "auth/quota-exceeded":
//               errorMessage = "Quota exceeded for this operation please try later";
//               break;
//           default:
//             errorMessage = "An unknown error occured";
//               break;
//       }
//       setSignInError(errorMessage)
//   }
  
//   }

//   return (
//     <>
//       {/* <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button> */}
// <div id="recaptchaVerifier"></div>
//       <Modal show={true} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter your Phone number for Verification</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input
//             type=""
//             className="numberone"
//             style={{
//               marginLeft: "25%",
//               width: "50%",
//               borderStyle: "5px solid black",
//             }}
//             id="number"
//              onChange={(e) => setPhoneNumber(e.target.value)}

//              placeholder="Enter your phone No"
            
//           />
//           {signInError && (
//             <p className="error-message" style={{ color: "red" }}>
//               {signInError}
//             </p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           {/* <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button> */}
//           <Button
//           id = "button"
//             variant="primary"
//             onClick={valid}
//             style={{ marginRight: "30%" }}
//             className="button"
            
//           >
//             Send Code
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default OTPmodal;


import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import propTypes from "prop-types";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, onAuthStateChanged } from "firebase/auth";

function OTPmodal({ onClose }) {
  const [signInError, setSignInError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    const initRecaptcha = async () => {
   try{
      window.recaptchaVerifier = new RecaptchaVerifier('recaptchaVerifier', {
        'size': 'invisible',
      });
      window.recaptchaVerifier.container = document.getElementById("recaptchaVerifier");
      setRecaptchaVerifier(window.recaptchaVerifier);
    } catch(error){
      console.log("Error initializing RecaptchaVerifier",error);
    }
    };
    initRecaptcha();
  }, []);

  const valid = async (event) => {
    event.preventDefault();
    setSignInError(null);

    if (!recaptchaVerifier) {
      console.log("RecaptchaVerifier not initialized yet!");
      return;
    }

    try {
      const auth = getAuth();
      await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("OTP modal worked redirecting....");
          // Handle successful sign-in here (e.g., redirect to another page)
          //onClose(); // Close the modal after successful verification
        }
      });

    } catch (error) {
      console.log("Error during phone number authentication", error);

      let errorMessage;

      switch (error.code) {
        case "auth/invalid-phone-number":
          errorMessage = "Phone number is invalid";
          break;
        case "auth/network-requests-failed":
          errorMessage = "Check your internet connection";
          break;
        case "auth/quota-exceeded":
          errorMessage = "Quota exceeded. Please try later.";
          break;
        default:
          errorMessage = "An unknown error occurred";
          break;
      }

      setSignInError(errorMessage);
    }
  };

  return (
    <>
      <div id="recaptchaVerifier"></div>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your Phone number for Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            className="numberone"
            style={{ marginLeft: "25%", width: "50%", borderStyle: "5px solid black" }}
            id="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone No"
          />
          {signInError && (
            <p className="error-message" style={{ color: "red" }}>
              {signInError}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" id="button" onClick={valid} style={{ marginRight: "30%" }}>
            Send Code
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

OTPmodal.propTypes = {
  onClose: propTypes.func.isRequired, // Define 'onClose' prop as a required function
};

export default OTPmodal;
