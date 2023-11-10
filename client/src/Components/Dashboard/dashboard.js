import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Make an HTTP request to fetch data from the server
    axios
      .post("http://localhost:5000/api/fetchComplaints", {
        assignedStaffUsername: "BhavyaP",
      }) // Replace with your API endpoint
      .then((response) => {
        console.log(response);
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

  return (
    <div class="dashboard">
      <h1>Complaints Table</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Issue Subcategory</th>
            <th>Complaint Description</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>
                {complaint.firstname} {complaint.lastname}
              </td>
              <td>{complaint.mobileNo}</td>
              <td>{complaint.issueSubcategory}</td>
              <td>{complaint.complaintDescription}</td>
              <td>{complaint.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
