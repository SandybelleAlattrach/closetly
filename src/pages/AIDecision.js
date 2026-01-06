import { useNavigate } from "react-router-dom";
import "./auth.css";

function AIDecision() {
  const navigate = useNavigate();

  const handleNext = () => {
  console.log("Navigating to AI Preview...");
  localStorage.setItem("AI", "yes");
  navigate("/ai-preview");
};

  const handleSkip = () => {
    localStorage.setItem("AI", "skipped");
    navigate("/gender");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>AI Decision?</h2>

        <div style={{ height: "25px" }} />

        <button className="next-btn" onClick={handleNext}>
          Next →
        </button>

        <div style={{ height: "15px" }} />

        <button className="skip-btn" onClick={handleSkip}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default AIDecision;
