import { useState } from "react";

function Organize() {
  const [image, setImage] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    generateSuggestion("red");
  };

  const generateSuggestion = () => {
    const options = [
      "Black pants + white sneakers",
      "Blue jeans + black boots",
      "White skirt + nude shoes",
    ];

    setSuggestion(options[Math.floor(Math.random() * options.length)]);
  };

  return (
    <div>
      <h2>Upload your clothes</h2>
      <input type="file" onChange={handleUpload} />

      {image && <img src={image} width="200" alt="" />}

      {suggestion && (
        <>
          <p>{suggestion}</p>
          <button onClick={() => alert("Saved")}>Yes</button>
          <button onClick={generateSuggestion}>No</button>
        </>
      )}
    </div>
  );
}

export default Organize;
