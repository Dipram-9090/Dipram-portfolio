import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { useTransition } from "../context/TransitionContext";

const AnimatedLink = ({ to, children, className, onClick, ...props }) => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  const { triggerExit } = useTransition();

  const handleNavClick = (e) => {
    e.preventDefault(); // Stop default anchor behavior

    // --- LOGIC: PREVENT SAME-PAGE ANIMATION ---
    const cleanPath = (p) => p.replace(/\/+$/, "") || "/";

    // Compare current location vs target path
    if (cleanPath(location.pathname) === cleanPath(to)) {
      console.log("Navigation prevented: Already on this path.");
      return;
    }

    // Define the actual navigation function
    const performNavigation = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }

      navigate(to, {
        state: { resetAnimation: Date.now() },
      });
    };

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

  return (
    <a href={to} onClick={handleNavClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default AnimatedLink;
