import React, { useState } from "react";
import "./complaint.css"; // Import your CSS file
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Complaint() {
  const [formData, setFormData] = useState({
    isPrivate: false,
    isPublic: false,
    firstName: "",
    lastName: "",
    name: "",
    mobileNumber: "",
    category: "Select Category",
    subcategory: "Select Subcategory",
    issueDescription: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
  };

  const handleSubcategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, subcategory: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement the submission logic here.
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleClick = () => {
    console.log(title, desc, image, 19);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("image", image);

    axios
      .post("http://localhost:5000/api/services", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 403 && res.data.message === "Token Expired") {
          localStorage.setItem("token", null);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="main1">
        <div className="main-container">
          <h1>Vadodara Municipal Corporation Complaint Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <p className="he1">Complain type</p>
              <label>
                <input
                  type="radio"
                  name="complaintType"
                  checked={formData.complaintType}
                  onChange={handleCheckboxChange}
                />
                Private
              </label>
              <label>
                <input
                  type="radio"
                  name="complaintType"
                  checked={formData.complaintType}
                  onChange={handleCheckboxChange}
                />
                Public
              </label>
            </div>
            <div>
              <label>
                <p className="fname">First Name:</p>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <p className="lname">Last Name:</p>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                <p className="mnumber">Mobile Number:</p>
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Address:
                <textarea
                  name="address"
                  value={formData.address} // Change this line to use formData.address
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div>
              <label>
                <p className="category">Category:</p>
                <select
                  name="issueCategory"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  <option value="Select Category">Water Logged</option>
                  <option value="Category1">Diabries</option>
                  <option value="Category2">pothholes</option>
                </select>
              </label>
              <label>
                <p className="subc">Subcategory:</p>
                <select
                  name="issueSubcategory"
                  value={formData.subcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value="Category1">Diabries</option>
                  <option value="Select Category">Water Logged</option>
                  <option value="Category2">pothholes</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Issue Description:
                <textarea
                  name="complaintDescription"
                  value={formData.complaintDescription}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                {" "}
                <p>Upload Image:</p>
                <input
                  multiple
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name="images"
                />
              </label>
            </div>
            <button onClick={handleClick} className="add-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Complaint;
