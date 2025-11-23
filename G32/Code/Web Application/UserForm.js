import React, { useState } from "react";
import Lottie from "lottie-react";
import balancedLifeAnimation from "./animations/balancedLife.json";
import "./UserForm.css";
import { v4 as uuidv4 } from "uuid";

function UserForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skipSensor, setSkipSensor] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = uuidv4(); // unique ID for each user
    onSubmit({ name, age, skipSensor, userId });
  };

  return (
    <div className="form-screen">
      <div className="animation-container">
        <Lottie animationData={balancedLifeAnimation} loop={true} />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-wrapper">
          <h2 className="form-title">Let’s Get to Know You</h2>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />

          <input
            type="number"
            placeholder="Enter Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <button className="start-button" type="submit">
            ✨ Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
