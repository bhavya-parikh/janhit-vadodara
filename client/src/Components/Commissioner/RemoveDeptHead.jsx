import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function RemoveDeptHead() {
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/removeFieldStaff`,
        values,
        {
          withCredentials: true,
        }
      );
      console.log("DeptHead removed successfully:", response.data);
      toast("DeptHead Removed successfully");
    } catch (error) {
      console.error("Error removing DeptHead:", error.message);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    return errors;
  };

  return (
    <div className="bg-white border-2 border-gray-300 shadow-md rounded-md p-4 mt-4 md:mt-24 max-w-md mx-auto">
      <Form
        form={form}
        name="RemoveDeptHead"
        onFinish={onFinish}
        onValuesChange={() => {
          setFormErrors({});
        }}
        initialValues={{
          remember: true,
        }}
      >
        <h1 className="text-3xl font-bold mb-4 text-black text-center md:text-left">
          Remove DepartMent Head
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
            className="rounded-lg border border-gray-300 p-2 mb-2 w-full"
          />
        </Form.Item>
        <div className=" flex justify-center  md:h-fit md:col-start-2 md:col-span-1 md:mr-4 flex justify-center md:justify-end md:ml-2">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-700 mr-16 w-76 h-12 text-white font-bold rounded-full text-xl  transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
