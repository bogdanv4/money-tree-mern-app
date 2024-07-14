import { useState } from "react";
import Button from "../components/Button";

export default function RegisterForm({ onNext }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [formCompleted, setFormCompleted] = useState(false);

  const [validations, setValidations] = useState({
    emailValid: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasLength: false,
    passwordsMatch: false,
    isPasswordEntered: false,
    isEmailEntered: false,
  });

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    setValidations((prev) => ({
      ...prev,
      emailValid: isValid,
      isEmailEntered: true,
    }));
  };

  const validatePassword = (password, confirmPassword) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLength = password.length >= 8;
    const passwordsMatch = password === confirmPassword;
    const isPasswordEntered = password.length > 0;

    setValidations({
      ...validations,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasLength,
      passwordsMatch,
      isPasswordEntered,
    });
  };

  const handleNext = (e) => {
    if (
      validations.emailValid &&
      validations.hasLowercase &&
      validations.hasUppercase &&
      validations.hasNumber &&
      validations.hasLength &&
      validations.passwordsMatch
    ) {
      const formData = {
        email,
        password,
      };
      onNext(formData);
    }
  };

  return (
    <form className="register-form">
      <div className="last-input">
        <input
          type="text"
          placeholder="Enter Email*"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      {validations.isEmailEntered &&
        (validations.emailValid ? (
          <p style={{ color: "green" }}>Valid Email</p>
        ) : (
          <p style={{ color: "red" }}>Invalid Email</p>
        ))}
      <div>
        <input
          type="password"
          placeholder="Enter Password*"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="last-input">
        <input
          type="password"
          placeholder="Confirm Password*"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      {validations.isPasswordEntered &&
        (validations.passwordsMatch ? (
          <p style={{ color: "#8cb050" }}>Passwords Match</p>
        ) : (
          <p style={{ color: "red" }}>Passwords Don't Match</p>
        ))}
      <div className="password-req">
        <h5>Password Requirements:</h5>
        <ul className="password-req-list">
          <li
            className={
              validations.hasUppercase ? "valid-password" : "invalid-password"
            }
          >
            ABC
          </li>
          <li
            className={
              validations.hasLowercase ? "valid-password" : "invalid-password"
            }
          >
            abc
          </li>
          <li
            className={
              validations.hasNumber ? "valid-password" : "invalid-password"
            }
          >
            123
          </li>
          <li
            className={
              validations.hasLength ? "valid-password" : "invalid-password"
            }
          >
            8 Characters
          </li>
        </ul>
      </div>

      <Button className={"submit-btn"} onClick={handleNext}>
        Next
      </Button>
    </form>
  );
}
