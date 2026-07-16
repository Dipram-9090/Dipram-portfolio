import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

// Components & Icons
import AnimatedLink from "../../animatedLink/AnimatedLink";
import Logo from "../../iconComponents/Logo";
import Call from "../../iconComponents/Call";
import ProjectsButton from "../../ProjectsButton";
import ContactButton from "../../ContactButton";
import BehanceIcon from "../../iconComponents/BehanceIcon";
import LinkedInIcon from "../../iconComponents/LinkedInIcon";
import GitHubIcon from "../../iconComponents/GitHubIcon"; // ← added
import { useLocation } from "react-router-dom";

const BurgerMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const lenis = useLenis();
  const location = useLocation();

  const closeMenu = () => setIsActive(false);

  useEffect(() => {
    if (isActive) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isActive, lenis]);

  // ↓ reduced sizes
  const navLinkStyles =
    "cursor-pointer font-euclid text-3xl md:text-4xl py-1 w-full text-center uppercase block";

  const menuVars = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.3, ease: [0.12, 0, 0.39, 0] },
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.3, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] },
    },
    open: {
      y: 0,
      transition: { ease: [0, 0.55, 0.45, 1], duration: 0.3 },
    },
  };

  return (
    <div>
      {/* Toggle Button */}
      <div
        onClick={() => setIsActive(!isActive)}
        className="relative z-2001 w-12 h-12 rounded-full cursor-pointer group"
      >
        <motion.div
          animate={{
            top: isActive ? "50%" : "40%",
            rotate: isActive ? 45 : 0,
            y: isActive ? "-50%" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-[50%] -translate-x-[50%] h-[0.2rem] w-6 bg-[#5043FA] rounded-full origin-center"
        />
        <motion.div
          animate={{
            top: isActive ? "50%" : "60%",
            rotate: isActive ? -45 : 0,
            y: isActive ? "-50%" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-[50%] -translate-x-[50%] h-[0.2rem] w-6 bg-[#5043FA] rounded-full origin-center"
        />
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-dvh bg-white origin-top z-1999 p-8 overflow-y-auto"
            onTouchMove={(e) => e.preventDefault()}
          >
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col justify-between w-full min-h-full"
            >
              {/* Header / Logo */}
              <div className="flex justify-between items-start overflow-hidden shrink-0">
                <motion.div variants={mobileLinkVars}>
                  <AnimatedLink
                    to="/"
                    className="flex items-center justify-center cursor-pointer"
                    onClick={closeMenu}
                  >
                    <Logo size={152} textColor="black" />
                  </AnimatedLink>
                </motion.div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col w-full gap-5 md:gap-6 items-center justify-center my-8">
                {["Home", "About", "Services"].map((link) => {
                  const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
                  const isCurrentPage = location.pathname === path;
                  return (
                    <div key={link} className="overflow-hidden w-full">
                      <motion.div variants={mobileLinkVars}>
                        <AnimatedLink
                          to={path}
                          className={`${navLinkStyles} ${isCurrentPage ? "text-[#5043FA]" : "text-black"}`}
                          onClick={closeMenu}
                        >
                          {link}
                        </AnimatedLink>
                      </motion.div>
                    </div>
                  );
                })}

                {/* Projects Button */}
                <div className="overflow-hidden">
                  <motion.div
                    variants={mobileLinkVars}
                    className="w-full flex justify-start"
                  >
                    <ProjectsButton
                      closeMenu={closeMenu}
                      className={navLinkStyles}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Socials & Footer */}
              <div className="flex flex-col gap-5 shrink-0">
                {/* Social Icons */}
                <div className="flex items-center justify-center gap-6">
                  <div className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <a href="https://www.behance.net/diprambiswas9090" target="_blank" rel="noreferrer" onClick={closeMenu}>
                        <BehanceIcon width={40} height={40} />
                      </a>
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <a href="https://www.linkedin.com/in/dipram-biswas" target="_blank" rel="noreferrer" onClick={closeMenu}>
                        <LinkedInIcon width={40} height={40} />
                      </a>
                    </motion.div>
                  </div>
                  {/* ← GitHub icon added */}
                  <div className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <a href="https://github.com/Dipram-9090" target="_blank" rel="noreferrer" onClick={closeMenu}>
                        <GitHubIcon width={40} height={40} />
                      </a>
                    </motion.div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 items-center">
                  {/* Resume button ← added */}
                  <div className="overflow-hidden w-full">
                    <motion.div
                      variants={mobileLinkVars}
                      className="w-full flex justify-center"
                    >
                      <a
                        href="/pdf/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMenu}
                        className="w-full flex items-center justify-center gap-2 cursor-pointer font-euclid text-lg md:text-xl py-3 px-6 rounded-full border-2 border-black text-black hover:border-[#5043FA] hover:text-[#5043FA] duration-200"
                      >
                        <p className="whitespace-nowrap uppercase">View Résumé</p>
                      </a>
                    </motion.div>
                  </div>

                  {/* Connect button */}
                  <div className="overflow-hidden w-full">
                    <motion.div
                      variants={mobileLinkVars}
                      className="w-full flex justify-center items-center"
                    >
                      <ContactButton
                        closeMenu={closeMenu}
                        className="w-full flex items-center justify-center gap-2 cursor-pointer font-euclid text-lg md:text-xl py-3 pl-6 pr-4 rounded-full bg-black text-white hover:bg-[#5043FA] duration-200"
                      >
                        <p className="whitespace-nowrap">LET&apos;S CONNECT</p>
                        <Call width={28} height={28} color="white" />
                      </ContactButton>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurgerMenu;
