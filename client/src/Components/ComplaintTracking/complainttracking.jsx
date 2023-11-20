import React, { useState } from "react";
import axios from "axios";
import { Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
// import Progressbar from "../Progressbar/Progress";


export const ComplaintTracking = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState({
    complaintId: "",
  });
  
  const items2 = [
    {
      title: "Complaint Registered",
    },
    {
      title: "Complaint Escalated",
    },
    {
      title: "Progress",
    },
    {
      title: "Completed",
      icon: <SmileOutlined />,
    },
  ];

  const getStatusDescription = (status) => {
    switch (status) {
      case "Complaint Registered":
        return "Complaint Registered.";
      case "Pending":
        return "Your Application Is Pending. We Are Working On It.";
      case "Progress":
        return "Working Under Progress.";
      case "Completed":
        return (
          <p
            className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center"
            style={{ color: "green" }}
          >
            Your Complaint Has Been Solved. Thank You!
          </p>
        );
      case "Disposed":
        return "Your Application Has Been Disposed. If You Have Any Questions, Please Contact Us.";
      case "Escalated":
        return "Your Complain Is Escalated.";
      default:
        return "";
    }
  };

  const items1 = [
    {
      title: "Complaint Registered",
    },
    {
      title: "Pending",
    },
    {
      title: "Progress",
    },
    {
      title: "Disposed",
    },
  ];
const items = [
  {
    title: "Complaint Registered",
  },
  {
    title: "Pending",
  },
  {
    title: "Progress",
  },
  {
    title: "Completed",
    icon: <SmileOutlined />,
  },
];  
const Progressbar = () => (
  <div id='kik'>
    <Steps current={1} labelPlacement="vertical" items={items}/>
  </div>
  
);
  

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTrackingInfo({
      ...trackingInfo,
      [name]: value,
    });
  };

  const submitHandler = () => {
    // Check if complaintId is truthy
    if (!trackingInfo.complaintId) {
      console.error("Complaint ID is required");
      return;
    }
  
    axios
      .post(
        `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/guest/trackComplaintStatus`,
        trackingInfo
      )
      .then((res) => {
        console.log("Response:", res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl mb-8">Complaint Tracking</h1>
      <Form className="relative">
        <div className="mb-4">
          <Form.Item
            htmlFor="complaintId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Complaint ID:
          </Form.Item>
          <Input
            type="text"
            id="complaintId"
            name="complaintId"
            value={trackingInfo.complaintId}
            onChange={changeHandler}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Complaint ID"
          />
        </div>
        <div className="flex justify-center md:h-fit md:col-start-2 md:col-span-1 md:mr-4 flex justify-center md:ml-2">
          <Button
            type="primary"
            onClick={submitHandler}
            className="button_common bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </Button>
        </div>
        <>
              {response && (response.complaintStatus === "Disposed") && (
                <>
                  <Steps
                    current={3}
                    status="error"
                    labelPlacement="vertical"
                    items={items1}
                  />
                  <p
                    className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center"
                    style={{ color: "red" }}
                  >
                    {getStatusDescription(response.complaintStatus)}
                  </p>
                </>
              )}

              {response && response.complaintStatus === "Escalated" && (
                <>
                  <Steps current={1} labelPlacement="vertical" items={items2} />
                  <p className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center">
                    {getStatusDescription(response.complaintStatus)}
                  </p>
                </>
              )}

              {response && (response.complaintStatus !== "Disposed" &&
                response.complaintStatus !== "Escalated" )&& (
                  <>
                    <Steps
                      current={items.findIndex(
                        (item) => item.title === response.complaintStatus
                      )}
                      labelPlacement="vertical"
                      items={items}
                    />
                    <p className="text-gray-600 text-xl font-bold mb-2 mt-5 text-center">
                      {getStatusDescription(response.complaintStatus)}
                    </p>
                  </>
                )}
            </>
      </Form>
    </div>
  );
};
