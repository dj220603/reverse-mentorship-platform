import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ElderlyDashboard() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Track connected mentors
  const [connectedMentors, setConnectedMentors] = useState({}); 

  const navigate = useNavigate();

  const username = localStorage.getItem("user_name") || "Elderly User";
  const userId = localStorage.getItem("user_id");

  const findMentors = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(`http://127.0.0.1:8000/find-mentor/?user_id=${userId}`);
      setMentors(response.data.matches);
      
      if (response.data.matches.length === 0) {
        setMessage("No matching mentors found for your Language.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error fetching mentors. Is Backend running?");
    }
    setLoading(false);
  };

  const handleConnect = (mentorId, mentorName) => {
    setConnectedMentors((prev) => ({
      ...prev,
      [mentorId]: true
    }));
    alert(`✅ Success! A request has been sent to ${mentorName}.\n\nThey will call you shortly on your registered number.`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <div>
            <h1 style={{ color: "#2c3e50", margin: 0 }}>Namaste, {username} Ji! 🙏</h1>
            <p style={{ fontSize: "18px", color: "#7f8c8d", margin: "5px 0 0 0" }}>Ready to learn something new today?</p>
        </div>
        <button onClick={handleLogout} style={{ padding: "10px 25px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
            Logout
        </button>
      </div>

      {/* Find Mentor Button */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button 
            onClick={findMentors} 
            disabled={loading}
            style={{ 
                padding: "20px 50px", 
                fontSize: "24px", 
                backgroundColor: "#27ae60", 
                color: "white", 
                border: "none", 
                borderRadius: "50px", 
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(39, 174, 96, 0.4)",
                transition: "transform 0.2s"
            }}>
            {loading ? "Finding Match..." : "🔍 Find My Perfect Mentor"}
        </button>
      </div>

      {/* Results List */}
      <div style={{ maxWidth: "850px", margin: "auto" }}>
        {message && <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>{message}</p>}
        
        {mentors.map((mentor) => (
            <div key={mentor.mentor_id} style={{ 
                backgroundColor: "white", 
                padding: "20px", 
                borderRadius: "15px", 
                marginBottom: "20px", 
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderLeft: "8px solid #3498db"
            }}>
                {/* Left Side: Avatar + Text */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    
                    {/* --- NEW: AVATAR IMAGE --- */}
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`}
                        alt={mentor.name}
                        style={{ width: "70px", height: "70px", borderRadius: "50%", marginRight: "20px", border: "2px solid #3498db" }}
                    />

                    <div>
                        <h2 style={{ margin: "0 0 8px 0", color: "#2980b9", fontSize: "24px" }}>{mentor.name}</h2>
                        <p style={{ margin: "5px 0", fontSize: "16px", color: "#555" }}>
                            Expert in: <strong style={{color: "#333"}}>{mentor.interests}</strong>
                        </p>
                        <div style={{ marginTop: "12px" }}>
                            <span style={{ backgroundColor: "#dff9fb", padding: "6px 12px", borderRadius: "20px", color: "#130f40", fontWeight: "bold", fontSize: "14px" }}>
                                Match Score: {mentor.match_score}%
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Right Side: Connect Button */}
                <button 
                    onClick={() => handleConnect(mentor.mentor_id, mentor.name)}
                    disabled={connectedMentors[mentor.mentor_id]}
                    style={{ 
                        padding: "12px 25px", 
                        backgroundColor: connectedMentors[mentor.mentor_id] ? "#95a5a6" : "#e67e22",
                        color: "white", 
                        border: "none", 
                        borderRadius: "8px", 
                        cursor: connectedMentors[mentor.mentor_id] ? "default" : "pointer",
                        fontWeight: "bold",
                        fontSize: "16px",
                        minWidth: "160px"
                    }}>
                    {connectedMentors[mentor.mentor_id] ? "Request Sent ✓" : "Connect Now"}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default ElderlyDashboard;