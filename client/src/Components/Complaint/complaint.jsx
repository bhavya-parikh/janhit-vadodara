import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Radio,
  Upload,
  message,
  Typography,
} from "antd";
// import "antd/dist/antd.css";

const { Option } = Select;
const { TextArea } = Input;

const Complaint = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [complaint, setComplaintDetails] = useState({
    complaintType: "",
    firstname: "",
    lastname: "",
    address: "",
    mobileNo: "",
    issueCategory: "Select Category",
    issueSubcategory: "Select SubCategory",
    area: "Select Area",
    wardNo: "Select", // Add a default ward selection
    complaintDescription: "",
    image: null,
    assignedStaffUsername: "",
    assignedStaff: "",
  });

  const validateForm = () => ({});

  const complaintHandler = async () => {
    try {
      await form.validateFields();
      setFormErrors(validateForm(complaint));
      setIsSubmit(true);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const changeHandler = (name, value) => {
    setComplaintDetails({
      ...complaint,
      [name]: value,
    });

    if (name === "area" && value !== "Select") {
      fetchWardData(value);
    }

    if (
      name === "issueCategory" &&
      complaint.wardNo !== "Select" &&
      value !== "Select Category"
    ) {
      fetchAssignStaffData(value, complaint.ward);
    }
  };

  const fetchWardData = (selectedArea) => {
    axios
      .post("http://localhost:5000/api/fetchWardData", { area: selectedArea })
      .then((res) => {
        const wardNo = res.data.wardNo;
        form.setFieldsValue({ ward: wardNo });
        setComplaintDetails((prevComplaint) => ({
          ...prevComplaint,
          wardNo: wardNo,
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

        // Set the assigned staff values in the form
        form.setFieldsValue({
          assignedStaff,
          assignedStaffUsername,
        });
      })
      .catch((error) => {
        toast(error.response.data.message);
      });
  };

  const handleFileChange = (file) => {
    form.setFieldsValue({ image: [file] });
  };

  const getSubcategoryOptions = () => {
    if (complaint.issueCategory === "water logging") {
      return (
        <>
          <Option value="Select Category">Select Category</Option>
          <Option value="Contaminated Water">Contaminated Water</Option>
          <Option value="Direct Water Running">Direct Water Running</Option>
        </>
      );
    } else if (complaint.issueCategory === "Pothholes") {
      return (
        <>
          <Option value="Select Category">Select Category</Option>
          <Option value="Street Light Not Working">
            Street Light Not Working
          </Option>
          <Option value="Insufficient Light">Insufficient Light</Option>
        </>
      );
    } else {
      return <Option value="Select Category">Select Category</Option>;
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formData = new FormData();
      for (let key in complaint) {
        if (key == "wardNo") {
          formData.append("wardNo", complaint[key]);
        }
        formData.append(key, complaint[key]);
      }

      axios
        .post("http://localhost:5000/api/services/complaint", formData)
        .then((res) => {
          console.log(res.data);
          navigate(
            `/complainttracking/${res.data.complaintId}/${complaint.issueDescription}`
          );
        })
        .catch((error) => {
          toast(error.response.data.message);
        });
    }
  }, [formErrors, isSubmit]);

  return (
    <div className="w-400 mx-auto p-6 bg-white rounded-lg shadow-md">
      <hr className="border-black" />
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 ">
        Vadodara Municipal Corporation Complaint Form
      </h1>
      <Form
        form={form}
        className="grid grid-cols-4 w-auto gap-6"
        encType="multipart/form-data"
        action="./complaintTracking.jsx"
      >
        <div className="col-span-2">
          <Form.Item
            label="Complaint Type"
            name="complaintType"
            rules={[
              { required: true, message: "Please select a complaint type" },
            ]}
          >
            <Radio.Group
              onChange={(e) => changeHandler("complaintType", e.target.value)}
            >
              <Radio value="Private">Private</Radio>
              <Radio value="Public">Public</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <br />
        <div className="col-span-2">
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input
              onChange={(e) => changeHandler("firstname", e.target.value)}
            />
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            label="Mobile Number"
            name="mobileNo"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <TextArea />
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item label="Ward" name="ward" rules={[{ required: true }]}>
            <Select onChange={(value) => changeHandler("ward", value)}>
              <Option value="Select">Select</Option>
              <Option value="1">Ward 1</Option>
              <Option value="2">Ward 2</Option>
              <Option value="3">Ward 3</Option>
              <Option value="4">Ward 4</Option>
              <Option value="5">Ward 5</Option>
              <Option value="6">Ward 6</Option>
              <Option value="7">Ward 7</Option>
              <Option value="8">Ward 8</Option>
              <Option value="9">Ward 9</Option>
              <Option value="10">Ward 10</Option>
              <Option value="11">Ward 11</Option>
              <Option value="12">Ward 12</Option>
              <Option value="13">Ward 13</Option>
              <Option value="14">Ward 14</Option>
              <Option value="15">Ward 15</Option>
              <Option value="16">Ward 16</Option>
              <Option value="Ward 17">Ward 17</Option>
              <Option value="Ward 18">Ward 18</Option>
              <Option value="Ward 19">Ward 19</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            onChange={(value) => changeHandler("area", value)}
            label="Area"
            name="area"
            rules={[{ required: true }]}
          >
            <Select onChange={(value) => fetchWardData(value)}>
              <Option value="Select">Select</Option>
              <Option value="7 seas Mall">7 seas Mall</Option>
              <Option value="AADARSH NAGAR">AADARSH NAGAR</Option>
              <Option value="Atapi">Atapi</Option>
              <Option value="Aarav Building">Aarav Building</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            label="Category"
            name="issueCategory"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              onChange={(value) => {
                changeHandler("issueCategory", value);
                fetchAssignStaffData(value, form.getFieldValue("ward"));
              }}
            >
              <Option value="water logging">Water Logged</Option>
              <Option value="Pothholes">Street Light</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            label="Subcategory"
            name="issueSubcategory"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select
              onChange={(value) => changeHandler("issueSubcategory", value)}
            >
              {getSubcategoryOptions()}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            label="Issue Description"
            name="complaintDescription"
            rules={[
              { required: true, message: "Please provide a description" },
            ]}
          >
            <TextArea
              onChange={(e) =>
                changeHandler("complaintDescription", e.target.value)
              }
            />
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item label="Assigned Staff" name="assignedStaff">
            <Input disabled />
          </Form.Item>
        </div>

        <div className="col-span-2">
          <Form.Item
            label="Upload Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={handleFileChange}
          >
            <Upload beforeUpload={() => false}>
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <hr />
        <div className="col-span-2 justify-end ml-96">
          <Form.Item>
            <Button
              className="bg-blue-700 w-56 h-16  text-white font-bold rounded-full text-xl  transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={complaintHandler}
            >
              <Link to="/complaintTracking">Submit</Link>
            </Button>
          </Form.Item>
        </div>
        <div className="col-span-2">
          <Form.Item>
            <Button
              className="bg-blue-700 w-56 h-16  text-white font-bold rounded-full text-xl  transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={() => form.resetFields()}
            >
              Reset
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Complaint;
