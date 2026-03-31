// hooks/useResponsiveSize.js
import { useState, useEffect } from "react";

const useResponsiveSize = () => {
  const getSize = () => {
    const w = window.innerWidth;
    if (w < 768) return "sm";
    if (w < 1024) return "md";
    return "lg";
  };

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const handler = () => setSize(getSize());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
};

export default useResponsiveSize;