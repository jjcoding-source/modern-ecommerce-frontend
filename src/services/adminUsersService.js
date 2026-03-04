const USERS_KEY = "users";

// Get all users
export function getUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save users array
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Add new user
export function addUser(user) {
  const users = getUsers();

  const newUser = {
    id: Date.now(),
    name: user.name,
    email: user.email,
    role: user.role || "user"
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
}

// Update existing user
export function updateUser(updatedUser) {
  const users = getUsers();

  const updated = users.map((u) =>
    u.id === updatedUser.id ? { ...u, ...updatedUser } : u
  );

  saveUsers(updated);
}

// Delete user
export function deleteUser(userId) {
  const users = getUsers();

  const filtered = users.filter((u) => u.id !== userId);

  saveUsers(filtered);
}