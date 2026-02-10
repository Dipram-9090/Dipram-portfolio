import Logo from "./iconComponents/Logo";
import LinkedInIcon from "./iconComponents/LinkedInIcon";
import BehanceIcon from "./iconComponents/BehanceIcon";
import CallFooterIcon from "./iconComponents/CallFooterIcon";
import MailIcon from "./iconComponents/MailIcon";
import ProjectsButton from "./ProjectsButton";
import AnimatedLink from "./animatedLink/AnimatedLink";
import ContactButton from "../components/ContactButton";
import DIPRAMbgSVG from "./DIPRAMbgSVG";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  // Added 'transition-colors' for smooth hover effect
  const navLinkStyles =
    "cursor-pointer font-euclid font-medium text-lg w-full text-left group-hover:text-[#5043FA] transition-colors duration-200";

  return (
    <div className="overflow-hidden bg-[white] pt-10 lg:pt-10 min-h-screen w-full flex flex-col items-center justify-between gap-5 font-euclid text-black">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row justify-between w-full h-auto lg:h-1/2 gap-12 lg:gap-0 px-5">
        {/* LEFT COLUMN */}
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
              <a
                href="https://www.linkedin.com/in/dipram-biswas"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 flex items-center justify-center w-8 h-8 hover:scale-110 transition-transform"
              >
                <LinkedInIcon color="black" width="2rem" height="2rem" />
              </a>
              <a
                href="https://www.behance.net/diprambiswas9090"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 flex items-center justify-center w-8 h-8 hover:scale-110 transition-transform"
              >
                <BehanceIcon color="black" width="2rem" height="2rem" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT GROUP WRAPPER */}
        <div className="flex flex-col lg:flex-row gap-10 w-full lg:w-auto">
          {/* COLUMN 1: Navigation */}
          <div className="w-full lg:w-60 h-full flex flex-col gap-6">
            <h3 className="font-bebas font-medium lg:text-4xl md:text-3xl text-2xl">
              Navigation Links
            </h3>
            <div className="flex flex-col gap-2 lg:gap-4">
              
              {/* LINK 1: Home */}
              {/* Added 'group' here so hovering the container affects both Arrow and Text */}
              <div className="flex gap-2 items-center group cursor-pointer">
                <ArrowRight 
                  size={25} 
                  strokeWidth={2} 
                  className="text-black group-hover:text-[#5043FA] group-hover:-rotate-45 transition-all duration-200" 
                />
                <AnimatedLink to="/" className={navLinkStyles}>
                  Home
                </AnimatedLink>
              </div>

              {/* LINK 2: About */}
              <div className="flex gap-2 items-center group cursor-pointer">
                <ArrowRight 
                  size={25} 
                  strokeWidth={2} 
                  className="text-black group-hover:text-[#5043FA] group-hover:-rotate-45 transition-all duration-200"
                />
                <AnimatedLink to="/about" className={navLinkStyles}>
                  About
                </AnimatedLink>
              </div>

              {/* LINK 3: Services */}
              <div className="flex gap-2 items-center group cursor-pointer">
                <ArrowRight 
                  size={25} 
                  strokeWidth={2} 
                  className="text-black group-hover:text-[#5043FA] group-hover:-rotate-45 transition-all duration-200"
                />
                <AnimatedLink to="/services" className={navLinkStyles}>
                  Services
                </AnimatedLink>
              </div>

              {/* LINK 4: Projects */}
              <div className="flex gap-2 items-center group cursor-pointer">
                <ArrowRight 
                  size={25} 
                  strokeWidth={2} 
                  className="text-black group-hover:text-[#5043FA] group-hover:-rotate-45 transition-all duration-200"
                />
                <ProjectsButton className={navLinkStyles} />
              </div>

              {/* LINK 5: Contact */}
              <div className="flex gap-2 items-center group cursor-pointer">
                <ArrowRight 
                  size={25} 
                  strokeWidth={2} 
                  className="text-black group-hover:text-[#5043FA] group-hover:-rotate-45 transition-all duration-200"
                />
                <ContactButton className={navLinkStyles}>Contact</ContactButton>
              </div>
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

          {/* COLUMN 3: Contact Info */}
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

      <div className="w-full h-full">
        {/* MIDDLE TEXT */}
        <DIPRAMbgSVG
          width="full"
          height="full"
          className="px-5 pb-5 hidden lg:block"
        />

        {/* BOTTOM COPYRIGHT TEXT */}
        <p className="font-euclid text-xs text-center py-2 bg-black text-white">
          © 2026 Dipram. All rights reserved. Unauthorized use prohibited.
        </p>
      </div>
    </div>
  );
};

export default Footer;