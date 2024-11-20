import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Dashboard Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField
            required
            id="outlined-required"
            label="Username"
            defaultValue="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText="Please enter a valid username"
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="Email"
            defaultValue="Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="Please enter a valid email address"
          />
          <button
            type="submit"
            className="py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    // <>
    //   <h1>Dashboard Login </h1>
    //   <form onSubmit={handleLogin} className="login-form">
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </>
  );
}
