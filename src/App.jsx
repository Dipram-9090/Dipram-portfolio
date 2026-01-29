import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import ScrollBar from "./components/ScrollBar";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Navbar from "./components/navbar/Navbar";
import GoToTop from "./components/GoToTop";
import InvertedCursor from "./components/invertedCursor/InvertedCursor";
import Projects from "./pages/home/sections/projects/Projects";
import Footer from "./components/Footer";
import ErrorPage from "./pages/error/ErrorPage";


const AppContent = () => {
  const lenis = useLenis();
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      lenis?.scrollTo(0, { immediate: true });
    });
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;

    const onKeyDown = (e) => {
      const keys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
      ];
      if (!keys.includes(e.key)) return;

      e.preventDefault();

      const scrollAmount = window.innerHeight * 0.8;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        lenis.scrollTo(lenis.scroll + scrollAmount, { duration: 1.2 });
      }

      if (e.key === "ArrowUp" || e.key === "PageUp") {
        lenis.scrollTo(lenis.scroll - scrollAmount, { duration: 1.2 });
      }

      if (e.key === "Home") {
        lenis.scrollTo(0, { duration: 1.4 });
      }

      if (e.key === "End") {
        lenis.scrollTo(document.body.scrollHeight, { duration: 1.4 });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    if (location.state?.scrollTo === "projects") {
      requestAnimationFrame(() => {
        const el = document.querySelector(".projects-section");
        el && lenis.scrollTo(el.offsetTop, { immediate: true });
      });
    }
  }, [location, lenis]);

  return (
    <>
      <InvertedCursor />
      {/* <ScrollToTop lenis={lenis} /> */}
      <ScrollBar />
      <Navbar lenis={lenis} />
      <GoToTop lenis={lenis} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

const App = () => {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        smoothTouch: true,
        syncTouch: false,
        touchMultiplier: 1.5,
        wheelMultiplier: 1.5,
      }}
    >
      <AppContent />
    </ReactLenis>
  );
};

export default App;
