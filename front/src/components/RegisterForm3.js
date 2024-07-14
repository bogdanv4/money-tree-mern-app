import { useState } from "react";
import Button from "../components/Button";

export default function RegisterForm3({ onNext }) {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sex, setSex] = useState("male");

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  const handleSexChange = (e) => {
    const newSex = e.target.value;
    setSex(newSex);
  };

  const handleNext = () => {
    const formData = {
      address,
      sex,
      phoneNumber,
    };
    onNext(formData);
  };

  return (
    <form className="register-form">
      <div>
        <input
          type="text"
          placeholder="Enter Address"
          required
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter Phone Number"
          required
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div>
        <label>
          <h5 style={{ color: "#a1a1a1" }}>Select sex:</h5>
        </label>
        <select name="sex" value={sex} onChange={handleSexChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <Button className={"submit-btn"} onClick={handleNext}>
        Next
      </Button>
    </form>
  );
}
