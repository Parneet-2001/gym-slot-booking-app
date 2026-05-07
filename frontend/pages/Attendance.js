import { useState } from "react";
import Layout from "../components/Layout";
import { api } from "../api";

export default function Attendance() {

  const [showModal, setShowModal] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  // Mark attendance
  const markAttendance = async () => {

    try {

      await api("/attendance", "POST", {
        user_id: 1,
        slot_id: 1
      });

      setAttendanceMarked(true);
      setShowModal(false);

      alert("Attendance Marked Successfully");

    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
    }
  };

  return (
    <Layout>

      <div style={header}>
        <h2>Attendance</h2>
        <p>Track and manage your gym attendance</p>
      </div>

      {/* Attendance Card */}
      <div style={card}>

        <div style={topSection}>
          <div>
            <h3>Today's Attendance</h3>
            <p style={subText}>
              Mark your attendance for today’s workout session
            </p>
          </div>

          <div style={statusBox}>
            {attendanceMarked ? "Present" : "Pending"}
          </div>
        </div>

        <button
          style={
            attendanceMarked
              ? disabledButton
              : markButton
          }
          disabled={attendanceMarked}
          onClick={() => setShowModal(true)}
        >
          {attendanceMarked
            ? "Attendance Marked"
            : "Mark Attendance"}
        </button>

      </div>

      {/* Attendance History */}
      <div style={historyCard}>

        <h3>Attendance Summary</h3>

        <div style={summaryGrid}>

          <div style={summaryBox}>
            <h2>12</h2>
            <p>Total Present</p>
          </div>

          <div style={summaryBox}>
            <h2>2</h2>
            <p>Absent</p>
          </div>

          <div style={summaryBox}>
            <h2>85%</h2>
            <p>Attendance Rate</p>
          </div>

        </div>

      </div>

      {/* Modal */}
      {showModal && (

        <div style={overlay}>

          <div style={modal}>

            <h2>Confirm Attendance</h2>

            <p>
              Are you sure you want to mark your attendance for today?
            </p>

            <div style={buttonGroup}>

              <button
                style={confirmButton}
                onClick={markAttendance}
              >
                Confirm
              </button>

              <button
                style={cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </Layout>
  );
}


/* ---------------- STYLES ---------------- */

const header = {
  marginBottom: "20px"
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "25px"
};

const topSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const subText = {
  color: "gray"
};

const statusBox = {
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "8px 15px",
  borderRadius: "20px",
  fontWeight: "bold"
};

const markButton = {
  width: "100%",
  padding: "12px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px"
};

const disabledButton = {
  width: "100%",
  padding: "12px",
  background: "#94a3b8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "not-allowed"
};

const historyCard = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
  marginTop: "20px"
};

const summaryBox = {
  background: "#f8fafc",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "350px",
  textAlign: "center"
};

const buttonGroup = {
  display: "flex",
  gap: "10px",
  marginTop: "20px"
};

const confirmButton = {
  flex: 1,
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const cancelButton = {
  flex: 1,
  padding: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};
