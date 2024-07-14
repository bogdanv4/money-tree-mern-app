import React, { useState } from "react";
import Button from "../components/Button";

export default function Modal({ onClose, onUpdate }) {
  const [income, setIncome] = useState("");
  const [outcome, setOutcome] = useState("");

  const handleCalculate = (e) => {
    e.preventDefault();
    const savings = parseInt(income) - parseInt(outcome);
    onUpdate({
      income: parseInt(income),
      outcome: parseInt(outcome),
      savings,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Money Tree</h2>
        <p>
          Insert your monthly incomes and outcomes and we will do the magic for
          you.
        </p>
        <form className="modal-form">
          <input
            type="number"
            placeholder="Income*"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Outcome*"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />
          <Button className={"link-btn left"} onClick={handleCalculate}>
            Calculate
          </Button>
          <Button className={"link-btn right"} onClick={onClose}>
            Close
          </Button>
        </form>
      </div>
    </div>
  );
}
