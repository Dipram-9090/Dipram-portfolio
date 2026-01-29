import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
// Import Context safely
import { useTransition } from "../context/TransitionContext";

const AnimatedLink = ({ to, children, className, onClick, ...props }) => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  // SAFEGUARD: Check if context exists before destructuring
  const transitionContext = useTransition();
  const triggerExit = transitionContext ? transitionContext.triggerExit : null;

  const handleNavClick = (e) => {
    e.preventDefault();

    const cleanPath = (p) => p.replace(/\/+$/, "") || "/";
    if (cleanPath(location.pathname) === cleanPath(to)) return;

    const performNavigation = () => {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      navigate(to, { state: { resetAnimation: Date.now() } });
    };

    // Only run exit animation if the function actually exists
    if (triggerExit) {
      triggerExit(() => performNavigation());
    } else {
      performNavigation();
    }

    if (onClick) onClick(e);
  };

  return (
    <a href={to} onClick={handleNavClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default AnimatedLink;
