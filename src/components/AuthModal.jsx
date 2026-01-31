import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { TABS, MESSAGES, VALIDATION_MSGS } from "../utils/constants";
import {
  validateName,
  validatePassword,
  validateMatch,
} from "../utils/validator";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, signup, checkEmailExists } = useAuth();
  const [currentTab, setCurrentTab] = useState(TABS.LOGIN);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const overlayStyle = { display: isOpen ? "flex" : "none" };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setCurrentTab(TABS.LOGIN);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setErrors({});
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e?.detail?.reason === "startGame") {
        setMessage({ text: MESSAGES.LOGIN_REQUIRED, type: "error" });
      }
    };
    window.addEventListener("aa:auth:prompt", handler);
    return () => window.removeEventListener("aa:auth:prompt", handler);
  }, []);

  const handleTabSwitch = (tab) => {
    setCurrentTab(tab);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setMessage({ text: "", type: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setMessage({ text: "", type: "" });

    const { name, email, password, confirmPassword } = formData;

    if (currentTab === TABS.SIGNUP) {
      if (!name || !email || !password || !confirmPassword) {
        setMessage({ text: MESSAGES.FILL_REQUIRED, type: "error" });
        return;
      }

      const nameError = validateName(name);
      if (nameError) {
        setErrors({ name: nameError });
        return;
      }

      const passError = validatePassword(password);
      if (passError) {
        setErrors({ password: passError });
        return;
      }

      const matchError = validateMatch(password, confirmPassword);
      if (matchError) {
        setErrors({ confirmPassword: matchError });
        return;
      }

      if (checkEmailExists(email)) {
        setErrors({ email: MESSAGES.DUPLICATE_EMAIL });
        return;
      }

      const result = signup(name, email, password);
      if (result.success) {
        onClose();
      }
    } else {
      console.log("📝 Login form submitted:", { email, password: "***" });

      if (!email || !password) {
        console.log("❌ Missing required fields");
        setMessage({ text: MESSAGES.FILL_REQUIRED, type: "error" });
        return;
      }

      console.log("🔄 Calling login function...");
      const result = login(email, password);
      console.log("📊 Login result:", result);

      if (!result.success) {
        console.log("❌ Login failed:", result.error);
        setErrors({});
        if (result.error === "EMAIL_NOT_FOUND") {
          setMessage({ text: MESSAGES.EMAIL_NOT_FOUND, type: "error" });
        } else {
          setMessage({ text: MESSAGES.INCORRECT_PASSWORD, type: "error" });
        }
        return;
      }

      console.log("✅ Login successful, closing modal");
      onClose();
    }
  };

  return (
    <div id="loginOverlay" className="overlay" style={overlayStyle}>
      <div className="modal">
        <button id="closeModal" className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-brand">Animation Arcade</div>
        <h2 id="modal-title">
          {currentTab === TABS.LOGIN ? "Login" : "Sign Up"}
        </h2>

        <div
          className="tab-container"
          role="tablist"
          aria-label="Authentication"
        >
          <button
            className={`tab-btn ${currentTab === TABS.LOGIN ? "active" : ""}`}
            data-tab="login"
            onClick={() => handleTabSwitch(TABS.LOGIN)}
          >
            Login
          </button>
          <button
            className={`tab-btn ${currentTab === TABS.SIGNUP ? "active" : ""}`}
            data-tab="signup"
            onClick={() => handleTabSwitch(TABS.SIGNUP)}
          >
            Sign Up
          </button>
        </div>

        {message.text && (
          <div id="authMessage" className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form id="authForm" className="auth-form" onSubmit={handleSubmit}>
          {currentTab === TABS.SIGNUP && (
            <div
              className={`form-group ${errors.name ? "show-tooltip" : ""}`}
              data-tooltip={errors.name}
            >
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                aria-label="Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
            </div>
          )}

          <div
            className={`form-group ${errors.email ? "show-tooltip" : ""}`}
            data-tooltip={errors.email}
          >
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
          </div>

          <div
            className={`form-group ${errors.password ? "show-tooltip" : ""}`}
            data-tooltip={errors.password}
          >
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
          </div>

          {currentTab === TABS.SIGNUP && (
            <div
              className={`form-group ${errors.confirmPassword ? "show-tooltip" : ""}`}
              data-tooltip={errors.confirmPassword}
            >
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
            </div>
          )}

          <button id="submitBtn" type="submit" className="submit-btn">
            {currentTab === TABS.LOGIN ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <span id="authFooterText">
            <span id="footerActionText">
              {currentTab === TABS.LOGIN
                ? "New user?"
                : "Already have an account?"}
            </span>{" "}
            <a
              href="#"
              id="footerActionLink"
              onClick={(e) => {
                e.preventDefault();
                handleTabSwitch(
                  currentTab === TABS.LOGIN ? TABS.SIGNUP : TABS.LOGIN,
                );
              }}
            >
              {currentTab === TABS.LOGIN ? "Sign up" : "Login"}
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
