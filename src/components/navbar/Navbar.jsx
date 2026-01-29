import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons & Components
import Logo from "../iconComponents/Logo";
import Call from "../iconComponents/Call";
import ProjectsButton from "../ProjectsButton";
import ContactButton from "../ContactButton";
import AnimatedLink from "../animatedLink/AnimatedLink";
import BurgerMenu from "./burgerMenu/BurgerMenu"; // Fixed typo in path

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();

  // --- GSAP Animation: Hide/Show on Scroll (DESKTOP ONLY) ---
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Only run this animation on screens >= 1024px (Tailwind 'lg')
    mm.add("(min-width: 1024px)", () => {
      let lastDirection = -1;
      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          // Only animate if direction changes
          if (self.direction !== lastDirection) {
            lastDirection = self.direction;
            gsap.to(navRef.current, {
              yPercent: self.direction === 1 ? -100 : 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
        invalidateOnRefresh: true,
      });

      // Cleanup for this specific media query
      return () => trigger.kill();
    });
  }, [location.pathname]);
  // useGSAP(() => {
  //   let lastDirection = -1;
  //   const trigger = ScrollTrigger.create({
  //     trigger: document.body,
  //     start: 0,
  //     end: "max",
  //     onUpdate: (self) => {
  //       // Only animate if direction changes
  //       if (self.direction !== lastDirection) {
  //         lastDirection = self.direction;
  //         gsap.to(navRef.current, {
  //           yPercent: self.direction === 1 ? -100 : 0,
  //           duration: 0.3,
  //           ease: "power2.out",
  //         });
  //       }
  //     },
  //     invalidateOnRefresh: true,
  //   });
  // }, [location.pathname]);

  // --- GSAP Animation: Background Color Change ---
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top+=100 top",
      end: "bottom bottom",
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "transparent",
          duration: 0.5,
          ease: "power2.inOut",
        });
      },
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "white",
          duration: 0.5,
          ease: "power2.inOut",
        });
      },
      invalidateOnRefresh: true,
    });
    return () => trigger.kill();
  }, []);

  // const navLinks = [
  //   { path: "/", label: "Home" },
  //   { path: "/about", label: "About" },
  //   { path: "/services", label: "Services" },
  // ];

  const navLinkStyles =
    "cursor-pointer w-32 font-euclid text-base py-1 rounded-full text-center uppercase";

  return (
    <div
      ref={navRef}
      // Z-INDEX 2000 PRESERVED
      className="fixed top-0 left-0 right-0 z-2000 px-8 py-4 flex items-center justify-between"
    >
      {/* --- Logo --- */}
      <AnimatedLink
        to="/"
        className="w-48 flex items-center justify-start cursor-pointer"
      >
        <Logo size={152} textColor="black" />
      </AnimatedLink>

      {/* --- Desktop Nav Links (Hidden on Mobile) --- */}
      <div className="hidden lg:flex lg:w-160 items-center justify-between">
        {["Home", "About", "Services"].map((link) => {
          const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
          const isCurrentPage = location.pathname === path;
          return (
            <AnimatedLink
              key={link}
              to={path}
              className={`${navLinkStyles} ${isCurrentPage ? "text-white bg-[#5043FA] ring-2 ring-[#5043FA]" : "text-black hover:ring-2 transition-all duration-200"}`}
            >
              {link}
            </AnimatedLink>
          );
        })}

        <ProjectsButton className="cursor-pointer w-32 font-euclid text-base py-1 rounded-full text-center uppercase text-black hover:ring-2 transition-all duration-200" />
      </div>

      {/* --- Desktop CTA (Hidden on Mobile) --- */}
      <ContactButton className="hidden lg:flex w-48 items-center gap-2 cursor-pointer font-euclid text-base py-1.5 pl-6 pr-4 rounded-full bg-black text-white hover:bg-[#5043FA] duration-200">
        <p className="text-nowrap">LET&apos;S CONNECT</p>
        <Call width={24} height={24} color="white" />
      </ContactButton>

      {/* --- Mobile/Tablet Burger Menu (Hidden on Desktop) --- */}
      <div className="block lg:hidden">
        <BurgerMenu />
      </div>
    </div>
  );
};

export default Navbar;
