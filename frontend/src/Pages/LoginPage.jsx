import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "./pagestyle/LoginPage.css";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

function LoginPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();

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
  const onFinish = (e) => {
    console.log(e);
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
          <h1 className="login-heading">Log in</h1>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
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
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
