import React from "react";
import "./components.css";
import { DatePicker, Input, Form, Upload, Button } from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const today = dayjs();
const format = "YYYY-MM-DD HH:mm";

function CreateEvent({ onClose }) {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (e) => {
    console.log(e);
    window.alert("Event Created");
    onClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="create-event-container">
      <h2>Create Event</h2>

      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 22,
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
          name="Event Title"
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
          name="event timedate"
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
          name="Location"
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
          name="Description"
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
