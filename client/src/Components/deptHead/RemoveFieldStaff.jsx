import React from "react";
import { Form, Input, Button, Select } from "antd";

export const RemoveFieldStaff = () => {
  return (
    <div className=" bg-white border-2 border-gray-300 shadow-md rounded-md p-4 mt-24 max-w-md mx-auto">
      <Form
        name="RemoveFieldStaff"
        initialValues={{
          remember: true,
        }}
      >
        <h1 className="text-3xl font-bold mb-4 ml-20 text-black mb-4">
          Remove FieldStaff
        </h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your username!",
            },
          ]}
        >
          <Input
            placeholder="Username"
            className="rounded-lg border border-gray-300 p-2 mb-2"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-700 w-56 h-12 ml-24 text-white font-bold rounded-full text-xl  transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
