import React from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const AddFieldStaffForm = () => {
  const onFinish = (values) => {
    // Handle form submission logic here
    console.log("Received values:", values);
  };

  return (
    <div className="login bg-white border-2 border-gray-300 shadow-md rounded-md p-4 mt-20 max-w-md mx-auto">
      <Form
        name="addFieldStaffForm"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <h1 className="text-3xl font-bold mb-4 ml-24 text-black mb-4">
          Add FieldStaff
        </h1>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
          <Input
            placeholder="Name"
            className="rounded-lg border border-gray-300 p-2 mb-2"
          />
        </Form.Item>

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

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            className="rounded-lg border border-gray-300 p-2 mb-2"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select a category!",
            },
          ]}
        >
          <Select placeholder="Select Category" className="rounded-lg">
            <Option value="category1">Category 1</Option>
            <Option value="category2">Category 2</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ward No"
          name="wardNo"
          rules={[
            {
              required: true,
              message: "Please select the ward number!",
            },
          ]}
        >
          <Select placeholder="Select Ward">
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-700 w-56 h-16 ml-24 text-white font-bold rounded-full text-xl  transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddFieldStaffForm;
