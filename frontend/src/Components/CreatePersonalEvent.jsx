import React, { useEffect, useState } from "react";
import axios from "axios";
import "./components.css";
import { DatePicker, Input, Form, Button } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const today = dayjs();
const format = "YYYY-MM-DD HH:mm";

function CreatePersonalEvent({ onClose, onEventCreated }) {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    try {
      const { email, title, description, startdate, enddate, location } = values;

      const personalEventData = {
        email, // Include the user's email
        title,
        description,
        startdate,
        enddate,
        location,
      };

      await axios.post('http://localhost:8000/personal-events', personalEventData);
      // Handle success (e.g., close modal, refresh events)
    } catch (error) {
      window.alert("Error creating personal event");
      console.error('Error:', error);
      // Optionally handle specific error messages
    }
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
              message: "Enter the Event Title!",
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
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Enter Location!",
            },
          ]}
        >
          <Input />
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