import { useLenis } from "lenis/react";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTransition } from "./context/TransitionContext";

const ProjectsButton = ({ className, onClick, closeMenu }) => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  const { triggerExit } = useTransition();

  const scrollToProjects = useCallback(
    (e) => {
      e.preventDefault(); // Stop default anchor behavior

      // 1. Close Menu first
      if (closeMenu && typeof closeMenu === "function") {
        closeMenu();
      }

      // 2. Define the Scroll Logic
      const executeScroll = () => {
        // --- LOGIC: PREVENT SAME-PAGE ANIMATION ---
        const cleanPath = (p) => p.replace(/\/+$/, "") || "/";

        // Compare current location vs target path
        if (cleanPath(location.pathname) === cleanPath("/")) {
          console.log("Navigation prevented: Already on this path.");
          // =====================================
          // Smooth scrolling when in same path
          // =====================================
          const targetSelector = ".projects-section";
          const target = document.querySelector(targetSelector);
          if (!target || !lenis) return;

          // 1. Calculate Distance for Dynamic Duration
          const currentScroll = window.scrollY;
          const targetTop = target.getBoundingClientRect().top + currentScroll;
          const distance = Math.abs(targetTop - currentScroll);
          const calculatedDuration = Math.min(
            Math.max(distance / 1000, 1.8),
            2.5,
          );

          // 2. Execute Scroll
          lenis.resize();
          lenis.scrollTo(target, {
            offset: 0,
            duration: calculatedDuration,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            immediate: false,
            force: true,
            lock: false,
          });
          return;
        }

        // Define the actual navigation function
        const performNavigation = () => {
          if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
          }

          navigate("/", {
            state: { scrollTo: "projects" },
          });
        };
        // navigate("/", { state: { scrollTo: "projects" } });

        // --- CHECK FOR EXIT ANIMATION ---
        if (triggerExit) {
          triggerExit(() => {
            performNavigation();
          });
        } else {
          performNavigation();
        }

        // Execute any additional onClick handlers passed via props
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
    },
    [lenis, location.pathname, navigate, closeMenu, triggerExit, onClick],
  );

  return (
    <button type="button" onClick={scrollToProjects} className={className}>
      <p>Projects</p>
    </button>
  );
};

ProjectsButton.displayName = "ProjectsButton";
export default ProjectsButton;
