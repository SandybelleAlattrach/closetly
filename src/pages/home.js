import React from "react";
import out1 from "../assets/out1.png";
import out2 from "../assets/out2.png";
import out3 from "../assets/out3.png";
import "./home.css"; 

function Home() {
  return (
    <main className="home">

      
      <section className="hero">
        <h1>Your Stylish Digital Wardrobe</h1>
        <p>Plan outfits, organize clothes, and shine every day with AI.</p>
        <button className="hero-btn">Start Organizing</button>
      </section>

      
      <section className="gallery-section">
        <div className="outfit-preview">
          <img src={out1} alt="Outfit 1" className="outfit-img" />
          <img src={out2} alt="Outfit 2" className="outfit-img" />
          <img src={out3} alt="Outfit 3" className="outfit-img" />
        </div></section>

      <section className="features-section">
        <div className="feature-row">
          <div className="feature-card">
            <h3>Smart Outfit Suggestions ⭐</h3>
            <p>AI picks the best outfit based on your style.</p>
          </div>

          <div className="feature-card">
            <h3>Wardrobe Management 👗</h3>
            <p>Upload and organize your clothes easily.</p>
          </div>

          <div className="feature-card">
            <h3>Aesthetic Closet ❤️</h3>
            <p>Everything looks clean, soft, and feminine.</p>
          </div>
        </div>
  </section>  

    </main>
  );
}

export default Home;