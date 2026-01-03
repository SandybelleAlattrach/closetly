import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WardrobeAdd from "./WardrobeAdd"; // تأكد من المسار الصحيح

function PagesSignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userWardrobe, setUserWardrobe] = useState([]);

const handleAddWardrobe = (newOutfit) => {
  setUserWardrobe([...userWardrobe, newOutfit]);
};

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    occasion: "",
    AI: "",
    gender: "",
    wardrobe: "",
    colors: [],
    mood: "",
    hairColor: "",
    hairType: "",
    makeup: "",
    skin: "",
    rating: "",
    age: "",
  });

  const handleNext = () => {
    if (userInfo.gender === "male" && step === 7) {
      setStep(13); // male skips steps
      return;
    }
    setStep(step + 1);
  };

  const handleSave = async () => {
    console.log("HANDLE SAVE CLICKED ✅");
  console.log("USER INFO:", userInfo);
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Signup successful ✅");
    navigate("/login");

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
};


  return (
    <div className="auth-page">
      <div className={`auth-card ${userInfo.gender === "male" ? "male-theme" : "female-theme"}`}>
        <h2>✨ Sign Up</h2>

        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <>
            <input
              className="auth-input"
              placeholder="First Name"
              value={userInfo.firstName}
              onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            />
            <input
              className="auth-input"
              placeholder="Last Name"
              value={userInfo.lastName}
              onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            />
            <input
              className="auth-input"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            />
            <input
              className="auth-input"
              placeholder="City"
              value={userInfo.city}
              onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
            />
            <button className="next-btn" onClick={handleNext}>Next →</button>
          </>
        )}

        {/* STEP 2: Age */}
        {step === 2 && (
          <>
            <h2>🎂 Select Your Age</h2>
            <div className="options-grid">
              {["12–15", "16–18", "19–25", "26–35", "36+"].map((a) => (
                <div
                  key={a}
                  className={`option-card ${userInfo.age === a ? "active" : ""}`}
                  onClick={() => setUserInfo({ ...userInfo, age: a })}
                >
                  {a}
                </div>
              ))}
            </div>
            <button
              className="next-btn"
              onClick={handleNext}
              disabled={!userInfo.age}
            >
              Next →
            </button>
          </>
        )}

        {/* STEP 3: Occasion */}
        {step === 3 && (
          <>
            <h2>Occasion</h2>
            <div className="options-grid">
              {[
                { label: "University 🎓", value: "university" },
                { label: "Work 💼", value: "work" },
                { label: "Wedding 💍", value: "wedding" },
                { label: "Party 🎉", value: "party" },
                { label: "Casual 👕", value: "casual" },
                { label: "Formal 🖤", value: "formal" },
              ].map((o) => (
                <div
                  key={o.value}
                  className={`option-card ${userInfo.occasion === o.value ? "active" : ""}`}
                  onClick={() => setUserInfo({ ...userInfo, occasion: o.value })}
                >
                  {o.label}
                </div>
              ))}
            </div>
            <button
              className="next-btn"
              onClick={handleNext}
              disabled={!userInfo.occasion}
            >
              Next →
            </button>
          </>
        )}

        {/* STEP 4: AI */}
        {step === 4 && (
          <>
            <h2>AI Decision?</h2>
            <button
              className="next-btn"
              onClick={() => {
                setUserInfo({ ...userInfo, AI: "yes" });
                handleNext();
              }}
            >
              Next →
            </button>
            <button
              className="skip-btn"
              onClick={() => {
                setUserInfo({ ...userInfo, AI: "skipped" });
                handleNext();
              }}
            >
              Skip
            </button>
          </>
        )}

        {/* STEP 5: Gender */}
        {step === 5 && (
          <>
            <h2>Gender</h2>
            <div className="options-grid">
              {["male", "female"].map((g) => (
                <div
                  key={g}
                  className={`option-card ${userInfo.gender === g ? "active" : ""}`}
                  onClick={() => setUserInfo({ ...userInfo, gender: g })}
                >
                  {g === "male" ? "👔 Male" : "👗 Female"}
                </div>
              ))}
            </div>
            <button
              className="next-btn"
              onClick={() => {
                if (!userInfo.gender) return;
                handleNext();
              }}
              disabled={!userInfo.gender}
            >
              Next →
            </button>
          </>
        )}

        {/* STEP 6: Wardrobe */}
{step === 6 && (
  <>
    <h2>Wardrobe</h2>
    <p style={{ marginBottom: "15px" }}>Manage your outfits</p>

    <div className="wardrobe-actions">
      <button
        className="next-btn"
        onClick={() => {
          setUserInfo({ ...userInfo, wardrobe: "added" });
          handleNext();
        }}
      >
        + Add Outfit
      </button>

      <button
        className="next-btn"
        onClick={handleNext}
      >
        Next →
      </button>

      <button
        className="skip-btn"
        onClick={() => {
          setUserInfo({ ...userInfo, wardrobe: "skipped" });
          handleNext();
        }}
      >
        Skip
      </button>
    </div>
  </>
)}


        {/* STEP 7: Color Preference */}
        {step === 7 && (
          <>
            <h2>🎨 Colors You Prefer</h2>
            <p>Select 1 to 3 colors</p>
            <div className="colors-grid">
              {["❤️ Red", "🖤 Black", "🤍 White", "💙 Blue", "💗 Pink", "💚 Green"].map((c) => {
                const isSelected = userInfo.colors.includes(c);
                return (
                  <button
                    key={c}
                    className={`color-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      let newColors = [...userInfo.colors];
                      if (isSelected) {
                        newColors = newColors.filter(x => x !== c);
                      } else if (newColors.length < 3) {
                        newColors.push(c);
                      }
                      setUserInfo({ ...userInfo, colors: newColors });
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <button
              className="next-btn"
              disabled={userInfo.colors.length === 0}
              onClick={handleNext}
            >
              Next →
            </button>
          </>
        )}


     {step === 8 && (
  <div>
    <h2>🎭 Select Your Mood</h2>
    <p style={{ marginBottom: "15px", color: "#777" }}>
      Choose your mood
    </p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
      {["Casual 😌", "Elegant ✨", "Bold 🔥", "Soft 🌸", "Cute 🎀"].map((mood) => (
        <button
          key={mood}
          onClick={() =>
            setUserInfo({ ...userInfo, mood: userInfo.mood === mood ? "" : mood })
          }
          style={{
            background: userInfo.mood === mood ? "#ffb6c1" : "#eee",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {mood}
        </button>
      ))}
    </div>

    <button
      className="next-btn"
      onClick={handleNext}
      disabled={!userInfo.mood} 
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: userInfo.mood ? "#4caf50" : "#ccc",
        color: "#fff",
        cursor: userInfo.mood ? "pointer" : "not-allowed",
      }}
    >
      Next →
    </button>
  </div>
)}


      {step === 9 && (
  <div>
    <h2>💇‍♀️ Select Your Hair Color</h2>
    <p style={{ marginBottom: "15px", color: "#777" }}>
      Choose one hair color
    </p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
      {["🖤 Black", "🤎 Brown", "💛 Blonde", "❤️ Red", "💜 Other"].map(color => (
        <button
          key={color}
          onClick={() =>
            setUserInfo({ ...userInfo, hairColor: userInfo.hairColor === color ? "" : color })
          }
          style={{
            background: userInfo.hairColor === color ? "#ffb6c1" : "#eee",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {color}
        </button>
      ))}
    </div>

    <button
      className="next-btn"
      onClick={handleNext}
      disabled={!userInfo.hairColor} 
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: userInfo.hairColor ? "#4caf50" : "#ccc",
        color: "#fff",
        cursor: userInfo.hairColor ? "pointer" : "not-allowed",
      }}
    >
      Next →
    </button>
  </div>
)}

{step === 10 && (
  <div>
    <h2>💇‍♂️ Select Your Hair Type</h2>
    <p style={{ marginBottom: "15px", color: "#777" }}>
      Choose one hair type
    </p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
      {["🌀 Curly", "💨 Wavy", "🧵 Straight", "⚡ Coily"].map(type => (
        <button
          key={type}
          onClick={() =>
            setUserInfo({ ...userInfo, hairType: userInfo.hairType === type ? "" : type })
          }
          style={{
            background: userInfo.hairType === type ? "#ffb6c1" : "#eee",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {type}
        </button>
      ))}
    </div>

    <button
      className="next-btn"
      onClick={handleNext}
      disabled={!userInfo.hairType} 
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: userInfo.hairType ? "#4caf50" : "#ccc",
        color: "#fff",
        cursor: userInfo.hairType ? "pointer" : "not-allowed",
      }}
    >
      Next →
    </button>
  </div>
)}

     {step === 11 && (
  <div>
    <h2>💄 Select Your Makeup</h2>
    <p style={{ color: "#777", marginBottom: "15px" }}>Choose your makeup style</p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
      {[
        "💄 Natural",
        "✨ Glam",
        "🌸 Soft",
        "🎀 Cute",
        "🔥 Bold",
        "🖤 Smokey",
        "💋 Lip Focus",
        "🎨 Artistic",
        "🌟 Highlighted",
        "💚 Green Accent"
      ].map((type) => (
        <button
          key={type}
          onClick={() =>
            setUserInfo({ ...userInfo, makeup: userInfo.makeup === type ? "" : type })
          }
          style={{
            background: userInfo.makeup === type ? "#ffb6c1" : "#eee",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {type}
        </button>
      ))}
    </div>

    <button
      className="next-btn"
      onClick={handleNext}
      disabled={!userInfo.makeup}
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: userInfo.makeup ? "#4caf50" : "#ccc",
        color: "#fff",
        cursor: userInfo.makeup ? "pointer" : "not-allowed",
      }}
    >
      Next →
    </button>
  </div>
)}

      {step === 12 && (
  <div>
    <h2>🎭 Select Your Skin Tone</h2>
    <p style={{ color: "#777", marginBottom: "15px" }}>Choose your skin tone</p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
      {["🤍 Fair", "🤎 Medium", "🖤 Dark", "🌟 Olive", "☕ Caramel"].map((tone) => (
        <button
          key={tone}
          onClick={() =>
            setUserInfo({ ...userInfo, skin: userInfo.skin === tone ? "" : tone })
          }
          style={{
            background: userInfo.skin === tone ? "#ffb6c1" : "#eee",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {tone}
        </button>
      ))}
    </div>

    <button
      className="next-btn"
      onClick={handleNext}
      disabled={!userInfo.skin}
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: userInfo.skin ? "#4caf50" : "#ccc",
        color: "#fff",
        cursor: userInfo.skin ? "pointer" : "not-allowed",
      }}
    >
      Next →
    </button>
  </div>
)}

{step === 13 && (
  <div>
    <h2>👗 Add Your Wardrobe</h2>

    <WardrobeAdd
      addToParentWardrobe={handleAddWardrobe}
      currentWardrobe={userWardrobe}
    />

    <div className="wardrobe-actions">
      <button
        className="next-btn"
        onClick={() => {
          setUserInfo({ ...userInfo, wardrobe: userWardrobe });
          setStep(14);
        }}
      >
        Next →
      </button>

      <button
        className="skip-btn"
        onClick={() => {
          setUserInfo({ ...userInfo, wardrobe: [] });
          setStep(14);
        }}
      >
        Skip
      </button>
    </div>
  </div>
)}

{step === 14 && (
  <div>
    <h2>✅ Finish Signup</h2>

    <input
      className="auth-input"
      type="text"
      placeholder="Rating"
      value={userInfo.rating}
      onChange={(e) =>
        setUserInfo({ ...userInfo, rating: e.target.value })
      }
    />

    <button
      className="next-btn"
      onClick={handleSave}
    >
      Save & Finish Signup
    </button>
  </div>
)}

</div>
</div>
  );
}
export default PagesSignUp;
