import React from "react";

function EventCardExpanded(props) {
  const { data, onClose } = props;
  return (
    <div className="event-card-expanded">
      <div className="event-header">
        <h2 className="event-title">{data.title}</h2>
        <h2 className="event-time">
          {data.time}
          <br />
          {data.date}
        </h2>
      </div>
      <div className="event-card-expanded-splitter">
        <div className="event-card-expanded-splitter-left">
          <img
            className="event-image"
            src={data.image}
            alt="Event Image Placeholder"
          />

          <div className="event-description">{data.description}</div>
        </div>
        <div className="event-card-expanded-splitter-right">
          <div className="faq"></div>
          <div className="question-section">
            <p>Still have doubts? Why not contact us...</p>
          </div>
        </div>
      </div>
      <div className="dual-botton-container">
        <button className="btn-left">Add Event</button>
        <button className="btn-right" onClick={onClose}>
          Show less
        </button>
      </div>
    </div>
  );
}

export default EventCardExpanded;
