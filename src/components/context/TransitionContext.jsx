// src/context/TransitionContext.js
import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [triggerExit, setTriggerExit] = useState(null);

  const registerExitAnimation = (callback) => {
    setTriggerExit(() => callback);
  };

  return (
    <TransitionContext.Provider value={{ triggerExit, registerExitAnimation }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);