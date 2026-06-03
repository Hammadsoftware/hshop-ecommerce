import axios from "axios";
import React, { useState, useEffect } from "react";

// Fetch users from your updated API
const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/getAllUsers");
    return response.data.users; // Extract the users array
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setSelectedUser(user)}
                  >
                    View / Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal or Popup for selected user */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-4 text-gray-500 text-xl"
              onClick={() => setSelectedUser(null)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">
              {selectedUser.name}'s Details
            </h2>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span className="capitalize">{selectedUser.role}</span>
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
