import { Form, Input, Button, message } from "antd";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import back from "../../../assets/images/back.jpg"; // Import your background image
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/auths/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      const { token, data: user } = response.data;

      if (user.role !== "user") {
        message.error("Only admin accounts are allowed to log in.");
        setSubmitting(false);
        return;
      }

      message.success("Login successful!");
      setAuth({ token, user, isAuthenticated: true });
      localStorage.setItem("authToken", token);

      // Redirect to dashboard after login
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen  " style={{
            backgroundImage: `url(${back})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
      {/* Left Section */}
      <div className="lg:w-1/2 flex flex-col items-start justify-center px-12 text-white text-center lg:text-left">
        <h1 className="text-5xl font-bold mb-4">Welcome back</h1>
        <p className="text-lg">
          Log in to your account to continue exploring amazing products and services.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/3 bg-white rounded-3xl shadow-xl p-8 mx-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-[#E93D82] hover:underline">
            Sign Up
          </Link>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                label="Email"
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Field
                  name="email"
                  as={Input}
                  placeholder="Enter your email"
                  type="email"
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                validateStatus={
                  touched.password && errors.password ? "error" : ""
                }
                help={touched.password && errors.password ? errors.password : ""}
              >
                <Field
                  name="password"
                  as={Input.Password}
                  placeholder="Enter your password"
                  className="w-full"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone className="text-[#E93D82]" />
                    ) : (
                      <EyeInvisibleOutlined className="text-[#E93D82]" />
                    )
                  }
                />
              </Form.Item>
              <div className="flex justify-end text-sm">
                <a
                  href="/forgot-password"
                  className="text-[#E93D82] hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#E93D82] hover:bg-[#be185d] text-white py-2 rounded-lg"
                loading={isSubmitting}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="w-1/4 h-px bg-gray-200" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="w-1/4 h-px bg-gray-200" />
        </div>
        <div className="flex space-x-4 mt-4">
          <Button
            className="flex-1 flex items-center justify-center border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-gray-600 hover:text-white py-2 rounded-lg"
            icon={<GoogleOutlined />}
          >
            Google
          </Button>
          <Button
            className="flex-1 flex items-center justify-center border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-gray-600 hover:text-white py-2 rounded-lg"
            icon={<FacebookOutlined />}
          >
            Facebook
          </Button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          Copyright © 2021-2023{" "}
          <a href="/" className="text-[#E93D82] hover:underline">
            AJI
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
