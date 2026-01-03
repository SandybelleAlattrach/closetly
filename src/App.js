import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Features from "./pages/features.js";
import WardrobeAdd from "./pages/WardrobeAdd";
import Wardrobe from "./pages/Wardrobe";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import AgeSelection from "./pages/AgeSelection";
import Occasion from "./pages/occasion";
import AISuggestion from "./pages/AISuggestion";
import AIOutfitGenerator from "./pages/AIOutfitGenerator";
import GenderSelection from "./pages/GenderSelection";
import AddLocation from "./pages/AddLocation";
import ColorPreference from "./pages/ColorPreference";
import MoodSelection from "./pages/MoodSelection";
import HairType from "./pages/HairType";
import HairColor from "./pages/HairColor";
import MakeupType from "./pages/MakeupType";
import SkinTone from "./pages/SkinTone";
import SavedOutfits from "./pages/SavedOutfits";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/age" element={<AgeSelection />} />
        <Route path="/occasion" element={<Occasion />} />
        <Route path="/ai-suggestion" element={<AISuggestion />} />
        <Route path="/ai-generator" element={<AIOutfitGenerator />} />
        <Route path="/gender" element={<GenderSelection />} />
        <Route path="/location" element={<AddLocation />} />
        <Route path="/color-preference" element={<ColorPreference />} />
        <Route path="/mood" element={<MoodSelection />} />
        <Route path="/hair-type" element={<HairType />} />
        <Route path="/hair-color" element={<HairColor />} />
        <Route path="/makeup" element={<MakeupType />} />
        <Route path="/skin-tone" element={<SkinTone />} />
        <Route path="/add-outfit" element={<WardrobeAdd />} />
        <Route path="/Wardrobe" element={<Wardrobe />} />
        <Route path="/saved-outfits" element={<SavedOutfits />} />
        <Route path="/Forgot-Password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
