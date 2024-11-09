import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "./pagestyle/LoginPage.css";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { API } from "../service/api";
import { DataContext } from "../context/DataProvider";

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

function LoginPage({ isUserAuthenticated }) {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [account, toggleAccount] = useState("login");
  const [error, showError] = useState("");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);
  useEffect(() => {
    showError(false);
  }, [login]);

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        classname: response.data.classname,
      });

      isUserAuthenticated(true);
      setLogin(loginInitialValues);

      navigate("/weekview");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:3000", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     navigate("/weekview");
  //   } else {
  //     alert("Invalid credentials.");
  //   }
  // };
  const onFinishLogin = (e) => {
    setLogin(e);
    console.log(e);
    loginUser();
  };
  const onFinishSignUp = (value) => {
    setSignup(value);
    console.log(value);
    signupUser();
  };

  return (
    <div className="login-page">
      <div className="header-container">
        <div className="page-header">
          <h1 className="main-heading">PLANIT</h1>
          <p className="tagline">
            From Deadlines to Socials, We’ve Got <br />
            You Covered
          </p>
        </div>
      </div>
      <div className="login-container">
        <div className="login-box">
          {account === "login" ? (
            <>
              <h1 className="login-heading">Log in</h1>
              <Form
                name="normal_login"
                onFinish={onFinishLogin}
                layout="vertical"
                requiredMark="optional"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="rollno@smail.iitm.ac.in"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: "0px" }}>
                  <Button
                    block="true"
                    type="primary"
                    color="#151750"
                    htmlType="submit"
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>
              <Button block="true" type="dafault" onClick={toggleSignup}>
                Create an Account
              </Button>
            </>
          ) : (
            <>
              <h1 className="login-heading">Sign Up</h1>
              <Form
                name="normal_login"
                initialValues={{}}
                onFinish={onFinishSignUp}
                layout="vertical"
                requiredMark="optional"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="rolln@smail.iitm.ac.in"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: "0px" }}>
                  <Button
                    block="true"
                    type="primary"
                    color="#151750"
                    htmlType="submit"
                  >
                    Sign UP
                  </Button>
                </Form.Item>
              </Form>
              <Button block="true" type="dafault" onClick={toggleSignup}>
                Already have an Account
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
