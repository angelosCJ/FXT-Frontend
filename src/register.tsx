import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './App.css';
import { useState } from "react";


function Register() {
  const navigate = useNavigate();
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [debug,setDebug] = useState("Success message here");
  const [axiosFailed,setAxiosFailed] = useState("Error message here"); 

   const registerUser = async (e:any) => {
  e.preventDefault();
  console.log("Button clicked, starting registration...");
  try {
     await axios.post("https://fxtserver.onrender.com/api/auth/register", { userName, email, password });
      setDebug("Registration successful: " );
     navigate("/signin");
  } catch (error) {
  if (axios.isAxiosError(error)) {
    setAxiosFailed("Error: " + (error.response?.data?.error || error.message));
  } else {
    setAxiosFailed("Unexpected error occurred");
  }
}

};

const backToLogin = () =>{
    navigate("/signin");
}
 

  return (
    <div className="register">
    <div className="rFrame">
     <h1>Sign up</h1>
      <div className="rMessageBlock">
         <div className="axiosMessage" >{debug}</div>  
       <div className="axiosMessage">{axiosFailed}</div>  
        </div>    
      <input type="text" onChange={(e)=> setUserName(e.target.value)} placeholder='name'/>
    <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder='email' />
  <input type="password" onChange={(e)=> setPassword(e.target.value)}  placeholder='password' />
  <div  onClick={registerUser} className="rButton">Register</div>
  <div className="goToLogin" onClick={backToLogin} >Back to Sign in</div>
    </div>
    </div>
  );
}

export default Register;
