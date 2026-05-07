import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Slots from "./pages/Slots";
import Bookings from "./pages/Bookings";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import ManageSlots from "./pages/admin/ManageSlots";
import AttendanceList from "./pages/admin/AttendanceList";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/slots" element={<ManageSlots />} />
        <Route path="/admin/attendance" element={<AttendanceList />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
