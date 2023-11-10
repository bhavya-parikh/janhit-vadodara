import React, { useState, useEffect } from "react";
import "./complaint.css"; // Import your new CSS file
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Complaint = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [complaint, setComplaintDetails] = useState({
    complaintType: "Private",
    firstname: "",
    lastname: "",
    address: "",
    mobileNo: "",
    issueCategory: "Select Category",
    issueSubcategory: "Select SubCategory",
    area: "Select Area",
    ward: "Select", // Add a default ward selection
    complaintDescription: "",
    image: null,
    assignedStaffUsername: "",
    assignedStaff: "",
  });
  const [ward, setWard] = useState(null);
  const [assignedStaff, setassignedStaff] = useState(null); // Add state to store the staff name
  const [assignedStaffUsername, setAssignedStaffUsername] = useState(null); // Add state to store the staff name

  const validateForm = (values) => {
    // You can add your form validation logic here.
    // For now, let's return an empty object.
    return {};
  };

  const complaintHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(complaint));
    setIsSubmit(true);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setComplaintDetails({
      ...complaint,
      [name]: value,
    });
    if (name === "area" && value !== "Select") {
      fetchWardData(value);
    }

    if (
      name === "issueCategory" &&
      complaint.ward !== "Select" &&
      value !== "Select Category"
    ) {
      console.log("hi");
      fetchAssignStaffData(value, complaint.ward);
    }
  };

  const fetchWardData = (selectedArea) => {
    // Make a POST request to fetch ward data based on the selected area
    axios
      .post("http://localhost:5000/api/fetchWardData", { area: selectedArea })
      .then((res) => {
        const wardNo = res.data.wardNo;
        console.log(wardNo); // Access wardNo from res.data
        setComplaintDetails((prevComplaint) => ({
          ...prevComplaint,
          ward: wardNo,
        }));
      })
      .catch((error) => {
        toast(error.response.data.message);
      });
  };

  const fetchAssignStaffData = (selectedCategory, selectedWard) => {
    axios
      .post("http://localhost:5000/api/fetchFieldStaff", {
        category: selectedCategory,
        wardNo: selectedWard,
      })
      .then((res) => {
        const assignedStaff = res.data.name;
        const assignedStaffUsername = res.data.assignedStaffUsername;
        console.log(assignedStaff, assignedStaffUsername);
        setComplaintDetails((prevComplaint) => ({
          ...prevComplaint,
          assignedStaff,
          assignedStaffUsername,
        }));
      })
      .catch((error) => {
        toast(error.response.data.message);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setComplaintDetails({
      ...complaint,
      image: file,
    });
  };

  const getSubcategoryOptions = () => {
    if (complaint.issueCategory === "water logging") {
      return (
        <>
          <option value="Select Category">Select Category</option>
          <option value="Contaminated Water">Contaminated Water</option>
          <option value="Direct Water Running">Direct Water Running</option>
        </>
      );
    } else if (complaint.issueCategory === "Pothholes") {
      return (
        <>
          <option value="Select Category">Select Category</option>
          <option value="Street Light Not Working">
            Street Light Not Working
          </option>
          <option value="Insufficient Light">Insufficient Light</option>
        </>
      );
    } else {
      // Default options when "Select Category" is chosen
      return <option value="Select Category">Select Category</option>;
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formData = new FormData();
      for (let key in complaint) {
        if (key == "ward") {
          formData.append("wardNo", complaint[key]);
        }
        formData.append(key, complaint[key]);
        console.log(key, complaint[key]);
      }

      axios
        .post("http://localhost:5000/api/services/complaint", formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          toast(error.response.data.message);
        });
    }
  }, [formErrors, isSubmit]);

  return (
    <div>
      <div className="main-container">
        <h1 className="form-header">
          Vadodara Municipal Corporation Complaint Form
        </h1>
        <form encType="multipart/form-data" action="./complaintTracking.jsx">
          <div className="complaint-type">
            <p className="complaint-type1">Complaint type</p>
            <label>
              <input
                type="radio"
                name="complaintType"
                value="Private"
                checked={complaint.complaintType === "Private"}
                onChange={changeHandler}
              />
              Private
            </label>
            <label>
              <input
                type="radio"
                name="complaintType"
                value="Public"
                checked={complaint.complaintType === "Public"}
                onChange={changeHandler}
              />
              Public
            </label>
          </div>
          <div>
            <label>
              <p className="input-label">First Name:</p>
              <input
                className="rutu"
                type="text"
                name="firstname"
                value={complaint.firstname}
                onChange={changeHandler}
                required
              />
            </label>
            <label>
              <p className="input-label">Last Name:</p>
              <input
                className="rutu"
                type="text"
                name="lastname"
                value={complaint.lastname}
                onChange={changeHandler}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <p className="input-label">Mobile Number:</p>
              <input
                className="rutu"
                type="text"
                name="mobileNo"
                value={complaint.mobileNo}
                onChange={changeHandler}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <p className="input-label"> Address:</p>
              <textarea
                name="address"
                value={complaint.address}
                onChange={changeHandler}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <p className="input-label">Ward:</p>
              <select
                name="ward"
                value={complaint.ward} // Default to 'Ward 1' if ward is not set
                onChange={changeHandler}
              >
                <option value="Select">Select</option>
                <option value="1">Ward 1</option>
                <option value="2">Ward 2</option>
                <option value="3">Ward 3</option>
                <option value="4">Ward 4</option>
                <option value="5">Ward 5</option>
                <option value="6">Ward 6</option>
                <option value="7">Ward 7</option>
                <option value="8">Ward 8</option>
                <option value="9">Ward 9</option>
                <option value="10">Ward 10</option>
                <option value="11">Ward 11</option>
                <option value="12">Ward 12</option>
                <option value="13">Ward 13</option>
                <option value="14">Ward 14</option>
                <option value="15">Ward 15</option>
                <option value="16">Ward 16</option>

                <option value="Ward 17">Ward 17</option>
                <option value="Ward 18">Ward 18</option>
                <option value="Ward 19">Ward 19</option>
              </select>
            </label>
            <label>
              <p className="input-label">Area:</p>
              <select
                name="area"
                value={complaint.area}
                onChange={(e) => {
                  changeHandler(e);
                  fetchWardData(e.target.value);
                }}
              >
                <option value="Select">Select</option>
                <option value="7 seas Mall">7 seas Mall</option>
                <option value="AADARSH NAGAR">AADARSH NAGAR</option>
                <option value="Atapi">Atapi</option>
                <option value="Aarav Building">Aarav Building</option>
                {/* Add options for other areas */}
              </select>
            </label>
          </div>
          <div>
            <label>
              <p className="input-label">Category:</p>
              <select
                name="issueCategory"
                value={complaint.issueCategory}
                onChange={changeHandler}
              >
                <option value="Select Category">Select Category</option>
                <option value="water logging">Water Logged</option>
                <option value="Pothholes">Street Light</option>
              </select>
            </label>
            <label>
              <p className="input-label">Subcategory:</p>
              <select
                name="issueSubcategory"
                value={complaint.issueSubcategory}
                onChange={changeHandler}
              >
                {getSubcategoryOptions()}
              </select>
            </label>
          </div>
          <div>
            <label>
              <p className="input-label"> Issue Description:</p>
              <textarea
                name="complaintDescription"
                value={complaint.complaintDescription}
                onChange={changeHandler}
                required
              />
            </label>
          </div>
          <input
            type="hidden"
            name="assignedStaffUsername"
            value={complaint.assignedStaffUsername}
            onChange={changeHandler}
            required
          />
          <div>
            <label>
              <p className="input-label">Assigned Staff:</p>
              <input
                className="rutu"
                type="text"
                name="assignedStaff"
                value={complaint.assignedStaff}
                onChange={changeHandler} // If needed
                disabled
              />
            </label>
          </div>

          <div>
            <label>
              <p className="input-label">Upload Image1:</p>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button onClick={complaintHandler} className="btn" type="submit">
            <Link to="../Complaint/complaintTracking.jsx">Submit</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
