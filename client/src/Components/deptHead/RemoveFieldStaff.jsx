import React, { useState } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const RemoveFieldStaff = () => {
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Login First To Remove A Field Staff");
      } else {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/removeFieldStaff`,
          { values, token },
          {
            withCredentials: true,
          }
        );
      }
    } catch (error) {
      toast(error.response.data.message);
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
      <Spin
        spinning={Loading}
        fullscreen="true"
        tip="Removing Field Staff, Please Wait!"
      />
      ;
      <Form
        form={form}
        name="RemoveFieldStaff"
        onFinish={onFinish}
        onValuesChange={() => {
          setFormErrors({});
        }}
        initialValues={{
          remember: true,
        }}
      >
        <h1 className="text-3xl font-bold mb-4 text-black text-center md:text-left">
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
};
