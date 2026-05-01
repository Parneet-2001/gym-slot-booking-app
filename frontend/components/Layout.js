import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "230px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        position: "fixed"
      }}>
        <h2>🏋️ Gym App</h2>

        <p><Link to="/dashboard" style={link}>Dashboard</Link></p>
        <p><Link to="/slots" style={link}>Available Slots</Link></p>
        <p><Link to="/bookings" style={link}>My Bookings</Link></p>
        <p><Link to="/attendance" style={link}>Attendance</Link></p>
        <p><Link to="/profile" style={link}>Profile</Link></p>

        <hr/>

        <p><Link to="/admin/slots" style={link}>Manage Slots</Link></p>
        <p><Link to="/admin/attendance" style={link}>Attendance List</Link></p>
        <p><Link to="/admin/users" style={link}>Users</Link></p>
        <p><Link to="/admin/settings" style={link}>Settings</Link></p>

        <button onClick={()=>{
          localStorage.clear();
          window.location.href = "/";
        }}>Logout</button>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: "250px",
        padding: "20px",
        width: "100%"
      }}>
        {children}
      </div>
    </div>
  );
}

const link = {
  color: "white",
  textDecoration: "none"
};
