import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function CameraPage({ onCapture }) {
  const webcamRef = useRef(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState(null);

  
  const videoConstraints = {
    width: 350,
    height: 400,
    facingMode: "user",
  };

   const handleAllow = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasAccess(true))
      .catch((err) => setError("Camera access denied"));
  };

  
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc); 
    }
  };

  return (
    <div className="camera-page" style={{ textAlign: "center" }}>
      {!hasAccess ? (
        <div>
          <h2>Do you want to allow camera access?</h2>
          <button onClick={handleAllow}>Allow Camera</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ borderRadius: "10px", marginTop: "20px" }}
          />
          <div style={{ marginTop: "20px" }}>
            <button onClick={capturePhoto}>Capture Outfit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraPage;
