export default function BookingModal({ onClose, onConfirm }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Confirm Booking</h3>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)"
};

const modal = {
  background: "white",
  padding: "20px",
  margin: "100px auto",
  width: "300px",
  borderRadius: "10px"
};
