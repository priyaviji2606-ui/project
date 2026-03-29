// src/Delivery.jsx
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Delivery() {
  const [status, setStatus] = useState("Preparing");
  const [progress, setProgress] = useState(25);
  const { orderId } = useParams(); // Get ID from URL

useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/order/latest/${JSON.parse(localStorage.getItem("user"))._id}`);
        const currentStatus = res.data.status;
        
        setStatus(currentStatus);
        
        // Map status to progress bar
        const progressMap = { 
          'Preparing': 25, 
          'Packed': 50, 
          'Out for Delivery': 75, 
          'Delivered': 100 
        };
        setProgress(progressMap[currentStatus] || 0);
      } catch (err) {
        console.error("Error fetching status", err);
      }
    };

    const interval = setInterval(checkStatus, 5000); // Check every 5 seconds
    checkStatus(); // Initial check

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