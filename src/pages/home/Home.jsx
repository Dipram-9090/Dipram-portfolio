import React, { useEffect, useCallback, Suspense, memo } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

import Hero from "./sections/hero/Hero";
import MarqueeBlue from "../../components/marquee/MarqueeBlue";
import MarqueeWhite from "../../components/marquee/MarqueeWhite";
import AboutPreview from "./sections/about/AboutPreview";
import ServicesPreview from "./sections/servicesPreview/ServicesPreview";
import Projects from "./sections/projects/Projects";
import ScrollBackgroundChange from "../../components/ScrollBackgroundChange";
import IndiProjectSection from "../../components/indiProjectSection/IndiProjectSection";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import Contact from "./sections/contact/Contact";
import LogoSectionSimpler from "./sections/logoSection/LogoSectionSimpler";

// Lazy-loaded heavy sections
const WebsitesSection = React.lazy(
  () => import("./sections/websites/WebsitesSections")
);
const PosterSection = React.lazy(
  () => import("./sections/posterSection/PosterSection")
);

// Stable outside component — no re-allocation on renders
const SCROLL_SELECTORS = {
  projects: ".projects-section",
  contact: ".contact-section",
};

// Reusable marquee pair to avoid duplicated JSX
const MarqueePair = memo(() => (
  <>
    <div className="absolute lg:translate-y-15 md:translate-y-15 translate-y-10 lg:rotate-4 md:rotate-4 rotate-9 bottom-0 z-20 justify-start w-full">
      <MarqueeBlue />
    </div>
    <div className="absolute translate-y-9 lg:-rotate-2 md:-rotate-2 -rotate-4 bottom-0 z-19 flex justify-end w-full">
      <MarqueeWhite />
    </div>
  </>
));
MarqueePair.displayName = "MarqueePair";

const Home = () => {
  const location = useLocation();
  const lenis = useLenis();

  // Stable callback — only recreated if lenis instance changes
  const scrollToSection = useCallback(
    (selector) => {
      if (!lenis) return;
      const target = document.querySelector(selector);
      if (!target) return;

      // Clear navigation state immediately so a back-navigation doesn't re-trigger
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        lenis.resize();
        lenis.scrollTo(target, { immediate: true, force: true });
      }, 100);

      return timer;
    },
    [lenis]
  );

  useEffect(() => {
    const scrollType = location.state?.scrollTo;
    const selector = SCROLL_SELECTORS[scrollType];
    if (!selector) return;

    const timer = scrollToSection(selector);
    // Cleanup: cancel the timeout if the component unmounts before 100ms
    return () => clearTimeout(timer);
  }, [location.state, scrollToSection]);

  ScrollBackgroundChange();

  return (
    <div className="w-full overflow-hidden">
      {/* Hero */}
      <div className="relative w-full">
        <Hero />
        <MarqueePair />
      </div>

      {/* About */}
      <div className="relative w-full">
        <AboutPreview />
        <MarqueePair />
      </div>

      {/* Services */}
      <div className="js-color-stop" data-background-color="rgb(19,19,19)">
        <ServicesPreview />
      </div>

      {/* Projects */}
      <div className="js-color-stop" data-background-color="rgb(255,255,255)">
        <Projects />
        <div className="flex justify-end w-full">
          <MarqueeWhite />
        </div>
      </div>

      {/* Logofolio */}
      <div className="w-full">
        <IndiProjectSection text="Logofolio" />
        <div className="flex justify-start w-full">
          <MarqueeBlue />
        </div>
      </div>

      {/* Logo section */}
      <div className="w-full">
        <LogoSectionSimpler />
        <div className="flex justify-end w-full">
          <MarqueeWhite />
        </div>
      </div>

      {/* Posters */}
      <div className="w-full">
        <IndiProjectSection text="Posters" />
        <div className="flex justify-start w-full">
          <MarqueeBlue />
        </div>
      </div>

      <Suspense fallback={<Loader fullScreen />}>
        <div className="w-full">
          <PosterSection />
          <div className="flex justify-end w-full">
            <MarqueeWhite />
          </div>
        </div>
      </Suspense>

      {/* Websites */}
      <div className="w-full">
        <IndiProjectSection text="Websites" />
        <div className="flex justify-start w-full">
          <MarqueeBlue />
        </div>
      </div>

      <Suspense fallback={<Loader fullScreen />}>
        <div className="w-full">
          <WebsitesSection />
          <div className="flex justify-end w-full">
            <MarqueeWhite />
          </div>
        </div>
      </Suspense>

      <Contact />
      <Footer />
    </div>
  );
};

export default Home;