import "./auth.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WardrobeAdd from "./WardrobeAdd";

const API = process.env.REACT_APP_API_URL || "http://localhost:10000";

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

  const handleAddWardrobe = (newOutfit) => {
    setUserWardrobe((prev) => [...prev, newOutfit]);
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleNext = () => {
    // if user is male skip the female-specific wardrobe collection (original logic)
    if (userInfo.gender === "male" && step === 7) {
      setStep(13);
      return;
    }
    next();
  };

  const toggleColor = (c) => {
    setUserInfo((prev) => {
      const isSelected = prev.colors.includes(c);
      let nextColors = isSelected ? prev.colors.filter((x) => x !== c) : [...prev.colors, c];
      if (nextColors.length > 3) nextColors = nextColors.slice(0, 3);
      return { ...prev, colors: nextColors };
    });
  };

  const toggleField = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: prev[field] === value ? "" : value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // ensure any added wardrobe is attached
      const payload = { ...userInfo, wardrobe: userWardrobe };

      console.log("Sending userInfo:", payload);

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

      localStorage.setItem("user", JSON.stringify(data.user));
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
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.email || !userInfo.password}>
                Next →
              </button>
            </div>
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
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>
                ← Back
              </button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.age}>
                Next →
              </button>
            </div>
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
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.occasion}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 4: AI decision */}
        {step === 4 && (
          <>
            <h2>AI Decision?</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="next-btn"
                onClick={() => {
                  setUserInfo({ ...userInfo, AI: "yes" });
                  handleNext();
                }}
              >
                Use AI
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
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
            </div>
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
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.gender}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 6: Wardrobe quick */}
        {step === 6 && (
          <>
            <h2>Wardrobe</h2>
            <p style={{ marginBottom: "12px" }}>Manage your outfits</p>
            <div className="wardrobe-actions">
              <button
                className="next-btn"
                onClick={() => {
                  // placeholder: open wardrobe modal later
                  setUserInfo({ ...userInfo, wardrobe: "added" });
                  handleNext();
                }}
              >
                + Add Outfit
              </button>

              <button className="next-btn" onClick={handleNext}>Next →</button>

              <button className="skip-btn" onClick={() => { setUserInfo({ ...userInfo, wardrobe: "skipped" }); handleNext(); }}>
                Skip
              </button>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
            </div>
          </>
        )}

        {/* STEP 7: Colors */}
        {step === 7 && (
          <>
            <h2>🎨 Colors You Prefer</h2>
            <p>Select up to 3 colors</p>
            <div className="colors-grid">
              {["Red", "Black", "White", "Blue", "Pink", "Green"].map((c) => {
                const label = c === "Black" ? "🖤 Black" : c === "White" ? "🤍 White" : c === "Red" ? "❤️ Red" : c === "Blue" ? "💙 Blue" : c === "Pink" ? "💗 Pink" : "💚 Green";
                const isSelected = userInfo.colors.includes(c);
                return (
                  <button
                    key={c}
                    className={`color-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleColor(c)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={userInfo.colors.length === 0}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 8: Mood */}
        {step === 8 && (
          <>
            <h2>🎭 Select Your Mood</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Casual 😌", "Elegant ✨", "Bold 🔥", "Soft 🌸", "Cute 🎀"].map((m) => (
                <button
                  key={m}
                  onClick={() => toggleField("mood", m)}
                  style={{ background: userInfo.mood === m ? "#ffb6c1" : "#eee", padding: "10px 15px", border: "none", borderRadius: 5 }}
                >
                  {m}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.mood}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 9: Hair Color */}
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
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.hairColor}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 10: Hair Type */}
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
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.hairType}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 11: Makeup */}
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
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.makeup}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 12: Skin */}
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
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleNext} disabled={!userInfo.skin}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 13: Add wardrobe (detailed) */}
        {step === 13 && (
          <>
            <h2>👗 Add Your Wardrobe</h2>
            <p style={{ marginBottom: 12 }}>Add outfits you want to save to your profile</p>
            <WardrobeAdd addToParentWardrobe={handleAddWardrobe} currentWardrobe={userWardrobe} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={() => { setUserInfo({ ...userInfo, wardrobe: userWardrobe }); next(); }}>
                Next →
              </button>
              <button className="skip-btn" onClick={() => { setUserInfo({ ...userInfo, wardrobe: [] }); next(); }}>
                Skip
              </button>
            </div>
          </>
        )}

        {/* STEP 14: Finish and submit */}
        {step === 14 && (
          <>
            <h2>✅ Finish Signup</h2>
            <input
              className="auth-input"
              type="text"
              placeholder="Rating (optional)"
              value={userInfo.rating}
              onChange={(e) => setUserInfo({ ...userInfo, rating: e.target.value })}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="skip-btn" onClick={prev}>← Back</button>
              <button className="next-btn" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save & Finish Signup"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}