import { createContext, useState, useEffect } from "react";
import { STORAGE_KEYS, MESSAGES } from "../utils/constants";

export const AuthContext = createContext();

const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    console.log("📦 AuthContext: Stored user found:", stored);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("❌ AuthContext: Error parsing user from localStorage:", err);
    return null;
  }
};

const getAllUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredAuth);

  useEffect(() => {
    console.log("🔐 AuthProvider: MOUNTED");
    return () => console.log("🔐 AuthProvider: UNMOUNTED");
  }, []);
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    console.log("🔐 Login attempt:", {
      email: normalizedEmail,
      password: "***",
    });
    const users = getAllUsers();
    console.log(
      "👥 Users in database:",
      users.length,
      users.map((u) => ({ email: u.email, name: u.name })),
    );

    const foundUser = users.find((u) => u.email === normalizedEmail);

    if (!foundUser) {
      console.log("❌ Email not found:", normalizedEmail);
      return { success: false, error: "EMAIL_NOT_FOUND" };
    }

    console.log("✅ User found:", {
      name: foundUser.name,
      email: foundUser.email,
    });

    if (foundUser.password !== trimmedPassword) {
      console.log("❌ Password mismatch");
      return { success: false, error: "INCORRECT_PASSWORD" };
    }

    console.log("✅ Password correct, logging in...");
    const userData = { name: foundUser.name, email: foundUser.email };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setUser(userData);

    console.log("✅ Login successful!", userData);
    return { success: true, user: userData };
  };

  const signup = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    const users = getAllUsers();

    if (users.find((u) => u.email === normalizedEmail)) {
      return { success: false, error: "DUPLICATE_EMAIL" };
    }

    const newUser = {
      name: trimmedName,
      email: normalizedEmail,
      password: trimmedPassword,
    };
    users.push(newUser);
    saveUsers(users);

    const userData = { name: trimmedName, email: normalizedEmail };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setUser(userData);

    return { success: true, user: userData };
  };

  const logout = () => {
    if (window.confirm(MESSAGES.LOGOUT_CONFIRM)) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
      return true;
    }
    return false;
  };

  const checkEmailExists = (email) => {
    const users = getAllUsers();
    return users.some((u) => u.email === email);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, checkEmailExists }}
    >
      {children}
    </AuthContext.Provider>
  );
};
