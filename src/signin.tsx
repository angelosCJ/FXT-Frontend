import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import axios from 'axios';
import './App.css';


function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [debugLogin, setDebugLogin] = useState("Success message here");
  const [loginFailed, setLoginFailed] = useState("Error message here");


const loginUser = async () => {
  try {
    const response = await axios.post(
      "https://fxtserver.onrender.com/api/auth/login",
      { email, password }
    );

    // Assuming your backend sends { token: "..." }
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      setDebugLogin("Login successful");
      navigate("/master");
    } else {
      setLoginFailed("No token received from server");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setLoginFailed("Failed to login: " + (error.response?.data?.error || error.message));
    } else {
      setLoginFailed("Unexpected error occurred");
    }
  }
};



  const goToRegister = () => {
    navigate("/register");
  };

  return (
 
      <div className="signin">
        <div className="lFrame">
          <h1>Sign in</h1>
          <div className="lMessageBlock">
            <div className="axiosMessage">{debugLogin}</div>
            <div className="axiosMessage">{loginFailed}</div>
          </div>
          <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='email' />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password' />
          <div onClick={loginUser} className="lButton">Log in</div>
          <div className="goToRegister" onClick={goToRegister}>Register Account</div>
        </div>
      </div>
    
  );
}

export default Signin;
