import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox, Span } from "antd";
import { useNavigate } from "react-router-dom";

export const ComplaintTracking = () => {
  const navigate = useNavigate();
  const [trackingInfo, setTrackingInfo] = useState({
    complaintId: "",
    username: "",
  });
  const [response, setResponse] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTrackingInfo({
      ...trackingInfo,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Use Axios to make a POST request
    axios
      .post("#", trackingInfo)
      .then((res) => {
        // Handle the response, you can set it in state for display
        setResponse(res.data);
      })
      .catch((err) => {
        // Handle errors, you can set it in state for display
        console.error(err);
      });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl mb-8">Complaint Tracking</h1>
      <Form onSubmit={submitHandler} className="relative">
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
        <div className=" flex justify-center  md:h-fit md:col-start-2 md:col-span-1 md:mr-4 flex justify-center  md:ml-2">
          <Button
            type="submit"
            className="button_common bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              navigate("/progress");
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
      {response && (
        <div className="mt-4 text-gray-700">
          <p>Response: {response}</p>
        </div>
      )}
    </div>
  );
};
