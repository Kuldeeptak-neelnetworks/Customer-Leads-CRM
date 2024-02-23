import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmailDetails = () => {
  const { customerId, emailId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [replyToggle, setReplyToggle] = useState(false);
  const [emailBody, setEmailBody] = useState("");

  // for React quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  return (
    <div className="main-wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="page-heading">Email Details</h4>
        <button
          onClick={() => navigate(`/customers/${customerId}`)}
          className="cta-btn"
        >
          Go back
        </button>
      </div>
      <div className="email-parent-wrapper mt-4">
        {/* subject */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 align-items-center">
            <img
              src={location.state.email.imgUrl}
              className="profile-image"
              alt="profile"
            />
            <div>
              <p className="mb-1 content-text username">
                {location.state.customer.name}
              </p>
              <p className="m-0 content-text email">
                {location.state.customer.email}
              </p>
            </div>
          </div>

          <p className="m-0 content-text">
            {location.state.email.time}, {location.state.email.date}
          </p>
        </div>

        {/* email subject */}
        <p className="mt-4 mb-0 content-text">
          <span className="subject-title">Subject</span>:{" "}
          {location.state.email.subject}
        </p>

        {/* email body */}
        <div className="messages-wrapper mt-3">
          {location.state.email.messages.map((message, index) => (
            <p key={index} className="message mb-1 content-text">
              {message}
            </p>
          ))}
        </div>

        {replyToggle ? (
          <div className="mt-4">
            <ReactQuill
              theme="snow"
              value={emailBody}
              onChange={setEmailBody}
              placeholder="Write a short brief about the invoice..."
              modules={modules}
              className="reactQuillEditor"
            />
            <div className="d-flex gap-3 mt-3">
              <button className="cta-btn">Reply</button>
              <button className="cta-btn" onClick={() => setReplyToggle(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="cta-btn mt-4"
            onClick={() => setReplyToggle((prev) => !prev)}
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailDetails;
