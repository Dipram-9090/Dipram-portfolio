import React from "react";
import Logo from "./iconComponents/Logo";
import LinkedInIcon from "./iconComponents/LinkedInIcon";
import BehanceIcon from "./iconComponents/BehanceIcon";
import CallFooterIcon from "./iconComponents/CallFooterIcon";
import MailIcon from "./iconComponents/MailIcon";
import ProjectsButton from "./ProjectsButton";
import AnimatedLink from "./animatedLink/AnimatedLink";
import ContactButton from "../components/ContactButton";

const Footer = () => {
  const navLinkStyles =
    "cursor-pointer font-euclid font-medium text-lg w-full hover:text-[#5043FA] text-left";
  return (
    <div className="overflow-hidden bg-[white] px-5 pt-10 lg:px-10 lg:pt-10 min-h-screen w-full flex flex-col items-center justify-between font-euclid text-black">
      {/* TOP SECTION: Split into Left (Info) and Right (Links/Contact) */}
      <div className="flex flex-col lg:flex-row justify-between w-full h-auto lg:h-1/2 gap-12 lg:gap-0">
        {/* LEFT COLUMN: Logo & About */}
        {/* Mobile: w-full, Desktop: w-1/4 */}
        <div className="w-full lg:w-1/4 h-full flex flex-col gap-6">
          <Logo size={200} />
          <div className="flex flex-col gap-3">
            <h4 className="font-bebas font-medium text-2xl">About Me</h4>
            <p className="font-euclid text-base w-full lg:w-[90%]">
              Designing product interfaces, brand systems and visual
              communication-focused on clarity, consistency and long-term
              usability.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bebas font-medium text-2xl">Follow Me</h4>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/dipram-biswas" target="blank">
                <LinkedInIcon color="black" width={30} height={30} />
              </a>
              <a href="https://www.behance.net/diprambiswas9090" target="blank">
                <BehanceIcon color="black" width={30} height={30} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT GROUP WRAPPER: Navigation, Location, Contact */}
        {/* Mobile: flex-col, Desktop: flex-row */}
        <div className="flex flex-col lg:flex-row gap-10 w-full lg:w-auto">
          {/* COLUMN 1: Navigation */}
          <div className="w-full lg:w-60 h-full flex flex-col gap-6">
            <h3 className="font-bebas font-medium lg:text-4xl md:text-3xl text-2xl">
              Navigation Links
            </h3>
            <div className="flex flex-col gap-2 lg:gap-4">
              <AnimatedLink to="/" className={navLinkStyles}>
                Home
              </AnimatedLink>
              <AnimatedLink to="/about" className={navLinkStyles}>
                About
              </AnimatedLink>
              <AnimatedLink to="/services" className={navLinkStyles}>
                Services
              </AnimatedLink>
              <ProjectsButton className={navLinkStyles} />
              <ContactButton className={navLinkStyles}>Contact</ContactButton>
            </div>
          </div>

          {/* COLUMN 2: Location */}
          <div className="w-full lg:w-60 h-full flex flex-col gap-6">
            <h3 className="font-bebas font-medium lg:text-4xl md:text-3xl text-2xl">
              Location
            </h3>
            <p className="font-euclid text-base">
              Based out of Kolkata, West Bengal, India
            </p>
          </div>

          {/* COLUMN 3: Contact */}
          <div className="w-full lg:w-60 h-full flex flex-col gap-6">
            <h1 className="font-bebas font-medium lg:text-4xl md:text-3xl text-2xl">
              Contact Me
            </h1>
            <div className="w-full flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <CallFooterIcon color="black" />
                <p>+ 91 923 269 6735</p>
              </div>
              <div className="flex gap-3 items-center">
                <MailIcon color="black" />
                <p>dipramb9090@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TEXT: Scales automatically with VW */}
      <h1 className="leading-[21vw] font-euclid font-medium text-[26vw] select-none mt-10 lg:mt-0">
        DIPRAM
      </h1>
    </div>
  );
};

export default Footer;
