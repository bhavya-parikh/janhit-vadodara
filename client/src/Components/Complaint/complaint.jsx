import React, { useState, useEffect } from "react";
import "./complaint.css"; // Import your new CSS file
import axios from "axios";
import { toast } from "react-toastify";

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
    issueSubcategory: "Select Category",
    ward: "Select Ward",
    area: "Select Area",
    complaintDescription: "",
    image1: null,
    image2: null,
  });

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
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setComplaintDetails({
      ...complaint,
      image1: file,
    });
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setComplaintDetails({
      ...complaint,
      image2: file,
    });
  };
  const getSubcategoryOptions = () => {
    if (complaint.issueCategory === "Water Logged") {
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
        if (key === "image1" || key === "image2") {
          if (complaint[key] !== null) {
            formData.append(key, complaint[key]);
          }
        } else {
          formData.append(key, complaint[key]);
        }
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
        <form>
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
              <p className="input-label">Category:</p>
              <select
                name="issueCategory"
                value={complaint.issueCategory}
                onChange={changeHandler}
              >
                <option value="Select Category">Select Category</option>
                <option value="Water Logged">Water Logged</option>
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
          <div>
            <label>
              <p className="input-label">Ward:</p>
              <select
                name="ward"
                value={complaint.ward}
                onChange={changeHandler}
              >
                <option value="Select">Select</option>
                <option value="Ward 1">Ward 1</option>
                <option value="Ward 2">Ward 2</option>
                <option value="Ward 3">Ward 3</option>
                <option value="Ward 4">Ward 4</option>
                <option value="Ward 5">Ward 5</option>
                <option value="Ward 6">Ward 6</option>
                <option value="Ward 7">Ward 7</option>
                <option value="Ward 8">Ward 8</option>
                <option value="Ward 9">Ward 9</option>
                <option value="Ward 10">Ward 10</option>
                <option value="Ward 11">Ward 11</option>
                <option value="Ward 12">Ward 12</option>
                <option value="Ward 13">Ward 13</option>
                <option value="Ward 14">Ward 14</option>
                <option value="Ward 15">Ward 15</option>
                <option value="Ward 16">Ward 16</option>

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
                onChange={changeHandler}
              >
                <option value="Select">Select</option>
                <option value="mall">7 seas mall</option>
                <option value="Ajwa">Ajwa</option>
                <option value="Atapi">Atapi</option>
                {/* Add options for other areas */}
              </select>
            </label>
          </div>
          <div>
            <label>
              <p className="input-label">Assigned Staff:</p>
              <input
                type="text"
                name="AssignStaff"
                value={complaint.AssignStaff}
                onChange={changeHandler}
                disabled
              />
            </label>
          </div>

          <div>
            <label>
              <p className="input-label">Upload Image1:</p>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          <div>
            <label>
              <p className="input-label">Upload Image2:</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange1}
              />
            </label>
          </div>
          <button onClick={complaintHandler} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
