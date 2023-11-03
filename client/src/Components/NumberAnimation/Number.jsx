import React, { useEffect, useState } from "react";
import "./Number.css";

function ComplaintCounters({ type }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function animateNumber() {
      let current = 0;
      const end = type === "registered" ? 15 : 7; // Set the end count based on the type prop
      const duration = 2000;
      const increment = end > current ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / (end - current)));

      const timer = setInterval(() => {
        current += increment;
        setCount(current);
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

    animateNumber();
  }, [type]); // Add type as a dependency

  return (
    <div className="animation-box">
      <div className="number-box">
        <span className="count">+{count}</span>
      </div>
    </div>
  );
}

export default ComplaintCounters;
