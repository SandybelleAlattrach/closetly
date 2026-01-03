import React, { useState } from "react";
import CameraPage from "./CameraPage";
import AiRating from "./AiRating";
import SelectionPage from "./SelectionPage";
import ThankYouPage from "./ThankYouPage";

function OutfitFlow() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [changes, setChanges] = useState(null);

  const handleCapture = (capturedImage) => {
    setImage(capturedImage);
    setStep(2); 
  };

  const handleRating = (liked) => {
    if (liked) {
      setStep(4); 
    } else {
      setStep(3); 
    }
  };

  const handleChanges = (selectedChanges) => {
    setChanges(selectedChanges);
    setStep(2); 
  };

  return (
    <div>
      {step === 1 && <CameraPage onCapture={handleCapture} />}
      {step === 2 && <AiRating image={image} onRating={handleRating} />}
      {step === 3 && <SelectionPage onNext={handleChanges} />}
      {step === 4 && <ThankYouPage />}
    </div>
  );
}

export default OutfitFlow;
