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

function Acads() {
  const { account } = useContext(DataContext);
  const [academicEvents, setAcademicEvents] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
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

  const classes = academicEvents.filter(
    (event) => event.class_assignment === "class"
  );
  const assignments = academicEvents.filter(
    (event) => event.class_assignment === "assignment"
  );

  const onFinish = async (e) => {
    e.bothtime = e.bothtime.map((time) => time.toISOString());
    e.startdate = e.bothtime[0];
    e.enddate = e.bothtime[1];
    e.classname = account.classname;
    delete e.bothtime;

    try {
      await axios.post("http://localhost:8000/acads", e);
      toggleOverlay();
      window.alert("Event Created");
      setAcademicEvents((prevEvents) => [...prevEvents, e]); // Optionally, add the new event locally
    } catch (error) {
      console.error("Error creating academic event:", error);
      window.alert("Error creating event");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function CardAcads(props) {
    const formattedDate = dayjs(props.date).format("MMM D, YYYY");
    const formattedTime = dayjs(props.time).format("h:mm A");

    return (
      <div className="card-acads">
        <div className="card-acad-title">
          <h2>{props.courseno}</h2>
          <h2>{formattedTime}</h2>
        </div>
        <h2 style={{ textAlign: "right" }}>{formattedDate}</h2>
        <h2>{props.location}</h2>
        <p>{props.desc}</p>
      </div>
    );
  }

  function AddClassAssignment() {
    return (
      <div className="create-event-container">
        <h2>Schedule</h2>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 22 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Class/Assignment"
            name="class_assignment"
            rules={[{ required: true, message: "Choose Class/Assignment!" }]}
          >
            <Radio.Group>
              <Radio value="class"> Class </Radio>
              <Radio value="assignment"> Assignment </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Course No."
            name="courseno"
            rules={[{ required: true, message: "Enter the Course No.!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="RangePicker"
            name="bothtime"
            rules={[{ required: true, message: "Enter Date and Time!" }]}
          >
            <DatePicker.RangePicker
              showTime={{ format: "HH:mm" }}
              minDate={dayjs()}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Enter Location!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Enter Description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>Academics</h1>

        {/* Display Classes */}
        <div className="section">
          <div className="section-container">
            <h3>Upcoming Classes</h3>
            <div className="cards-container">
              {classes.map((event, index) => (
                <CardAcads
                  key={index}
                  courseno={event.courseno}
                  time={event.startdate}
                  date={event.startdate}
                  location={event.location}
                  desc={event.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Add Class/Assignment Button */}
        <div style={{ textAlign: "center", margin: "10px" }}>
          {account.role === "admin" ? (
            <>
              <Button onClick={toggleOverlay}>Add Class/Assignments</Button>
              <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
                <AddClassAssignment />
              </Overlay>
            </>
          ) : null}
        </div>

        {/* Display Assignments */}
        <div className="section">
          <div className="section-container">
            <h3>Assignments</h3>
            <div className="cards-container">
              {assignments.map((event, index) => (
                <CardAcads
                  key={index}
                  courseno={event.courseno}
                  time={event.startdate}
                  date={event.startdate}
                  location={event.location}
                  desc={event.description}
                />
              ))}
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
