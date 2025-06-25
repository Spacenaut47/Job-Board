import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post("/user/login", {
        email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token); 
        alert("Login successful!");
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
