import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Noto Sans Devanagari', sans-serif", width: "100%", overflowX: "hidden", color: "#333" }}>
      
      {/* --- 1. NAVBAR --- */}
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "20px 50px", 
        backgroundColor: "white", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <h2 style={{ color: "#2c3e50", margin: 0, fontSize: "26px", fontWeight: "800" }}>
          Reverse<span style={{color: "#27ae60"}}>Mentorship</span>
        </h2>
        <div>
            <button 
              onClick={() => navigate('/login')} 
              style={{ marginRight: "20px", padding: "10px 20px", border: "none", background: "transparent", fontSize: "16px", cursor: "pointer", fontWeight: "600", color: "#555" }}>
              Login
            </button>
            <button 
              onClick={() => navigate('/login')} 
              style={{ padding: "12px 30px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "50px", fontSize: "16px", cursor: "pointer", fontWeight: "bold", transition: "0.3s" }}>
              Get Started
            </button>
        </div>
      </nav>

      {/* --- 2. HERO SECTION (Main Banner) --- */}
      <header style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "60px 80px", 
        backgroundColor: "#f8f9fa",
        minHeight: "85vh"
      }}>
        {/* Left Side: Text */}
        <div style={{ flex: 1, paddingRight: "60px" }}>
            
            {/* --- HINDI TAGLINE (Devanagari) --- */}
            <span style={{ backgroundColor: "#e8f5e9", color: "#27ae60", padding: "8px 15px", borderRadius: "20px", fontWeight: "bold", fontSize: "16px", letterSpacing: "0.5px" }}>
              🇮🇳 सीखने की कोई उम्र नहीं होती
            </span>
            
            <h1 style={{ fontSize: "56px", color: "#2c3e50", marginTop: "25px", marginBottom: "20px", lineHeight: "1.1", fontWeight: "900" }}>
                Tech Help for Seniors, <br/>
                <span style={{color: "#27ae60"}}>Wisdom for Youth.</span>
            </h1>
            
            {/* --- HINDI DESCRIPTION --- */}
            <p style={{ fontSize: "20px", color: "#666", marginBottom: "40px", lineHeight: "1.6", maxWidth: "550px" }}>
                हम युवा दिलों को बुजुर्गों के अनुभव से जोड़ते हैं। 
                <br/>
                <strong>टेक्नोलॉजी सीखिए और जीवन के किस्से साझा कीजिए।</strong>
            </p>
            
            <div style={{ display: "flex", gap: "15px" }}>
              <button 
                  onClick={() => navigate('/login')}
                  style={{ padding: "18px 40px", fontSize: "18px", backgroundColor: "#e67e22", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 10px 20px rgba(230, 126, 34, 0.3)" }}>
                  Find a Mentor
              </button>
              <button 
                  onClick={() => navigate('/login')}
                  style={{ padding: "18px 40px", fontSize: "18px", backgroundColor: "white", color: "#333", border: "2px solid #ddd", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
                  Join as Mentor
              </button>
            </div>
        </div>
        
        {/* Right Side: Hero Image */}
        <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100%", height: "100%", backgroundColor: "#e8f5e9", borderRadius: "30px", zIndex: 0 }}></div>
            
            <img 
                src="https://media.istockphoto.com/id/108351472/photo/happy-village-girl-using-laptop-with-mother-brother-and-grandfa.jpg?s=612x612&w=0&k=20&c=qMxiW4OqTL_u_l5NWmFd93g6MaYNWIEk9XhYEgnw_0I=" 
                alt="Granddaughter helping grandmother" 
                style={{ 
                  width: "100%", 
                  borderRadius: "30px", 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  position: "relative",
                  zIndex: 1,
                  border: "5px solid white"
                }}
            />
        </div>
      </header>

      {/* --- 3. FEATURES SECTION --- */}
      <section style={{ padding: "100px 50px", textAlign: "center", backgroundColor: "white" }}>
        <h2 style={{ fontSize: "40px", color: "#2c3e50", marginBottom: "15px", fontWeight: "800" }}>यह कैसे काम करता है?</h2>
        <p style={{ fontSize: "18px", color: "#777", marginBottom: "60px" }}>जुड़ने और साथ बढ़ने के आसान चरण (Simple steps).</p>
        
        <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" }}>
            
            <div style={cardStyle}>
                <div style={iconBoxStyle}>🔍</div>
                <h3 style={{ margin: "15px 0", fontSize: "22px" }}>1. Find a Match</h3>
                <p style={{color: "#666", lineHeight: "1.6"}}>अपनी भाषा (हिंदी/अंग्रेज़ी) और रुचि के आधार पर मेंटर खोजें।</p>
            </div>

            <div style={cardStyle}>
                <div style={iconBoxStyle}>🤝</div>
                <h3 style={{ margin: "15px 0", fontSize: "22px" }}>2. Connect</h3>
                <p style={{color: "#666", lineHeight: "1.6"}}>रिक्वेस्ट भेजें। हमारा सिस्टम आपको तुरंत कनेक्ट कर देगा।</p>
            </div>

            <div style={cardStyle}>
                <div style={iconBoxStyle}>💡</div>
                <h3 style={{ margin: "15px 0", fontSize: "22px" }}>3. Learn & Share</h3>
                <p style={{color: "#666", lineHeight: "1.6"}}>मोबाइल ऐप्स सीखें, वीडियो कॉल करें और जीवन के किस्से सुनें।</p>
            </div>

        </div>
      </section>

      {/* --- 4. FOOTER --- */}
      <footer style={{ backgroundColor: "#2c3e50", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Reverse Mentorship Project</h3>
        <p style={{ opacity: "0.7", maxWidth: "600px", margin: "0 auto 30px auto" }}>
          एक कदम, नई दोस्ती की तरफ। पीढ़ियों को जोड़ने का एक प्रयास।
        </p>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", fontSize: "14px" }}>
          &copy; 2025 Reverse Mentorship. Inspired by Youngster.co
        </div>
      </footer>

    </div>
  );
}

// --- STYLES OBJECTS ---
const cardStyle = {
    flex: "1",
    minWidth: "280px",
    maxWidth: "350px",
    padding: "40px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    border: "1px solid #eee",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: "transform 0.3s",
    cursor: "default"
};

const iconBoxStyle = {
    fontSize: "40px",
    marginBottom: "20px",
    backgroundColor: "#e8f5e9",
    width: "90px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    margin: "0 auto",
    color: "#27ae60"
};

export default LandingPage;