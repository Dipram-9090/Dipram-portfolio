import { useLenis } from "lenis/react";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTransition } from "./context/TransitionContext";

const ContactButton = ({ className, onClick, children, closeMenu }) => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerExit } = useTransition();

  const scrollToContact = useCallback((e) => {
    e.preventDefault();

    // 1. Close Menu first
    if (closeMenu && typeof closeMenu === "function") {
      closeMenu();
    }
 
    // 2. Define the Scroll Logic
    const executeScroll = () => {
      const cleanPath = (p) => p.replace(/\/+$/, "") || "/";

      // If we are on the homepage, Scroll.
      if (cleanPath(location.pathname) === cleanPath("/")) {
        const targetSelector = ".contact-section";
        const target = document.querySelector(targetSelector);
        
        if (!target || !lenis) return;

        // Force Lenis to recalculate bounds since the menu just closed
        lenis.resize(); 

        const currentScroll = window.scrollY;
        const targetTop = target.getBoundingClientRect().top + currentScroll;
        const distance = Math.abs(targetTop - currentScroll);
        const calculatedDuration = Math.min(
          Math.max(distance / 1000, 1.8),
          2.5
        );

        lenis.scrollTo(target, {
          offset: 0,
          duration: calculatedDuration,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          immediate: false,
          force: true,
          lock: false,
        });
      } else {
        // If not on homepage, Navigate.
        const performNavigation = () => {
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
          navigate("/", { state: { scrollTo: "contact" } });
        };

        if (triggerExit) {
          triggerExit(performNavigation);
        } else {
          performNavigation();
        }
      }

      // Run any extra onClick props
      if (onClick) onClick(e);
    };

    // 3. THE FIX: Add a delay if closing the menu.
    // If the menu is closing, we wait 100ms for Lenis to restart.
    // If no menu is involved (desktop), we scroll immediately.
    if (closeMenu) {
      setTimeout(() => {
        executeScroll();
      }, 100); 
    } else {
      executeScroll();
    }

  }, [lenis, location.pathname, navigate, closeMenu, triggerExit, onClick]);

  return (
    <button type="button" onClick={scrollToContact} className={className}>
      {children}
    </button>
  );
};

ContactButton.displayName = "ContactButton";
export default ContactButton;