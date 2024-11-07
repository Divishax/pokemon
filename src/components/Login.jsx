import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && email) {
      navigate("/pokemon");
    } else {
      alert("Please fill in both username and email.");
    }
  };

  //   const handleNavigate = () => {
  //     navigate("/pokemon");
  //   };

  return (
    <>
      <h1>Dashboard Login </h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {/* <button onClick={handleNavigate} type="submit">
          Login
        </button> */}
      </form>
    </>
  );
}
