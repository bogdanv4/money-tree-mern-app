import React from "react";
import Button from "../components/Button";

export default function UserInfo({ onClose, loggedInUser }) {
  return (
    <div className="user-info-overlay">
      <div className="user-info-content">
        <h2>Hello</h2>
        <h2>{loggedInUser.username} </h2>
        <h5>Your user info:</h5>
        <p>
          <strong>Email:</strong> {loggedInUser.email}
        </p>
        <p>
          <strong>Name:</strong> {loggedInUser.firstName}
        </p>
        <p>
          <strong>Surname:</strong> {loggedInUser.lastName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {loggedInUser.date}
        </p>
        <p>
          <strong>Address:</strong> {loggedInUser.address}
        </p>
        <p>
          <strong>Phone number:</strong> {loggedInUser.phoneNumber}
        </p>
        <Button className={"submit-btn"} onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
