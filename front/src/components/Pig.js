import { useState, useEffect } from "react";

export default function Pig({ totalSavings }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500; // Animation duration in milliseconds
    const step = totalSavings / (duration / 100); // Increment step based on duration
    let current = 0;

    const timer = setInterval(() => {
      if (current < totalSavings) {
        setCount((prevCount) => prevCount + step);
        current += step;
      } else {
        setCount(totalSavings); // Ensure the final value is accurate
        clearInterval(timer);
      }
    }, 100); // Update every 100 milliseconds

    return () => {
      clearInterval(timer); // Cleanup on unmount
    };
  }, [totalSavings]);
  return (
    <div className="pig">
      <img src="pig.png" alt="pig" />
      <div className="pig-text">
        <h5>BALANCE</h5>
        <h2>${Math.floor(count)}</h2>
      </div>
    </div>
  );
}
