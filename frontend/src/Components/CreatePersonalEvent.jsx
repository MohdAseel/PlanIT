import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./components.css";
import { DatePicker, Input, Form, Button } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const today = dayjs();
const format = "YYYY-MM-DD HH:mm";

function CreatePersonalEvent({ onClose }) {
  const { account } = useContext(DataContext);

  const onFinish = async (values) => {
    values.bothtime = values.bothtime.map((time) => time.toISOString());
    values.startdate = values.bothtime[0];
    values.enddate = values.bothtime[1];
    delete values.bothtime;

    values.email = account.email;

    await axios
      .post("http://localhost:8000/personalevents", values)
      .then((response) => {
        onClose();
        window.alert("Personal Event Created");
      })
      .catch((error) => {
        console.error(error);
        window.alert("Error creating personal event");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
    window.alert("Failed to create personal event");
  };

  return (
    <div className="create-event-container">
      <h2>Create Personal Event</h2>

      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Event Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Enter the Title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="RangePicker"
          name="bothtime"
          rules={[
            {
              required: true,
              message: "Enter the Event Date and Time!",
            },
          ]}
        >
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            minDate={dayjs(today, { format })}
            format={format}
            label="Event Date and Time"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Enter Description!",
            },
          ]}
        >
          <TextArea required rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePersonalEvent;
