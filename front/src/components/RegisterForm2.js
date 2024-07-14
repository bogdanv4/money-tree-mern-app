import { useState } from "react";
import Button from "../components/Button";

export default function RegisterForm2({ onNext }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");

  const [validations, setValidations] = useState({
    hasFirstName: false,
    hasLastName: false,
    hasDate: false,
    hasUsername: false,
  });

  const handleFirstNameChange = (e) => {
    const newFirstName = e.target.value;
    setFirstName(newFirstName);

    setValidations({
      ...validations,
      hasFirstName: true,
    });
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    setValidations({
      ...validations,
      hasLastName: true,
    });
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);

    const selectedDate = new Date(newDate);
    const year = selectedDate.getFullYear();
    setUsername(firstName.toLowerCase() + lastName.toLowerCase() + year);

    setValidations({
      ...validations,
      hasDate: true,
      hasUsername: true,
    });
  };

  const handleNext = () => {
    if (
      validations.hasFirstName &&
      validations.hasLastName &&
      validations.hasDate &&
      validations.hasUsername
    ) {
      const formData = {
        firstName,
        lastName,
        date,
        username,
      };
      onNext(formData);
    }
  };

  return (
    <form className="register-form">
      <div className="firstname-lastname">
        <input
          type="text"
          placeholder="Enter First Name*"
          required
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="Enter Last Name*"
          required
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>

      <div>
        <label>
          <h5 style={{ color: "#a1a1a1" }}>Select date of birth:</h5>
        </label>
        <input type="date" required value={date} onChange={handleDateChange} />
      </div>
      <div>
        <input
          className="username-input"
          type="text"
          placeholder="Username"
          readOnly
          value={username}
        />
      </div>
      <Button className={"submit-btn"} onClick={handleNext}>
        Next
      </Button>
    </form>
  );
}
