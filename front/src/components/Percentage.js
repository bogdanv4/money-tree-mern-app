const percetage = ["25%", "50%", "75%", "100%"];

export default function Percentage({ step }) {
  return (
    <div className="percentage">
      <p>
        <span className="percetage-number">{percetage[step - 1]}</span> Complete
      </p>
      <h5>Personal details</h5>
      <span className={`${step >= 1 ? "line active" : "line"}`}></span>
      <span className={`${step >= 2 ? "line active" : "line"}`}></span>
      <span className={`${step >= 3 ? "line active" : "line"}`}></span>
      <span className={`${step === 4 ? "line active" : "line"}`}></span>
      <br />
      <br />
      <h2>Sign Up Free</h2>
      <h5>Please fill up the following fields</h5>
    </div>
  );
}
