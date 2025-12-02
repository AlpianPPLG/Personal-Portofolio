import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { BackToTop } from "./components/ui/BackToTop";
import { SEOHead } from "./components/ui/SEO";
import ProfessionalSplashScreen from "./components/ui/ProfessionalSplashScreen";
import { useSplashScreen } from "./hooks/useSplashScreen";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const { showSplash, handleSplashFinish, duration } = useSplashScreen({
    duration: 4500,
    minDisplayTime: 3000,
    showOnFirstVisit: false // Set to true if you want splash only on first visit
  });

  // Define assets to preload
  const preloadAssets = {
    images: [
      '/public/img/Foto.jpg',
      '/public/img/Porto1.png',
      '/public/img/Porto2.png',
      '/public/img/Porto3.png',
      '/public/img/Porto4.png',
      '/public/img/Porto5.png',
      '/public/img/Porto6.png'
    ],
    fonts: [
      'Inter',
      'JetBrains Mono',
      'Poppins'
    ]
  };

  return (
    <>
      <SEOHead
        title="Alpian Portfolio - Full Stack Developer & UI/UX Designer"
        description="Professional portfolio showcasing full-stack development projects, UI/UX designs, and creative web solutions by Alpian. Expert in React, TypeScript, Node.js, and modern web technologies."
        keywords={[
          'Alpian Portfolio', 'Full Stack Developer', 'UI/UX Designer',
          'React Developer', 'TypeScript', 'Node.js', 'Web Development',
          'Frontend Developer', 'Backend Developer', 'JavaScript', 'Portfolio'
        ]}
        image="/public/img/Foto.jpg"
        type="website"
        author="Alpian"
      />

      <AnimatePresence mode="wait">
        {showSplash && (
          <ProfessionalSplashScreen
            key="splash"
            onFinish={handleSplashFinish}
            duration={duration}
            variant="tech" // Options: 'corporate', 'creative', 'tech', 'elegant'
            preloadAssets={preloadAssets}
          />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="App">
          <Navbar />
          <Hero />
          <Outlet />
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}

export default App;
