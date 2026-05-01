import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../api";

export default function Slots() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Fetch slots
  useEffect(() => {
    api("/slots").then(setSlots);
  }, []);

  // Book slot
  const confirmBooking = async () => {
    await api("/book", "POST", { slot_id: selectedSlot.id });
    alert("Booking Successful!");
    setSelectedSlot(null);
  };

  return (
    <Layout>
      <h2>Available Slots</h2>

      <div style={grid}>
        {slots.map((slot) => (
          <div key={slot.id} style={card}>
            <h3>{slot.time}</h3>
            <p>Capacity: {slot.capacity}</p>

            <button onClick={() => setSelectedSlot(slot)}>
              Book Slot
            </button>
          </div>
        ))}
      </div>

      {/* Booking Popup */}
      {selectedSlot && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Confirm Booking</h3>
            <p>{selectedSlot.time}</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={confirmBooking}>Confirm</button>
              <button
                style={{ background: "red" }}
                onClick={() => setSelectedSlot(null)}
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

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "15px"
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modal = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center"
};
