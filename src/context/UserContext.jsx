import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const adminEmail = "jebin@example.com";

    const adminExists = users.find(u => u.email === adminEmail);

    if (!adminExists) {
      users.push({
        id: Date.now(),
        name: "Jebin",
        email: "jebin@example.com",
        password: "123456",
        role: "admin"
      });
    }

    users = users.map(u => {
      if (u.email === adminEmail) {
        return {
          ...u,
          password: u.password || "123456",
          role: u.role || "admin"
        };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(users));

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);

  }, []);

  const loginUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <UserContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);