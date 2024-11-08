import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/acadstyle.css";
import "./pagestyle/pagestyle.css";
import { DatePicker, Input, Form, Radio, Button } from "antd";
import dayjs from "dayjs";
import Overlay from "../Components/Overlay";
import { DataContext } from "../context/DataProvider";

//<--Academics page
function Acads() {
  const { account } = useContext(DataContext);
  const [academicEvents, setAcademicEvents] = useState([]);

  useEffect(() => {
    // Fetch academic events from the backend
    const fetchAcademicEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/acads");
        setAcademicEvents(response.data);
      } catch (error) {
        console.error("Error fetching academic events:", error);
      }
    };

    fetchAcademicEvents();
  }, []);

  function AddClassAssignment() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
      try {
        const response = await axios.post("/acads", values);
        // Handle the response from the server to update the frontend
        console.log("Academic event created successfully:", response.data);
        form.resetFields();
      } catch (error) {
        console.error("Error creating academic event:", error);
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <div className="create-event-container">
        <h2>Schedule</h2>

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
            label="Class/Assignment"
            name="class_assignment"
            rules={[
              {
                required: true,
                message: "choose Class/Assignment!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="class"> Class </Radio>
              <Radio value="assignment"> Assignment </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Course No."
            name="courseno"
            rules={[
              {
                required: true,
                message: "Enter the Course No.!",
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
                message: "Enter Date and Time!",
              },
            ]}
          >
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              minDate={dayjs(today, { format })}
              format={format}
              label="Date and Time"
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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };
  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>Academics</h1>
        <div className="section">
          <div className="section-container">
            <h3>Upcoming Classes</h3>
            <div className="cards-container">
              {/*u need to get data from backend for this stuff*/}

              <CardAcads
                courseno="CS 123"
                time="8:00 AM"
                date="Oct 30, 2024"
                location="Room 101"
                desc="Introduction to Computer Science"
              />
              <CardAcads
                courseno="CS 124"
                time="9:00 AM"
                date="Oct 30, 2024"
                location="Room 102"
                desc="Data Structures and Algorithms"
              />
              <CardAcads
                courseno="CS 125"
                time="10:00 AM"
                date="Oct 30, 2024"
                location="Room 103"
                desc="Operating Systems"
              />
              <CardAcads
                courseno="CS 126"
                time="11:00 AM"
                date="Oct 30, 2024"
                location="Room 104"
                desc="Software Engineering"
              />
              <CardAcads
                courseno="CS 127"
                time="12:00 PM"
                date="Oct 30, 2024"
                location="Room 105"
                desc="Database Management Systems"
              />
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "10px" }}>
          <Button onClick={toggleOverlay}>Add Class/Assignments</Button>
          <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
            <AddClassAssignment />
          </Overlay>
        </div>
        <div className="section">
          <div className="section-container">
            <h3>Assignments</h3>
            <div className="cards-container">
              <CardAcads
                courseno="CS 123"
                time="8:00 AM"
                date="Oct 30, 2024"
                location="Room 101"
                desc="Introduction to Computer Science"
              />
              <CardAcads
                courseno="CS 124"
                time="9:00 AM"
                date="Oct 30, 2024"
                location="Room 102"
                desc="Data Structures and Algorithms"
              />
              <CardAcads
                courseno="CS 125"
                time="10:00 AM"
                date="Oct 30, 2024"
                location="Room 103"
                desc="Operating Systems"
              />
              <CardAcads
                courseno="CS 126"
                time="11:00 AM"
                date="Oct 30, 2024"
                location="Room 104"
                desc="Software Engineering"
              />
              <CardAcads
                courseno="CS 127"
                time="12:00 PM"
                date="Oct 30, 2024"
                location="Room 105"
                desc="Database Management Systems"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="menubar-container">
        <MenuBar currentPage={"acads"} />
      </div>
    </div>
  );
}
export default Acads;
