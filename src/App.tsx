import { Routes, Route, Navigate  } from "react-router-dom";
import Signin from "./signin";
import Register from "./register";
import Master from "./master";

function App() {
  return (
    <Routes>
       {/* Redirect root "/" to /signin */}
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/master" element={<Master />} />
    </Routes>
  );
}

export default App;
