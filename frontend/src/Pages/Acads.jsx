import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/acadstyle.css";
import "./pagestyle/pagestyle.css";
import { DatePicker, Input, Form, Radio, Button } from "antd";
import dayjs from "dayjs";
import Overlay from "../Components/Overlay";

//<--Academics page
function Acads() {
  function CardAcads(props) {
    return (
      <div className="card-acads">
        <div className="card-acad-title">
          <h2>{props.courseno}</h2>
          <h2>{props.time}</h2>
        </div>

        <h2 style={{ textAlign: "right" }}>{props.date}</h2>
        <h2>{props.location}</h2>
        <p>{props.desc}</p>
      </div>
    );
  }
  //<-- creating and adding a class or assignment
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const today = dayjs();
  const format = "YYYY-MM-DD HH:mm";

  const onFinish = (e) => {
    console.log(e);
    window.alert("Event Created");
    toggleOverlay();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  function AddClassAssignment() {
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
            name="Class/Assignment"
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
            name="Course No."
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
            name="timedate"
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
        <div>
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
