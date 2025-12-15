import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function YouthDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("user_name");
  const userId = localStorage.getItem("user_id");

  // State to hold form data
  const [formData, setFormData] = useState({
    interests: "",
    language: "Hindi"
  });
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Save Button
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Backend ko naya data bhejo
      // Note: Hamein username/email/password bhi bhejna padta hai kyunki API model poora user expect karta hai
      // Lekin hum backend me sirf interests aur language update kar rahe hain.
      await axios.put(`https://reverse-mentorship-platform.onrender.com/update-profile/${userId}`, {
        ...formData,
        username: username, // Ye dummy bhej rahe hain taaki validation fail na ho
        email: "dummy@email.com", 
        password: "dummy",
        role: "youth"
      });
      
      setMessage("✅ Success! Your profile has been updated.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error updating profile.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
        <div style={{display: "flex", alignItems: "center"}}>
            {/* Avatar */}
            <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                alt="avatar"
                style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "15px", border: "2px solid blue" }}
            />
            <h1 style={{ color: "#2c3e50", margin: 0 }}>Hello, {username}! 👋</h1>
        </div>
        <button onClick={handleLogout} style={{ padding: "10px 20px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Logout
        </button>
      </div>

      <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" }}>
        
        {/* Card 1: Stats (Just for Show) */}
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", width: "300px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h3>📊 Your Impact</h3>
          <p style={{ fontSize: "18px" }}>Sessions Completed: <strong>0</strong></p>
          <p style={{ fontSize: "18px" }}>Average Rating: <strong>5.0 ★</strong></p>
          <p style={{ color: "green", fontWeight: "bold" }}>Active Status: Online</p>
        </div>

        {/* Card 2: Edit Profile Form */}
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", width: "400px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0, color: "#2980b9" }}>✏️ Edit Your Profile</h2>
          <p style={{color: "gray"}}>Learnt a new skill? Add it here!</p>
          
          <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            
            <div>
                <label style={{fontWeight: "bold", display: "block", marginBottom: "5px"}}>Update Interests:</label>
                <input 
                  type="text" 
                  name="interests" 
                  placeholder="e.g. Tech, Cooking, Chess" 
                  value={formData.interests}
                  onChange={handleChange} 
                  required 
                  style={{ padding: "12px", width: "93%", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }} 
                />
            </div>

            <div>
                <label style={{fontWeight: "bold", display: "block", marginBottom: "5px"}}>Update Language:</label>
                <select 
                    name="language" 
                    value={formData.language}
                    onChange={handleChange} 
                    style={{ padding: "12px", width: "100%", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Marathi">Marathi</option>
                </select>
            </div>

            <button type="submit" style={{ padding: "12px", backgroundColor: "#2980b9", color: "white", fontSize: "18px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>
              Save Changes
            </button>
          </form>

          {message && <p style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}>{message}</p>}
        </div>

      </div>
    </div>
  );
}

export default YouthDashboard;