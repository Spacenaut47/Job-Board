import { useState } from "react";
import API from "../api/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const payload = {
      name,
      email,
      passwordHash: password,
    };

    try {
      const response = await API.post("/user/register", payload);

      if (response.status === 200) {
        alert("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      alert(err?.response?.data || "Failed to register. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <button onClick={handleRegister} style={{ padding: "10px 20px" }}>
        Register
      </button>
    </div>
  );
};

export default Register;
