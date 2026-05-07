import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api";

export default function AttendanceList() {

  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch attendance data
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {

    try {

      const data = [
        {
          id: 1,
          user: "John Doe",
          slot: "6:00 AM - 7:00 AM",
          date: "07 May 2026",
          status: "Present"
        },
        {
          id: 2,
          user: "Jane Smith",
          slot: "7:00 AM - 8:00 AM",
          date: "07 May 2026",
          status: "Present"
        },
        {
          id: 3,
          user: "Michael",
          slot: "8:00 AM - 9:00 AM",
          date: "07 May 2026",
          status: "Absent"
        }
      ];

      setAttendanceList(data);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch attendance records");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      {/* Header */}
      <div style={header}>

        <div>
          <h2>Attendance List</h2>

          <p style={subText}>
            Monitor gym attendance records
          </p>
        </div>

        <div style={summaryBox}>
          Total Records: {attendanceList.length}
        </div>

      </div>

      {/* Attendance Table */}
      <div style={tableContainer}>

        {loading ? (

          <p>Loading attendance records...</p>

        ) : attendanceList.length === 0 ? (

          <div style={emptyState}>
            No attendance records found
          </div>

        ) : (

          <table style={table}>

            <thead>

              <tr>

                <th style={th}>User</th>
                <th style={th}>Slot</th>
                <th style={th}>Date</th>
                <th style={th}>Status</th>

              </tr>

            </thead>

            <tbody>

              {attendanceList.map((item) => (

                <tr key={item.id} style={tr}>

                  <td style={td}>{item.user}</td>

                  <td style={td}>{item.slot}</td>

                  <td style={td}>{item.date}</td>

                  <td style={td}>

                    <span
                      style={
                        item.status === "Present"
                          ? presentBadge
                          : absentBadge
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* Stats Section */}
      <div style={statsGrid}>

        <div style={statCard}>
          <h2>24</h2>
          <p>Total Present</p>
        </div>

        <div style={statCard}>
          <h2>5</h2>
          <p>Total Absent</p>
        </div>

        <div style={statCard}>
          <h2>82%</h2>
          <p>Attendance Rate</p>
        </div>

      </div>

    </Layout>
  );
}


/* ---------------- STYLES ---------------- */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px"
};

const subText = {
  color: "gray"
};

const summaryBox = {
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "10px 15px",
  borderRadius: "10px",
  fontWeight: "bold"
};

const tableContainer = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  overflowX: "auto"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: "14px",
  borderBottom: "1px solid #ddd",
  background: "#f8fafc"
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #eee"
};

const tr = {
  transition: "0.2s"
};

const presentBadge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const absentBadge = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const emptyState = {
  textAlign: "center",
  padding: "20px",
  color: "gray"
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "25px"
};

const statCard = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  textAlign: "center"
};
