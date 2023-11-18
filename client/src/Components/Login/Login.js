import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import vmc from "../Assets/Vmc.jpg"; // Update the path to your image
import basestyle from "../Base.module.css";
import { useAuth } from "../../AuthProvider";
import loginstyle from "../Login/Login.module.css";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({ username: "", password: "" });
  const { setAuth } = useAuth();
  const changeHandler = (changedValues, allValues) => {
    setUserDetails({
      ...user,
      ...changedValues,
    });
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

      if (Object.keys(errors).length === 0) {
        const response = axios
          .post(`${process.env.REACT_APP_BASEURL}/api/user/login`, user, {
            withCredentials: true,
          })
          .then((res) => {
            toast("Logged in success");
            setAuth(true);
            localStorage.setItem("token", res.data.token);
            setUserState(res.data.user);
            navigate("/", { replace: true });
          })
          .catch((err) => {
            toast.error(err.response.data.message);
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
    });
  }, [formErrors]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center w-full  sm:w-auto ml-0  md:w-auto mb-24 mt-10 mx-auto h-fit ">
          <div className="bg-white border-2 border-gray-300 shadow-md rounded p-4 text-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Form
                form={form}
                name="loginForm"
                onFinish={onFinish}
                onValuesChange={changeHandler}
                className="space-y-4 md:space-y-6"
              >
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
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={loginHandler}
                    className={basestyle.button_common}
                  >
                    Sign in
                  </Button>
                </Form.Item>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <NavLink
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </NavLink>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
