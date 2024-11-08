import React, { useEffect, useState } from "react";
import axios from "axios";
import "./components.css";
import { DatePicker, Input, Form, Upload, Button } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const today = dayjs();
const format = "YYYY-MM-DD HH:mm";

function CreateEvent({ onClose }) {
  const { clubId } = useParams();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    values.bothtime = values.bothtime.map((time) => time.toISOString());
    values.startdate = values.bothtime[0];
    values.enddate = values.bothtime[1];
    delete values.bothtime;

    // "id": "67890",
    // "title": "Sample Event",
    // "startdate": "2023-11-01T10:00:00Z",
    // "enddate": "2023-11-01T12:00:00Z",
    // "location": "123 Event Street, Event City",
    // "description": "This is a sample event for testing purposes.",
    // "image": "http://example.com/sample-event.jpg"

    console.log(values);
    axios
      .post(`http://localhost:8000/${clubId}`, values)
      .then((response) => {
        console.log(response);
        window.alert("Event Created");
        onClose();
      })
      .catch((error) => {
        console.error(error);
        window.alert("Error creating event");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };
  return (
    <div className="create-event-container">
      <h2>Create Event</h2>

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

  //       <Form.Item
  //         label="Upload"
  //         valuePropName="fileList"
  //         getValueFromEvent={normFile}
  //       >
  //         <Upload action="/upload.do" listType="picture-card">
  //           <button style={{ border: 0, background: "none" }} type="button">
  //             <PlusOutlined />
  //             <div style={{ marginTop: 8 }}>Upload</div>
  //           </button>
  //         </Upload>
  //       </Form.Item> */}

  //       <Form.Item label="TextArea">
  //         <TextArea required rows={4} />
  //       </Form.Item>
  //       <Form.Item wrapperCol={{ offset: 5 }}>
  //         <Button htmlType="submit" className="Button">
  //           Create
  //         </Button>
  //       </Form.Item>
  //     </Form>
  //   </div>
  // );
}

export default CreateEvent;
