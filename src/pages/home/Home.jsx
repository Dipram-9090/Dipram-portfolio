import React, { useEffect, useCallback, Suspense, memo } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

import Hero from "./sections/hero/Hero";
import Marquee from "../../components/Marquee"; 
import LogoIcon from "../../components/iconComponents/LogoIcon";
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

// Global marquee items data
const defaultMarqueeItems = [
  'Interactive Experiences',
  'Design System',
  'UI/UX',
  'Web & App Design',
];

// ---------------------------------------------------------
// PRE-CONFIGURED MARQUEE WRAPPERS
// These keep the JSX incredibly clean and easy to read
// ---------------------------------------------------------
const BlueMarquee = () => (
  <Marquee 
    items={defaultMarqueeItems} bgColor="#5043FA" textColor="#ffffff" direction="left" Icon={LogoIcon} 
  />
);

const WhiteMarquee = () => (
  <Marquee 
    items={defaultMarqueeItems} bgColor="#ffffff" textColor="#5043FA" direction="right" Icon={LogoIcon} 
  />
);

// Reusable marquee pair using the wrappers
const MarqueePair = memo(() => (
  <>
    <div className="absolute lg:translate-y-15 md:translate-y-15 translate-y-10 lg:rotate-4 md:rotate-4 rotate-9 bottom-0 z-20 justify-start w-full">
      <BlueMarquee />
    </div>
    <div className="absolute translate-y-9 lg:-rotate-2 md:-rotate-2 -rotate-4 bottom-0 z-19 flex justify-end w-full">
      <WhiteMarquee />
    </div>
  </>
));
MarqueePair.displayName = "MarqueePair";

const Home = () => {
  const location = useLocation();
  const lenis = useLenis();

  // Stable callback
  const scrollToSection = useCallback(
    (selector) => {
      if (!lenis) return;
      const target = document.querySelector(selector);
      if (!target) return;

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
          <WhiteMarquee />
        </div>
      </div>

      {/* Logofolio */}
      <div className="w-full">
        <IndiProjectSection text="Logofolio" />
        <div className="flex justify-start w-full">
          <BlueMarquee />
        </div>
      </div>

      {/* Logo section */}
      <div className="w-full">
        <LogoSectionSimpler />
        <div className="flex justify-end w-full">
          <WhiteMarquee />
        </div>
      </div>

      {/* Posters */}
      <div className="w-full">
        <IndiProjectSection text="Posters" />
        <div className="flex justify-start w-full">
          <BlueMarquee />
        </div>
      </div>

      <Suspense fallback={<Loader fullScreen />}>
        <div className="w-full">
          <PosterSection />
          <div className="flex justify-end w-full">
            <WhiteMarquee />
          </div>
        </div>
      </Suspense>

      {/* Websites */}
      <div className="w-full">
        <IndiProjectSection text="Websites" />
        <div className="flex justify-start w-full">
          <BlueMarquee />
        </div>
      </div>

      <Suspense fallback={<Loader fullScreen />}>
        <div className="w-full">
          <WebsitesSection />
          <div className="w-full">
            <WhiteMarquee />
          </div>
        </div>
      </Suspense>

      <Contact />
      <Footer />
    </div>
  );
};

export default Home;