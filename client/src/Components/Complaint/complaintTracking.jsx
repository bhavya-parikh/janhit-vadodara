import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintTracking = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's complaints from your backend or API
    axios.get("http://your-api-endpoint/complaints").then((response) => {
      setComplaints(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Complaint Tracking Page</h1>
      {loading ? (
        <p>Loading complaints...</p>
      ) : (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id}>
              <h2>Complaint ID: {complaint.id}</h2>
              <p>Category: {complaint.category}</p>
              <p>Status: {complaint.status}</p>
              <p>Description: {complaint.description}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplaintTracking;
