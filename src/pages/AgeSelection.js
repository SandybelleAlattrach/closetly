import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function AgeSelection() {
    const nav = useNavigate();
    const [age, setAge] = useState();
    const handleNext = () => {
  if (!age) {
    alert("Select age");
    return;
  }

 
  nav ("/occasion");
};

  return (
    <div className="auth-container">
      <h2>Select Your Age</h2>

      <div className="form-group">
        <label>Age:</label>
        <select>
          <option>13-17</option>
          <option>18-21</option>
          <option>22-25</option>
          <option>26-30</option>
          <option>31-35</option>
          <option>36-40</option>
          <option>45-50</option>
        </select>
      </div>
        

      <button onClick={handleNext}>Next →
</button>
    </div>
  );
}

export default AgeSelection; 
