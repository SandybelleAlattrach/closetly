import { useNavigate } from "react-router-dom";

function ViewWardrobe() {
  const nav = useNavigate();

  return (
    <div className="page">
      <h2>Your Saved Outfits</h2>
      <p>No outfits? No problem.</p>

      <button onClick={() => nav("/mood")}>Next</button>
    </div>
  );
}

export default ViewWardrobe;
