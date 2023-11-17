import React from "react";
import { Form, Rate, Input, Button } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design styles
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const Review = () => {
  const onFinish = (values) => {
    // Handle form submission logic here
    console.log("Received values:", values);
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="sm:w-96 mt-2 h-max md:w-fit bg-white border-2 border-gray-300 shadow-md rounded-md p-8">
        <h1 className="sm:text-xl md:text-3xl font-bold mb-6 text-center ">
          Share your valuable thoughts!
        </h1>
        <p className="sm:text-xs md:text-xl text-center">
          We'd really appreciate your thoughts to make things better.
        </p>
        <p className="sm:text-xs md:text-xl text-center mt-3">
          {" "}
          Feel free to share your review with us!
        </p>
        <Form
          name="reviewForm"
          onFinish={onFinish}
          initialValues={{
            responseTime: 0,
            resolutionTime: 0,
            escalationProcess: 0,
            overallSatisfaction: 0,
            description: "",
          }}
        >
          <Form.Item
            name="responseTime"
            label="Response Time"
            className="mt-5"
            rules={[
              {
                required: true,
                message: "Please give a rating for Response Time!",
              },
            ]}
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item
            name="resolutionTime"
            label="Issue Resolution Time"
            rules={[
              {
                required: true,
                message: "Please give a rating for Issue Resolution Time!",
              },
            ]}
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item
            name="escalationProcess"
            label="Effectiveness of Escalation Process"
            rules={[
              {
                required: true,
                message: "Please give a rating for Escalation Process!",
              },
            ]}
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item
            name="overallSatisfaction"
            label="Overall Satisfaction"
            rules={[
              {
                required: true,
                message: "Please give a rating for Overall Satisfaction!",
              },
            ]}
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item
            name="description"
            label="Additional Comments"
            rules={[
              {
                required: true,
                message: "Please describe your review!",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Write your review here..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-700 w-56 h-16 ml-24 text-white font-bold rounded-full text-xl  transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit Review
            </Button>
          </Form.Item>
        </Form>{" "}
      </div>
    </div>
  );
};

export default Review;
