import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import basestyle from "../Base.module.css";
import loginstyle from "../Login/Login.module.css";
import { useAuth } from "../../AuthProvider";
const { Option } = Select;

const AdminLogin = ({ setUserState }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { setAuth } = useAuth();
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
    role: "",
  });
  const changeHandler = (value, changedValues) => {
    setUserDetails((prevUser) => ({
      ...prevUser,
      ...changedValues,
    }));
  };
  
  const onFinish = async () => {
    // Handle the form submission logic here if needed
  };
  const validateForm = (values) => {
    const error = {};

    if (!values.username) {
      error.username = "Username is required";
    }

    if (!values.password) {
      error.password = "Password is required";
    }

    return error;
  };

  const loginHandler = async () => {
    try {
      const errors = validateForm(user);
      setFormErrors(errors);
      setIsSubmit(true);
      setLoading(true);
      if (Object.keys(errors).length === 0) {
        const response = axios
          .post(`${process.env.BASEURL}/api/admin/login`, user, {
            withCredentials: true,
          })
          .then((res) => {
            setLoading(false);
            toast("Logged in success");
            setAuth(true);
            localStorage.setItem("token", res.data.token);
            setUserState(res.data.User);
            navigate("/", { replace: true });
          })
          .catch((err) => {
            setLoading(false);

            // toast.error(err.response.data.message);
            console.log(err.message);
          });
      }
    } catch {
      // toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      username: "",
      password: "",
      role: "",
    });
  }, [formErrors]);

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center w-full  sm:w-auto ml-0  md:w-auto mb-24 mt-10 mx-auto h-fit ">
          <div className="bg-white border-2 border-gray-300 shadow-md rounded p-4 text-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Spin spinning={loading} tip="Logging You In.... Please Wait." />;
              <Form
                form={form}
                name="loginForm"
                onFinish={onFinish}
                onValuesChange={changeHandler}
              >
                <h1 className="text-xl font-bold mb-4  leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login As Admin
                </h1>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Username is required" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    className="rounded-lg"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="••••••••"
                    className="rounded-lg"
                  />
                </Form.Item>
                <Form.Item
  name="role"
  label="Select Admin Type"
  rules={[{ required: true, message: "User type is required" }]}
>
  <Select
    className="w-96"
    placeholder="Please Select Admin Type"
    onChange={(value) => form.setFieldsValue({ role: value })}
  >
    <Option value="headDepartment">Head Department</Option>
    <Option value="fieldStaff">Field Staff</Option>
    <Option value="commissioner">Commissioner</Option>
  </Select>
</Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={loginHandler}
                  className={basestyle.button_common}
                >
                  Login
                </Button>
              </Form>
            </div>{" "}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
