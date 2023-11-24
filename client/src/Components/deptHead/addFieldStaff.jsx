import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import basestyle from "../Base.module.css";
import loginstyle from "../Login/Login.module.css";
import { useAuth } from "../../AuthProvider";

const { Option } = Select;

const AddFieldStaffForm = ({ setUserState }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { setAuth } = useAuth();
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [categories, setCategories] = useState([]); // State to store categories

  // Function to fetch categories
  useEffect(() => {
    if (categories.length === 0) {
      axios.get(`${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/getCategories`)
        .then(response => {
          const uniqueCategories = Array.from(new Set(response.data.categoriesData.map(category => category.category)));
          setCategories(uniqueCategories.map(category => ({ category })));
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [categories]);
  const changeHandler = (value, changedValues) => {
    setUserDetails({
      ...user,
      ...changedValues,
    });
  };
  const onFinish = (values) => {
    // Handle form submission logic here
    console.log("Received values:", values);
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
        const token = localStorage.getItem("token");
        const response = axios
          .post(
            `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/addfieldstaff`,
            { user, token },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            toast("FieldStaff Added successfully");
            setAuth(true);
            localStorage.setItem("token", res.data.token);
            setUserState(res.data.User);
            navigate("/addFieldStaff", { replace: true });
            console.log("done");
          })
          .catch((err) => {
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
    });
  }, [formErrors]);
  return (
    // <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center w-full  sm:w-auto mb-28 md:max-w-lg w-auto mb-24  mx-auto">
      <div className=" bg-white border-2 border-gray-300 shadow-md rounded-md p-4 mt-20 max-w-md ">
        {/* <div className="p-6 space-y-4 md:space-y-6 sm:p-8"> */}
        <Form
          name="addFieldStaffForm"
          onFinish={onFinish}
          onValuesChange={changeHandler}
          className="mb-0"
          initialValues={{
            remember: true,
          }}
        >
          <h1 className="text-3xl font-bold mb-2 text-black mb-4 md:ml-16 sm:text-2xl ml-9 ">
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

          <Form.Item label="Category" name="category">
      <Select placeholder="Select Category" className="rounded-lg">
        {categories.map(category => (
          <Option key={category.category} value={category.category}>
            {category.category}
          </Option>
        ))}
      </Select>
    </Form.Item>


          <Form.Item
            label="Ward No"
            name="wardNo"
            onSelect={changeHandler}
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
              onClick={loginHandler}
              className="bg-blue-700 w-56 h-16 items-center justify-center ml-10  text-white font-bold rounded-full text-xl  transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    // </div>
    // </section>
  );
};

export default AddFieldStaffForm;
