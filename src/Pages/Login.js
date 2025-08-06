// src/pages/Login.js
/*function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Password"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-sm text-center mt-3">
          New user?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
export default Login;*/
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin =async (e) => {
    e.preventDefault();
    setError(""); 

   try{

     const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      
       const { token, user } = res.data;

         localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
    
       if (user.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

   }catch(err){
     if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }

    
  };

  return (
    <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <input className="w-full p-2 mb-3 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full p-2 mb-3 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
    <p className="text-sm text-center mt-3">
          Register{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
    
    
    </form>
  );
}

export default Login;

