import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Spin,
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
    assignedStaffUsername: "",
    assignedStaff: "",
  });
  const [loading, setLoading] = useState(false);
  const [ward, setWard] = useState(null);
  const [assignedStaff, setassignedStaff] = useState(null); // Add state to store the staff name
  const [assignedStaffUsername, setAssignedStaffUsername] = useState(null); // Add state to store the staff name
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const validateForm = (values) => {
    // You can add your form validation logic here.
    // For now, let's return an empty object.
    return {};
  };

  useEffect(() => {
    if (isSubmit) {
      handleUpload();
    }
  }, [isSubmit]);

  const complaintHandler = (e) => {
    try {
      e.preventDefault();
      setFormErrors(validateForm(complaint));
      setLoading(true);
      setIsSubmit(true);
    } catch (errorInfo) {
      setLoading(false);

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
      fetchAssignStaffData(value, complaint.wardNo);
    }

    if (
      name === "wardNo" &&
      complaint.issueCategory !== "Select Category" &&
      value !== "Select"
    ) {
      fetchAssignStaffData(complaint.issueCategory, value);
    }
  };

  const fetchWardData = (selectedArea) => {
    axios
      .post("http://localhost:5000/api/fetchWardData", { area: selectedArea })
      .then((res) => {
        const wardNo = res.data.wardNo;
        form.setFieldsValue({ wardNo: wardNo });
        setComplaintDetails((prevComplaint) => ({
          ...prevComplaint,
          area: selectedArea,
          wardNo: wardNo,
        }));
      })
      .catch((error) => {
        setLoading(false);
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
        setassignedStaff(assignedStaff);
        setAssignedStaffUsername(assignedStaffUsername);
        // Set the assigned staff values in the form
        form.setFieldsValue({
          assignedStaff,
          assignedStaffUsername,
        });
        setComplaintDetails((prevComplaint) => ({
          ...prevComplaint,
          assignedStaff,
          assignedStaffUsername,
        }));
      })
      .catch((error) => {
        setLoading(false);

        toast(error.response.data.message);
      });
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

  const handleUpload = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formData = new FormData();
      for (let key in complaint) {
        formData.append(key, complaint[key]);
      }

      fileList.forEach((file) => {
        formData.append("images", file);
      });
      setUploading(true);
      axios
        .post("http://localhost:5000/api/services/complaint", formData, {
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setFileList([]);
          message.success("Complaint Submitted Successfully");
          navigate(
            `/complainttracking/${res.data.complaintId}/${complaint.issueDescription}`
          );
        })
        .catch((error) => {
          toast(error.response.data.message);
          setLoading(false);
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div className="w-400 mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* <hr className="border-black" /> */}
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center text-blue-800 ">
        Vadodara Municipal Corporation Complaint Form
      </h1>
      <Spin spinning={loading} tip="Submitting Your Complaint, Please Wait!">
        <Form
          form={form}
          className="grid grid-cols-4 w-auto gap-7"
          encType="multipart/form-data"
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
              <Input
                onChange={(e) => changeHandler("lastname", e.target.value)}
              />
            </Form.Item>
          </div>

          <div className="col-span-2">
            <Form.Item
              label="Mobile Number"
              name="mobileNo"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => changeHandler("mobileNo", e.target.value)}
              />
            </Form.Item>
          </div>

          <div className="col-span-2">
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <TextArea
                onChange={(e) => changeHandler("address", e.target.value)}
              />
            </Form.Item>
          </div>

          <div className="col-span-2">
            <Form.Item label="Ward" name="wardNo" rules={[{ required: true }]}>
              <Select onChange={(value) => changeHandler("wardNo", value)}>
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
                <Option value="17">Ward 17</Option>
                <Option value="18">Ward 18</Option>
                <Option value="19">Ward 19</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="col-span-2">
            <Form.Item
              onChange={(value) => changeHandler("area", value)}
              label="Area"
              name="area"
              value={complaint.area}
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
              value={complaint.issueCategory}
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                onChange={(value) => {
                  changeHandler("issueCategory", value);
                  // fetchAssignStaffData(value, form.getFieldValue("wardNo"));
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
              value={complaint.issueSubcategory}
              rules={[
                { required: true, message: "Please select a subcategory" },
              ]}
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
              value={complaint.complaintDescription}
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
              <Input
                disabled
                value={complaint.assignedStaff}
                onChange={(e) => changeHandler("assignedStaff", e.target.value)}
              />
            </Form.Item>
          </div>
          <input
            type="hidden"
            name="assignedStaffUsername"
            value={complaint.assignedStaffUsername}
            onChange={changeHandler}
            required
          />
          <div className="col-span-2">
            <Form.Item
              label="Upload Image"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={getFile}
            >
              <Upload {...props} maxCount={2}>
                <Button
                  type="primary"
                  loading={uploading}
                  className="text-black"
                >
                  Select Image (Max 2 images)
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <br />
          <div className="col-span-2 flex justify-center h-96 md:h-fit md:col-start-2 md:col-span-1 md:mr-4 flex justify-center md:justify-end md:ml-2">
            <Form.Item>
              <Button
                type="primary"
                className="bg-blue-700 mr-10 md:w-56 w-full h-16 text-white font-bold rounded-full text-xl transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                onClick={complaintHandler}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
          <div className="col-span-2">
            <Form.Item>
              <Button
                type="primary"
                className="bg-blue-700 mr-10 w-24 md:w-56 w-full h-16 text-white font-bold rounded-full text-xl transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                onClick={() => form.resetFields()}
              >
                Reset
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default Complaint;
