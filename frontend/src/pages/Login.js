import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api("/login", "POST", {
        email,
        password
      });

      if (response.token) {

        // Save token
        localStorage.setItem("token", response.token);

        alert("Login Successful");

        // Navigate to dashboard
        navigate("/dashboard");

      } else {
        alert(response.detail || "Login Failed");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      {/* Left Section */}
      <div style={leftSection}>
        <div>
          <h1 style={title}>🏋️ Gym Management</h1>
          <p style={subtitle}>
            Manage your gym slots, bookings and attendance easily.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div style={rightSection}>

        <form style={loginCard} onSubmit={handleLogin}>

          <h2 style={heading}>Login</h2>

          <p style={smallText}>
            Welcome back! Please login to continue.
          </p>

          {/* Email */}
          <div style={inputGroup}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={input}
            />
          </div>

          {/* Password */}
          <div style={inputGroup}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={input}
            />
          </div>

          {/* Login Button */}
          <button type="submit" style={button}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Demo Text */}
          <p style={footerText}>
            Gym Slot Booking Application
          </p>

        </form>

      </div>
    </div>
  );
}


/* ---------------- STYLES ---------------- */

const container = {
  display: "flex",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
  background: "#f4f7fb"
};

const leftSection = {
  flex: 1,
  background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px"
};

const title = {
  fontSize: "42px",
  marginBottom: "10px"
};

const subtitle = {
  fontSize: "18px",
  lineHeight: "28px",
  maxWidth: "400px"
};

const rightSection = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const loginCard = {
  width: "380px",
  background: "white",
  padding: "35px",
  borderRadius: "14px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
};

const heading = {
  marginBottom: "10px",
  color: "#1e293b"
};

const smallText = {
  color: "gray",
  marginBottom: "25px"
};

const inputGroup = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column"
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "6px",
  fontSize: "14px"
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
};

const footerText = {
  marginTop: "20px",
  textAlign: "center",
  color: "gray",
  fontSize: "14px"
};
