import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        
        <div style={card}>
          <h3>Bookings</h3>
          <p>5</p>
        </div>

        <div style={card}>
          <h3>Attendance</h3>
          <p>12 Days</p>
        </div>

        <div style={card}>
          <h3>Active Slots</h3>
          <p>8</p>
        </div>

      </div>
    </Layout>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "150px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};
