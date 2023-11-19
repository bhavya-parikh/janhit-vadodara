import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {Spin,Form,Input,Button,Select, Radio,Upload,message,Typography,AutoComplete} from "antd";

const { Option } = Select;
const { TextArea } = Input;

const Complaint = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [wardDatas, setWardDatas] = useState([]);
  const [wardAreas, setWardAreas] = useState([]);
const[responseData,setResponseData] = useState([]);
  const [complaint, setComplaintDetails] = useState({
    complaintType: "",
    firstname: "",
    lastname: "",
    address: "",
    mobileNo: "",
    issueCategory: "Select Category",
    issueSubcategory: "Select SubCategory",
    area: "Select Area",
    wardNo: "Select",
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
    return {};
  };
  useEffect(() => {
    // Function to fetch ward areas when the component mounts
    const fetchWardAreas = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/fetchAllWardAreas`
        )
          const responseData = response.data.wardDatas;
          const wardNos = responseData.map(item => item.wardNo);
          const wardAreas = responseData.map(item => item.area);
          const uniqueWardNos = [...new Set(wardNos)];
          const uniqueWardAreas = [...new Set(wardAreas)];
          const sortedWardNos = uniqueWardNos.sort((a, b) => a - b);
          // const sortedWardAreas = uniqueWardNos.sort((a, b) => a - b);
          setResponseData(responseData);
          setWardDatas(sortedWardNos);
          setWardAreas(uniqueWardAreas);

      } catch (error) {
        // Handle errors
        console.error("Error fetching ward areas:", error);
        toast.error("Error fetching ward areas");
      }
    };
    

    fetchWardAreas();
  }, []); 

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
    // Fetch ward number based on the selected area
    const filteredWardData = responseData.find(
      (wardData) => wardData.area === selectedArea
    );

    if (filteredWardData) {
      // If a matching ward is found, set the ward number in the form
      setComplaintDetails((prevComplaint) => ({
        ...prevComplaint,
        wardNo: filteredWardData.wardNo,
      }));

      // Set the ward number in the form
      form.setFieldsValue({
        wardNo: filteredWardData.wardNo,
      });
    }
  };
  
  const fetchAssignStaffData = (selectedCategory, selectedWard) => {
    axios
      .post(`${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/fetchFieldStaff`, {
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
      const token = localStorage.getItem("token");
      formData.append("token", token);
      for (let key in complaint) {
        formData.append(key, complaint[key]);
      }

      fileList.forEach((file) => {
        formData.append("images", file);
      });
      setUploading(true);
      axios
        .post(
          `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/services/complaint`,
          formData,
          {
            withCredentials: true,
          }
        )
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
      <Spin
        spinning={loading}
        fullscreen="true"
        tip="Submitting Your Complaint, Please Wait!"
      />
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
            <Form.Item
              label="Ward"
              name="wardNo"
              rules={[{ required: true }]}
            >
              <Select onChange={(value) => changeHandler("wardNo", value)}>
                <Option value="Select">Select</Option>
                {wardDatas.map((wardData) => (
                  <Option key={wardData} value={wardData}>
                    Ward {wardData}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <div className="col-span-2">
            <Form.Item
              label="Area"
              name="area"
              value={complaint.area}
              rules={[{ required: true }]}
            >
              <Select
                onChange={(value) => {
                  changeHandler("area", value);
                  fetchWardData(value); // Call fetchWardData when "area" changes
                }}
              >
                {complaint.wardNo === "Select" ? (
                  wardAreas.map((wardArea) => (
                    <Option key={wardArea} value={wardArea}>
                      {wardArea}
                    </Option>
                  ))
                ) : (
                  responseData
                    .filter(
                      (wardData) => wardData.wardNo === complaint.wardNo
                    )
                    .map((filteredWardData) => {
                      console.log("Filtered Data:", filteredWardData);
                      return (
                        <Option
                          key={filteredWardData.area}
                          value={filteredWardData.area}
                        >
                          {filteredWardData.area}
                        </Option>
                      );
                    })
                )}
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
              <Button type="primary" loading={uploading} className="text-black">
                Select Image (Max 2 images)
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <br />
        <div className="col-span-2 flex justify-center h-96 md:h-fit md:col-start-2 md:col-span-1 md:mr-4 flex justify-center md:justify-end md:ml-2">
          <Form.Item>
            <Button
              className="bg-blue-700 w-fit md:w-56 w-fit h-16 text-white font-bold rounded-full text-xl transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={complaintHandler}
            >
              Submit
            </Button>
          </Form.Item>
        </div>
        <div className="col-span-2">
          <Form.Item>
            <Button
              className="bg-blue-700 w-fit md:w-56 w-fit h-16 text-white font-bold rounded-full text-xl transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
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
