function Validation (values){
let error = {}
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

//const  button = document.getElementById("button");

if (values.email === ""){
    error.email = "Email should not be empty"
}

else if (!email_pattern.test(values.email)) {
error.email = "Email Didn't match";
}

if (values.phone_number === ""){
    error.phone_number = "phone number should not be empty";
    }

if (values.password === ""){
    error.password = "password should not be empty";
} 


else if (values.confirm_password === ""){
error.confirm_password = "password should not be left empty"
}

if (String(values.password) !== String(values.confirm_password)){
    error.confirm_password = "Password not matched";
}



return error; 
}
export default Validation;