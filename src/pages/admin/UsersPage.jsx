import { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from "../../services/adminUsersService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user"
  });

  const [editingId, setEditingId] = useState(null);

  // Load users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const data = getUsers();
    setUsers(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }

    if (editingId) {
      updateUser({
        id: editingId,
        ...form
      });
    } else {
      addUser(form);
    }

    resetForm();
    loadUsers();
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      role: "user"
    });
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this user?")) return;

    deleteUser(id);
    loadUsers();
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{user.id}</td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border capitalize">{user.role}</td>
                <td className="py-2 px-4 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}