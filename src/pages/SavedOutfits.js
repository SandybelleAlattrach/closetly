import { useNavigate } from "react-router-dom";

function SavedOutfits() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h2>💖 Your Saved Outfits</h2>
      <p>No outfits yet — you can still continue ✨</p>

      <button onClick={() => nav("/mood")}>
        Next
      </button>
    </div>
  );
}

export default SavedOutfits;

