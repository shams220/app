import React, { useState, useRef } from "react";
import "./descripition.css";

const DescriptionBox = ({ text }) => {
  const [open, setOpen] = useState(false);
  const descRef = useRef();

  // Optional: measure width for overlay if you want them sized the same
  const width = descRef.current ? descRef.current.offsetWidth : "auto";

  return (
    <div className="desc-container">
      <div
        ref={descRef}
        className="desc-preview"
        title={text}
      >
        {text}
        {!open && text.length > 80 && (
          <span className="fadeout"></span>
        )}
      </div>
      {text.length > 80 && (
        <button className="desc-btn" onClick={() => setOpen(true)}>
          Read More
        </button>
      )}

      {open && (
        // Overlay
        <div
          className="desc-overlay"
          style={{ width }}
          onClick={() => setOpen(false)}
        >
          <div
            className="desc-full"
            onClick={e => e.stopPropagation()} // prevent closing when clicking inside box
          >
            <div>{text}</div>
            <button
              className="desc-btn"
              onClick={() => setOpen(false)}
            >Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
