import React, { useState, useEffect } from "react";
import { Space, Table, message, Select, Upload, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const defaultExpandable = {
  expandedRowRender: (recording) => (
    <p>Issue Description: {recording.complaintDescription}</p>
  ),
};
const defaultTitle = () => "Complaints";
const defaultFooter = () => "Here is footer";

const Dashboard = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "firstname",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNo",
    },
    {
      title: "Area",
      dataIndex: "area",
    },
    {
      title: "Issue Subcategory",
      dataIndex: "issueSubcategory",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (text, record) => (
        <img
          src={`http://localhost:5000/${record.imageUrl[0]}`}
          style={{
            maxHeight: "250px", // Adjust the height as needed
          }}
          alt=""
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UploadImageButton complaintId={record._id} />
          <Select
            placeholder="Pending"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Progress">Progress</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Disposed">Disposed</Option>
          </Select>
          <a onClick={() => handleStatusUpdate(record)}>Update Status</a>
        </Space>
      ),
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("large");
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();
  const [complaints, setComplaints] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleStatusUpdate = (record) => {
    if (record._id && selectedStatus) {
      axios
        .post("http://localhost:5000/api/updateComplaintStatus", {
          complaintId: record._id, // Assuming _id is the correct field for complaintId
          newStatus: selectedStatus,
        })
        .then((response) => {
          console.log("success");
          message.success("Status Updated Successfully!");
        })
        .catch((err) => {
          if (selectedStatus === "Completed") {
            message.error("Upload Image First!");
          } else {
            message.error("Something Went Wrong, Try again later.");
          }
        });
    } else {
      message.warning("Please select a status before updating.");
    }
  };

  const handleImageUpload = (complaintId) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("complaintId", complaintId);
      formData.append("image", selectedFile);

      axios
        .post("http://localhost:5000/api/services/complaint/addimage", formData)
        .then((response) => {
          message.success("Image Uploaded Successfully!");
          setPopupVisibility(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          message.error("Error uploading image, Try Again!");
        });
    } else {
      message.warning("Please select an image to upload.");
    }
  };

  const UploadImageButton = ({ complaintId }) => (
    <>
      <Button
        type="primary"
        className="text-black"
        onClick={() => setPopupVisibility(true)}
      >
        Upload Image
      </Button>
      <Modal
        className="text-black"
        title="Upload Image"
        open={popupVisibility}
        onOk={() => {
          setPopupVisibility(false);
          handleImageUpload(complaintId);
        }}
        onCancel={() => {
          setPopupVisibility(false);
        }}
        okButtonProps={{ className: "text-black" }}
      >
        <Upload
          beforeUpload={(file) => {
            setSelectedFile(file);
            setSelectedFileName(file.name);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <p>
          Selected File:
          {selectedFileName ? selectedFileName : "  File Not Selected Yet"}
        </p>
      </Modal>
    </>
  );

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  useEffect(() => {
    // Make an HTTP request to fetch data from the server
    axios
      .post("http://localhost:5000/api/fetchComplaints", {
        assignedStaffUsername: "BhavyaP",
      }) // Replace with your API endpoint
      .then((response) => {
        console.log(response);
        setComplaints(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    scroll,
    tableLayout,
  };
  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={complaints ? complaints : []}
        scroll={scroll}
      />
    </>
  );
};

export default Dashboard;
