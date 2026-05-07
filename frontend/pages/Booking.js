import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../api";

export default function Bookings() {

  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [cancelBookingData, setCancelBookingData] = useState(null);

  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const slotData = await api("/slots");
      const bookingData = await api("/bookings");

      setSlots(slotData);
      setBookings(bookingData);

    } catch (error) {
      console.error(error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Make booking
  const confirmBooking = async () => {

    try {

      await api("/book", "POST", {
        slot_id: selectedSlot.id
      });

      alert("Booking Successful!");

      setSelectedSlot(null);

      fetchData();

    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  };

  // Cancel booking
  const confirmCancelBooking = async () => {

    try {

      await api(`/booking/${cancelBookingData.id}`, "DELETE");

      alert("Booking Cancelled");

      setCancelBookingData(null);

      fetchData();

    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <Layout>

      <h2 style={heading}>My Bookings</h2>

      {/* Available Slots Section */}
      <div style={sectionHeader}>
        <h3>Available Slots</h3>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <div style={grid}>

          {slots.map((slot) => (

            <div key={slot.id} style={card}>

              <h3>{slot.time}</h3>

              <p>
                Capacity: {slot.capacity}
              </p>

              <button
                style={bookButton}
                onClick={() => setSelectedSlot(slot)}
              >
                Book Slot
              </button>

            </div>

          ))}

        </div>
      )}

      {/* My Bookings Section */}
      <div style={{ marginTop: "40px" }}>
        <div style={sectionHeader}>
          <h3>Booked Slots</h3>
        </div>

        {bookings.length === 0 ? (

          <div style={emptyCard}>
            <p>No bookings available</p>
          </div>

        ) : (

          <div style={grid}>

            {bookings.map((booking) => (

              <div key={booking.id} style={card}>

                <div style={topSection}>
                  <h3>Gym Booking</h3>

                  <span style={status}>
                    Active
                  </span>
                </div>

                <p>
                  <strong>Booking ID:</strong> {booking.id}
                </p>

                <p>
                  <strong>Slot ID:</strong> {booking.slot_id}
                </p>

                <button
                  style={cancelButton}
                  onClick={() => setCancelBookingData(booking)}
                >
                  Cancel Booking
                </button>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Booking Modal */}
      {selectedSlot && (

        <div style={overlay}>

          <div style={modal}>

            <h2>Confirm Booking</h2>

            <p>
              Are you sure you want to book:
            </p>

            <h3>{selectedSlot.time}</h3>

            <div style={buttonGroup}>

              <button
                style={confirmBtn}
                onClick={confirmBooking}
              >
                Confirm
              </button>

              <button
                style={closeBtn}
                onClick={() => setSelectedSlot(null)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Cancel Booking Modal */}
      {cancelBookingData && (

        <div style={overlay}>

          <div style={modal}>

            <h2>Cancel Booking</h2>

            <p>
              Are you sure you want to cancel this booking?
            </p>

            <div style={buttonGroup}>

              <button
                style={dangerBtn}
                onClick={confirmCancelBooking}
              >
                Yes, Cancel
              </button>

              <button
                style={closeBtn}
                onClick={() => setCancelBookingData(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </Layout>
  );
}


/* ---------------- STYLES ---------------- */

const heading = {
  marginBottom: "20px"
};

const sectionHeader = {
  marginBottom: "15px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const topSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px"
};

const status = {
  background: "#dcfce7",
  color: "#166534",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const bookButton = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const cancelButton = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const emptyCard = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
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

const confirmBtn = {
  flex: 1,
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const dangerBtn = {
  flex: 1,
  padding: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const closeBtn = {
  flex: 1,
  padding: "10px",
  background: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};
