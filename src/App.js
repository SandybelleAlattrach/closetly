import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Features from "./pages/feautures";
import Wardrobe from "./pages/wardrobe";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
