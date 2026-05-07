import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const data = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "User",
          status: "Active"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Admin",
          status: "Active"
        },
        {
          id: 3,
          name: "Michael",
          email: "michael@example.com",
          role: "User",
          status: "Inactive"
        }
      ];

      setUsers(data);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Remove user
  const handleDeleteUser = async () => {

    try {

      // Optional backend API
      // await api(`/users/${selectedUser.id}`, "DELETE");

      setUsers(users.filter((u) => u.id !== selectedUser.id));

      alert("User Removed Successfully");

      setSelectedUser(null);

    } catch (error) {
      console.error(error);
      alert("Failed to remove user");
    }
  };

  return (
    <Layout>

      {/* Header */}
      <div style={header}>

        <div>
          <h2>Users Management</h2>

          <p style={subText}>
            Manage all gym application users
          </p>
        </div>

        <div style={countBox}>
          Total Users: {users.length}
        </div>

      </div>

      {/* Users Table */}
      <div style={tableContainer}>

        {loading ? (

          <p>Loading users...</p>

        ) : users.length === 0 ? (

          <div style={emptyState}>
            No users found
          </div>

        ) : (

          <table style={table}>

            <thead>

              <tr>

                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id}>

                  <td style={td}>{user.name}</td>

                  <td style={td}>{user.email}</td>

                  <td style={td}>

                    <span
                      style={
                        user.role === "Admin"
                          ? adminBadge
                          : userBadge
                      }
                    >
                      {user.role}
                    </span>

                  </td>

                  <td style={td}>

                    <span
                      style={
                        user.status === "Active"
                          ? activeBadge
                          : inactiveBadge
                      }
                    >
                      {user.status}
                    </span>

                  </td>

                  <td style={td}>

                    <button
                      style={deleteButton}
                      onClick={() => setSelectedUser(user)}
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* Stats */}
      <div style={statsGrid}>

        <div style={statCard}>
          <h2>12</h2>
          <p>Active Users</p>
        </div>

        <div style={statCard}>
          <h2>3</h2>
          <p>Admins</p>
        </div>

        <div style={statCard}>
          <h2>15</h2>
          <p>Total Users</p>
        </div>

      </div>

      {/* Delete Modal */}
      {selectedUser && (

        <div style={overlay}>

          <div style={modal}>

            <h2>Remove User</h2>

            <p>
              Are you sure you want to remove:
            </p>

            <h3>{selectedUser.name}</h3>

            <div style={buttonGroup}>

              <button
                style={dangerButton}
                onClick={handleDeleteUser}
              >
                Remove
              </button>

              <button
                style={cancelButton}
                onClick={() => setSelectedUser(null)}
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

const countBox = {
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "10px 15px",
  borderRadius: "10px",
  fontWeight: "bold"
};

const tableContainer = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
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

const adminBadge = {
  background: "#ede9fe",
  color: "#5b21b6",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const userBadge = {
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const activeBadge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const inactiveBadge = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
};

const deleteButton = {
  padding: "8px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
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
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
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
