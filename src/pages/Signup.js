import "./auth.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WardrobeAdd from "./WardrobeAdd";

/**
 * API base:
 * - Use REACT_APP_API_URL when set in your build/CI environment.
 * - Fallback to the deployed Render backend URL.
 */
const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_RENDER_URL || "https://closetly-nstg.onrender.com";

export default function PagesSignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userWardrobe, setUserWardrobe] = useState([]);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    occasion: "",
    AI: "",
    gender: "",
    wardrobe: [],
    colors: [],
    mood: "",
    hairColor: "",
    hairType: "",
    makeup: "",
    skin: "",
    rating: "",
    age: "",
  });

  const setField = (field, value) => setUserInfo((p) => ({ ...p, [field]: value }));

  const handleAddWardrobe = (newOutfit) => {
    setUserWardrobe((prev) => [...prev, newOutfit]);
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleNext = () => {
    // preserve original logic: male skip to wardrobe step
    if (userInfo.gender === "male" && step === 7) {
      setStep(13);
      return;
    }
    next();
  };

  const toggleColor = (c) =>
    setUserInfo((p) => {
      const selected = p.colors.includes(c);
      const colors = selected ? p.colors.filter((x) => x !== c) : [...p.colors, c];
      return { ...p, colors: colors.slice(0, 3) };
    });

  const toggleField = (field, value) =>
    setUserInfo((p) => ({ ...p, [field]: p[field] === value ? "" : value }));

  const validateEmail = (email) => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSave = async () => {
    const payload = { ...userInfo, wardrobe: userWardrobe };

    // Basic client-side validation
    if (!payload.email || !payload.password) {
      alert("Email and password are required.");
      return;
    }
    if (!validateEmail(payload.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending userInfo to API:", API, payload);

      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message || "Signup failed!");
        return;
      }

      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className={`auth-card ${userInfo.gender === "male" ? "male-theme" : "female-theme"}`}>
        <h2>✨ Sign Up</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input className="auth-input" placeholder="First Name" value={userInfo.firstName} onChange={(e) => setField("firstName", e.target.value)} />
            <input className="auth-input" placeholder="Last Name" value={userInfo.lastName} onChange={(e) => setField("lastName", e.target.value)} />
            <input className="auth-input" placeholder="Email" value={userInfo.email} onChange={(e) => setField("email", e.target.value)} />
            <input className="auth-input" type="password" placeholder="Password" value={userInfo.password} onChange={(e) => setField("password", e.target.value)} />
            <input className="auth-input" placeholder="City" value={userInfo.city} onChange={(e) => setField("city", e.target.value)} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.email || !userInfo.password}>
                Next →
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2>🎂 Select Your Age</h2>
            <div className="options-grid">
              {["12–15", "16–18", "19–25", "26–35", "36+"].map((a) => (
                <div key={a} className={`option-card ${userInfo.age === a ? "active" : ""}`} onClick={() => setField("age", a)}>
                  {a}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.age}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
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
                <div key={o.value} className={`option-card ${userInfo.occasion === o.value ? "active" : ""}`} onClick={() => setField("occasion", o.value)}>
                  {o.label}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.occasion}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2>AI Decision?</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="next-btn" onClick={() => { setField("AI", "yes"); handleNext(); }}>Use AI</button>
              <button className="skip-btn" onClick={() => { setField("AI", "skipped"); handleNext(); }}>Skip</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
            </div>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h2>Gender</h2>
            <div className="options-grid">
              {["male", "female"].map((g) => (
                <div key={g} className={`option-card ${userInfo.gender === g ? "active" : ""}`} onClick={() => setField("gender", g)}>
                  {g === "male" ? "👔 Male" : "👗 Female"}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.gender}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <h2>Wardrobe</h2>
            <p style={{ marginBottom: 12 }}>Manage your outfits</p>
            <div className="wardrobe-actions">
              <button className="next-btn" onClick={() => { setField("wardrobe", "added"); handleNext(); }}>+ Add Outfit</button>
              <button className="next-btn" onClick={handleNext}>Next →</button>
              <button className="skip-btn" onClick={() => { setField("wardrobe", "skipped"); handleNext(); }}>Skip</button>
            </div>
            <div style={{ marginTop: 12 }}><button className="skip-btn" onClick={back}>← Back</button></div>
          </>
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <>
            <h2>🎨 Colors You Prefer</h2>
            <p>Select up to 3 colors</p>
            <div className="colors-grid">
              {["Red", "Black", "White", "Blue", "Pink", "Green"].map((c) => {
                const label =
                  c === "Black" ? "🖤 Black" :
                  c === "White" ? "🤍 White" :
                  c === "Red" ? "❤️ Red" :
                  c === "Blue" ? "💙 Blue" :
                  c === "Pink" ? "💗 Pink" : "💚 Green";
                const isSelected = userInfo.colors.includes(c);
                return (
                  <button key={c} className={`color-btn ${isSelected ? "selected" : ""}`} onClick={() => toggleColor(c)}>
                    {label}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={userInfo.colors.length === 0}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 8 */}
        {step === 8 && (
          <>
            <h2>🎭 Select Your Mood</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Casual 😌", "Elegant ✨", "Bold 🔥", "Soft 🌸", "Cute 🎀"].map((m) => (
                <button key={m} onClick={() => toggleField("mood", m)} style={{ background: userInfo.mood === m ? "#ffb6c1" : "#eee", padding: "10px 15px", border: "none", borderRadius: 5 }}>
                  {m}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.mood}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 9 */}
        {step === 9 && (
          <>
            <h2>💇‍♀️ Select Your Hair Color</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Black", "Brown", "Blonde", "Red", "Other"].map((c) => (
                <button key={c} onClick={() => toggleField("hairColor", c)} style={{ background: userInfo.hairColor === c ? "#ffb6c1" : "#eee", padding: "10px 15px", border: "none", borderRadius: 5 }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.hairColor}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 10 */}
        {step === 10 && (
          <>
            <h2>💇‍♂️ Select Your Hair Type</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Curly", "Wavy", "Straight", "Coily"].map((t) => (
                <button key={t} onClick={() => toggleField("hairType", t)} style={{ background: userInfo.hairType === t ? "#ffb6c1" : "#eee", padding: "10px 15px", border: "none", borderRadius: 5 }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.hairType}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 11 */}
        {step === 11 && (
          <>
            <h2>💄 Select Your Makeup</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Natural", "Glam", "Soft", "Cute", "Bold", "Smokey"].map((m) => (
                <button key={m} onClick={() => toggleField("makeup", m)} style={{ background: userInfo.makeup === m ? "#ffb6c1" : "#eee", padding: "10px 15px", border: "none", borderRadius: 5 }}>
                  {m}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.makeup}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 12 */}
        {step === 12 && (
          <>
            <h2>🎭 Select Your Skin Tone</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Fair", "Medium", "Dark", "Olive", "Caramel"].map((s) => (
                <button key={s} onClick={() => toggleField("skin", s)} style={{ background: userInfo.skin === s ? "#ffb6c1" : "#eee", padding: "10px 15px", border: "none", borderRadius: 5 }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.skin}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 13 */}
        {step === 13 && (
          <>
            <h2>👗 Add Your Wardrobe</h2>
            <p style={{ marginBottom: 12 }}>Add outfits you want to save to your profile</p>
            <WardrobeAdd addToParentWardrobe={handleAddWardrobe} currentWardrobe={userWardrobe} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={() => { setField("wardrobe", userWardrobe); next(); }}>Next →</button>
              <button className="skip-btn" onClick={() => { setField("wardrobe", []); next(); }}>Skip</button>
            </div>
          </>
        )}

        {/* STEP 14 */}
        {step === 14 && (
          <>
            <h2>✅ Finish Signup</h2>
            <input className="auth-input" type="text" placeholder="Rating (optional)" value={userInfo.rating} onChange={(e) => setField("rating", e.target.value)} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={back}>← Back</button>
              <button className="next-btn" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save & Finish Signup"}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}