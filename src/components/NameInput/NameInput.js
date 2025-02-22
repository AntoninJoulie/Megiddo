import React, { useState } from "react";
import "./NameInput.css";

const NameInput = ({ onNameSubmit, fadeOut }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div
      className={`name-input-container centered-container dialogue-box ${
        fadeOut ? "fade-out" : ""
      }`}
    >
      <h2>Who are you?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
          autoFocus
        />
        <button type="submit" className="common-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NameInput;
