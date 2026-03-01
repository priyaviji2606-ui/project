// src/Delivery.jsx

import { useEffect, useState } from "react";

function Delivery() {
  const [status, setStatus] = useState("Preparing");
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const stages = [
      { text: "Preparing", value: 25 },
      { text: "Packed", value: 50 },
      { text: "Out for Delivery", value: 75 },
      { text: "Delivered", value: 100 },
    ];

    let index = 0;

    const interval = setInterval(() => {
      index++;

      if (index < stages.length) {
        setStatus(stages[index].text);
        setProgress(stages[index].value);
      } else {
        clearInterval(interval);
      }
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🚚 Delivery Tracking
        </h2>

        <p className="mb-4 text-lg">{status}</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {status === "Delivered" && (
          <p className="text-green-700 font-semibold">
            🎉 Your Order Has Been Delivered!
          </p>
        )}
      </div>
    </div>
  );
}

export default Delivery;