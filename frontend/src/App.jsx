import { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

// --- IMPORTS ---
import LandingPage from './LandingPage'
import ElderlyDashboard from './ElderlyDashboard'
import YouthDashboard from './YouthDashboard'

// --- LOGIN PAGE COMPONENT ---
function LoginPage() {
  const [isLogin, setIsLogin] = useState(false) 
  const [loading, setLoading] = useState(false)
  
  // Track kar raha hai ki abhi kaunsa field sun raha hai
  const [listeningField, setListeningField] = useState(null);

  const [formData, setFormData] = useState({ 
    username: "", email: "", password: "", 
    role: "elderly", language: "Hindi", interests: "" 
  })
  
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  // --- 🔊 1. APP BOLEGA (Instructions) ---
  const speakInstructions = () => {
    // Agar browser support nahi karta
    if (!('speechSynthesis' in window)) {
        alert("Aapka browser bolne wala feature support nahi karta.");
        return;
    }
    const msg = new SpeechSynthesisUtterance();
    msg.text = isLogin 
        ? "Login karne ke liye apna email aur password daliye." 
        : "Naya account banane ke liye, upar wale dabbe mein apna role chuniye, phir mic daba kar apna naam aur interests boliye.";
    
    msg.lang = 'hi-IN'; // Hindi accent
    msg.rate = 0.9;     // Thoda dheere
    window.speechSynthesis.speak(msg);
  };

  // --- 🎤 2. APP SUNEGA (Voice Input with Fixes) ---
  const handleVoiceInput = (fieldName) => {
    // 1. Browser Support Check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("❌ Maaf kijiye! Voice feature sirf Google Chrome ya Edge browser par chalta hai.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Hindi/Indian English sunega
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Animation Start
    setListeningField(fieldName);
    console.log("🎤 Mic starting...");

    try {
        recognition.start();
    } catch (e) {
        console.error(e);
        alert("Mic start nahi ho pa raha. Page refresh karein.");
    }

    // Jab user bol chuka ho
    recognition.onresult = async (e) => {
      const spokenText = e.results[0][0].transcript;
      console.log("🗣️ Sunayi diya:", spokenText);

      // Agar 'Interests' hai to Smart Backend Logic lagao
      if(fieldName === 'interests') {
           try {
              // Backend se pucho iska technical matlab kya hai
              const res = await axios.post("https://reverse-mentorship-platform.onrender.com/suggest-interests/", {text: spokenText});
              setFormData(prev => ({...prev, [fieldName]: res.data.suggested}));
           } catch(err) { 
               // Error aaye to jo suna wahi likh do
               setFormData(prev => ({...prev, [fieldName]: spokenText})); 
           }
      } else {
          // Name ya baaki fields ke liye seedha likh do
          setFormData(prev => ({...prev, [fieldName]: spokenText}));
      }
      setListeningField(null); // Stop Animation
    };

    // Error Handling (Ye batayega kyun nahi chal raha)
    recognition.onerror = (event) => {
      console.error("❌ Speech Error:", event.error);
      setListeningField(null);

      if (event.error === 'not-allowed') {
          alert("⚠️ Permission Blocked! Upar URL bar mein 'Lock' 🔒 ya 'Mic' 🎙️ icon par click karke Permission Allow karein.");
      } else if (event.error === 'no-speech') {
          alert("⚠️ Kuch sunayi nahi diya. Kripya zor se bolein.");
      } else if (event.error === 'network') {
          alert("⚠️ Internet connection check karein. Voice feature ke liye internet zaroori hai.");
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setListeningField(null);
    };
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      if (isLogin) {
        const response = await axios.post("https://reverse-mentorship-platform.onrender.com/login/", { email: formData.email, password: formData.password })
        localStorage.setItem("user_id", response.data.user_id)
        localStorage.setItem("user_name", response.data.username)
        if (response.data.role === "elderly") navigate("/elderly-dashboard")
        else navigate("/youth-dashboard")
      } else {
        await axios.post("https://reverse-mentorship-platform.onrender.com/users/", formData)
        setMessage("✅ Account ban gaya! Ab Login karein.")
        setIsLogin(true)
      }
    } catch (error) { setMessage("❌ Error. Details check karein."); }
    setLoading(false)
  }

  // --- STYLES ---
  const styles = {
    container: { 
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", 
        backgroundImage: "url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80')", 
        backgroundSize: "cover", padding: "20px", fontFamily: "Arial, sans-serif" 
    },
    overlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 0 },
    card: { 
        position: "relative", zIndex: 1, backgroundColor: "rgba(255,255,255,0.96)", padding: "30px", 
        borderRadius: "20px", maxWidth: "550px", width: "100%", textAlign: "center", 
        border: "4px solid #fff", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" 
    },
    // Input Design
    inputGroup: { position: "relative", marginBottom: "20px", textAlign: "left" },
    label: { display: "block", fontSize: "18px", fontWeight: "bold", color: "#2c3e50", marginBottom: "5px" },
    input: { 
        width: "100%", padding: "15px", paddingRight: "50px", fontSize: "18px", 
        borderRadius: "10px", border: "2px solid #bdc3c7", outline: "none" 
    },
    // Mic Button Design
    micButton: { 
        position: "absolute", right: "10px", top: "38px", background: "white", border: "1px solid #ccc", 
        borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontSize: "20px", 
        display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" 
    },
    // Big Role Cards
    roleCard: {
      flex: 1, padding: "15px", border: "2px solid #ddd", borderRadius: "10px", cursor: "pointer",
      textAlign: "center", transition: "0.2s", backgroundColor: "white"
    },
    btn: { width: "100%", padding: "15px", fontSize: "20px", background: isLogin ? "#2980b9" : "#27ae60", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", marginTop: "10px", fontWeight: "bold" }
  }

  // Helper function to create inputs easily
  const renderInput = (label, name, placeholder, type="text", showMic=true) => (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <input 
        style={styles.input} 
        type={type} 
        name={name} 
        value={formData[name]} 
        placeholder={placeholder} 
        onChange={handleChange} 
        required 
      />
      {showMic && (
        <button 
            type="button" 
            onClick={() => handleVoiceInput(name)} 
            style={{...styles.micButton, borderColor: listeningField === name ? "red" : "#ccc", color: listeningField === name ? "red" : "black"}}
            title="Bolkar likhein"
        >
          {listeningField === name ? "🔴" : "🎙️"}
        </button>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        
        {/* Audio Guide Button */}
        <button onClick={speakInstructions} style={{marginBottom: "20px", padding: "10px 20px", borderRadius: "30px", border: "none", background: "#e67e22", color: "white", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.2)"}}>
            🔊 Suniye kaise karna hai
        </button>

        <h1 style={{color: "#2c3e50", margin: "0 0 20px 0"}}>Reverse Mentorship</h1>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
               {/* Role Selection */}
               <div style={{marginBottom: "20px"}}>
                  <label style={styles.label}>Aap kaun hain?</label>
                  <div style={{display: "flex", gap: "15px"}}>
                      <div 
                        onClick={()=>setFormData({...formData, role:'elderly'})} 
                        style={{...styles.roleCard, borderColor: formData.role==='elderly'?'#2980b9':'#ddd', backgroundColor: formData.role==='elderly'?'#dff9fb':'white'}}>
                          <div style={{fontSize: "28px"}}>👴👵</div>
                          <div style={{fontWeight: "bold"}}>Elderly</div>
                      </div>
                      <div 
                        onClick={()=>setFormData({...formData, role:'youth'})} 
                        style={{...styles.roleCard, borderColor: formData.role==='youth'?'#2980b9':'#ddd', backgroundColor: formData.role==='youth'?'#dff9fb':'white'}}>
                          <div style={{fontSize: "28px"}}>🧑👧</div>
                          <div style={{fontWeight: "bold"}}>Youth</div>
                      </div>
                  </div>
               </div>

               {renderInput("Pura Naam (Full Name):", "username", "Boliye: Ramesh Kumar...")}
               
               <div style={styles.inputGroup}>
                  <label style={styles.label}>Bhasha (Language):</label>
                  <select name="language" onChange={handleChange} style={styles.input}>
                    <option value="Hindi">🇮🇳 Hindi</option>
                    <option value="English">🇬🇧 English</option>
                    <option value="Marathi">🇮🇳 Marathi</option>
                  </select>
               </div>

               {renderInput("Interests (Kya seekhna hai?):", "interests", "Boliye: Beta videsh mein hai...")}
            </>
          )}
          
          {renderInput("Email ID:", "email", "email@example.com", "email", false)}
          {renderInput("Password:", "password", "******", "password", false)}
          
          <button style={styles.btn} disabled={loading}>
            {loading ? "Rukiye..." : (isLogin ? "Login Karein ➤" : "Register Karein ➤")}
          </button>
        </form>

        <p style={{marginTop: "20px", fontSize: "16px", fontWeight: "bold"}}>
            <span onClick={() => setIsLogin(!isLogin)} style={{color: "#d35400", cursor: "pointer", textDecoration: "underline"}}>
                {isLogin ? "Naya Account Banayein" : "Pehle se account hai? Login"}
            </span>
        </p>

        {message && <div style={{marginTop: "15px", padding: "10px", borderRadius: "10px", background: message.includes("Error")?"#ffdddd":"#ddffdd", color: message.includes("Error")?"red":"green"}}>{message}</div>}
      </div>
    </div>
  )
}

// --- ROUTING ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/elderly-dashboard" element={<ElderlyDashboard />} />
        <Route path="/youth-dashboard" element={<YouthDashboard />} />
      </Routes>
    </Router>
  )
}

export default App