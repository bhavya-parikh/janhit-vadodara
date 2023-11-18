import React, { useState, useEffect } from "react";
import { Space, Table, message, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const { Option } = Select;

const defaultExpandable = {
  expandedRowRender: (recording) => (
    <p>Issue Description: {recording.complaintDescription}</p>
  ),
};

const defaultTitle = () => "Complaints";

const Dashboard = () => {
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [selectedFileNames, setSelectedFileNames] = useState({});
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
      dataIndex: "images",
      render: (text, record) => (
        <img
          src={`${process.env.REACT_APP_BASEURL}/${record.images[0]}`}
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
          <Select
            placeholder={record.complaintStatus}
            value={selectedStatuses[record._id]}
            onChange={(value) =>
              setSelectedStatuses((prev) => ({
                ...prev,
                [record._id]: value,
              }))
            }
          >
            <Option value="Pending">Pending</Option>
            <Option value="Progress">Progress</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Disposed">Disposed</Option>
          </Select>
          {selectedStatuses[record._id] === "Completed" && (
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                setSelectedFiles((prev) => ({
                  ...prev,
                  [record._id]: file,
                }));
                setSelectedFileNames((prev) => ({
                  ...prev,
                  [record._id]: file.name,
                }));
                return false;
              }}
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {selectedFileNames[record._id] || "Select File"}
              </Button>
            </Upload>
          )}
          <Button onClick={() => handleStatusUpdate(record)}>
            Update Status
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusUpdate = (record) => {
    setLoading(true);
    if (record._id && selectedStatuses[record._id]) {
      if (
        selectedStatuses[record._id] === "Completed" &&
        selectedFiles[record._id]
      ) {
        const formData = new FormData();
        formData.append("complaintId", record._id);
        formData.append("image", selectedFiles[record._id]);
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/api/services/complaint/addimage`,
            formData
          )
          .then((response) => {
            console.log("Image Uploaded Successfully!");
            message.success("Image Uploaded Successfully!");
            // Now update the status
            updateComplaintStatus(record._id, selectedStatuses[record._id]);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            message.error("Error uploading image, Try Again!");
            setLoading(false);
          });
      } else {
        // If status is not "Completed", update the status directly
        updateComplaintStatus(record._id, selectedStatuses[record._id]);
      }
    } else {
      message.warning("Please select a status before updating.");
    }
  };

  const updateComplaintStatus = (complaintId, newStatus) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/api/updateComplaintStatus`, {
        complaintId,
        newStatus,
      })
      .then((response) => {
        console.log("Status Updated Successfully!");
        message.success("Status Updated Successfully!");
        setLoading(false);
      })
      .catch((err) => {
        message.error("Upload Image First!");
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/fetchComplaintsAdmin`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setComplaints(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast(error.response.data.message);
        setLoading(false);
      });
  }, []);

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
        dataSource={complaints}
        scroll={scroll}
      />
    </>
  );
};

export default Dashboard;
