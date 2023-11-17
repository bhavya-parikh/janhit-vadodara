import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox, Span } from "antd";

export const ComplaintTracking = () => {
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
        <div className="justify-center">
          <p className="absolute bg-white px-2 text-gray-500 justify-center">
            or
          </p>
          <hr className="border-gray-400 absolute w-full h-0.5" />
        </div>
        <div className="relative mt-10">
          <Form.Item
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
          >
            Username:
          </Form.Item>
          <Input
            type="text"
            id="username"
            name="username"
            value={trackingInfo.username}
            onChange={changeHandler}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Username"
          />
        </div>
        <Button
          type="submit"
          className="button_common bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </Button>
      </Form>
      {response && (
        <div className="mt-4 text-gray-700">
          <p>Response: {response}</p>
        </div>
      )}
    </div>
  );
};
