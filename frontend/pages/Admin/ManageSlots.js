import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api";

export default function ManageSlots() {

  const [slots, setSlots] = useState([]);

  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteSlot, setDeleteSlot] = useState(null);

  // Fetch slots
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {

    try {

      const data = await api("/slots");

      setSlots(data);

    } catch (error) {
      console.error(error);
      alert("Failed to load slots");
    }
  };

  // Add slot
  const handleAddSlot = async () => {

    if (!time || !capacity) {
      alert("Please fill all fields");
      return;
    }

    try {

      await api("/slots", "POST", {
        time,
        capacity: parseInt(capacity)
      });

      alert("Slot Added Successfully");

      setShowAddModal(false);

      setTime("");
      setCapacity("");

      fetchSlots();

    } catch (error) {
      console.error(error);
      alert("Failed to add slot");
    }
  };

  // Delete slot (UI only)
  const handleDeleteSlot = async () => {

    try {

      // Optional backend delete API
      // await api(`/slots/${deleteSlot.id}`, "DELETE");

      setSlots(slots.filter((s) => s.id !== deleteSlot.id));

      alert("Slot Removed");

      setDeleteSlot(null);

    } catch (error) {
      console.error(error);
      alert("Failed to delete slot");
    }
  };

  return (
    <Layout>

      {/* Header */}
      <div style={header}>

        <div>
          <h2>Manage Slots</h2>
          <p style={subText}>
            Add, manage and monitor gym slots
          </p>
        </div>

        <button
          style={addButton}
          onClick={() => setShowAddModal(true)}
        >
          + Add Slot
        </button>

      </div>

      {/* Slots Grid */}
      <div style={grid}>

        {slots.map((slot) => (

          <div key={slot.id} style={card}>

            <div style={topSection}>

              <div>
                <h3>{slot.time}</h3>

                <p style={capacityText}>
                  Capacity: {slot.capacity}
                </p>
              </div>

              <div style={status}>
                Active
              </div>

            </div>

            <button
              style={deleteButton}
              onClick={() => setDeleteSlot(slot)}
            >
              Delete Slot
            </button>

          </div>

        ))}

      </div>

      {/* Add Slot Modal */}
      {showAddModal && (

        <div style={overlay}>

          <div style={modal}>

            <h2>Add New Slot</h2>

            <input
              type="text"
              placeholder="Enter Slot Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={input}
            />

            <input
              type="number"
              placeholder="Enter Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              style={input}
            />

            <div style={buttonGroup}>

              <button
                style={confirmButton}
                onClick={handleAddSlot}
              >
                Add Slot
              </button>

              <button
                style={cancelButton}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Delete Modal */}
      {deleteSlot && (

        <div style={overlay}>

          <div style={modal}>

            <h2>Delete Slot</h2>

            <p>
              Are you sure you want to remove this slot?
            </p>

            <h3>{deleteSlot.time}</h3>

            <div style={buttonGroup}>

              <button
                style={dangerButton}
                onClick={handleDeleteSlot}
              >
                Delete
              </button>

              <button
                style={cancelButton}
                onClick={() => setDeleteSlot(null)}
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
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px"
};

const subText = {
  color: "gray"
};

const addButton = {
  padding: "12px 18px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
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
  marginBottom: "20px"
};

const capacityText = {
  color: "gray"
};

const status = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const deleteButton = {
  width: "100%",
  padding: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
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
  width: "350px"
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
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

const dangerButton = {
  flex: 1,
  padding: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const cancelButton = {
  flex: 1,
  padding: "10px",
  background: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};
