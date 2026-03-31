import Header from "./pages/Header";
// import HeroContent from "./pages/HeroContent";
import HeroSection from "./pages/HeroSection";
import { OurServices } from "./pages/OurServices";
import Contact from "./pages/Contact";
import BookDemoButton from "./pages/components/BookDemoButton";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      {/* Header remains visible on all routes */}
      <BookDemoButton />

      {/* Route outlet - different pages rendered by react-router */}
      <Routes>
        <Route path="/" element={<>
        <Header />        
        <HeroSection />
        </>} />
        {/* Home: keep the analytics anchors + HeroSection as before */}
        <Route
          path="/Analytics"
          element={
            <>
              <HeroSection />
            </>
          }
        />

        {/* Dedicated pages */}
        <Route path="/services" element={<OurServices />} />
        <Route path="/contact" element={<Contact />} />

        {/* Optional analytics route to jump to the hero view directly */}
        <Route path="/analytics" element={<HeroSection />} />

        {/* fallback to home for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
