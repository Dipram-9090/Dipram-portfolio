import React, { useState } from "react";
import gsap from "gsap";

import LinkedInIcon from "../../../../../components/iconComponents/LinkedInIcon";
import BehanceIcon from "../../../../../components/iconComponents/BehanceIcon";

const Socials = () => {
  // 1. Define your data here
  const socialData = [
    // {
    //   Component: "Twitter",
    //   url: "#",
    //   icon: "/svg/hero/bi_twitter-x.svg",
    // },
    {
      name: "LinkedIn",
      Component: LinkedInIcon,
      url: "https://www.linkedin.com/in/dipram-biswas/",
    },
    {
      name: "Behance",
      Component: BehanceIcon,
      url: "https://www.behance.net/diprambiswas9090",
    },
  ];

  // 2. Animation handlers (unchanged, they work perfectly with mapping)
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      color: "#5043FA",
      backgroundColor: "rgba(255, 255, 255, 1)",
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      color: "#FFFFFF",
      backgroundColor: "rgba(255, 255, 255, 0)",
      ease: "power2.out",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 3. Map over the data array */}
      {socialData.map((item, index) => (
        <a
          key={index} // or use key={item.name} if names are unique
          href={item.url}
          target="_blank"
          rel="noreferrer" // Good practice for security with target="_blank"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer flex gap-4 px-6 py-2 rounded-full "
        >
          <item.Component />
          <p className="font-euclid text-xl">{item.name}</p>
        </a>
      ))}
    </div>
  );
};

export default Socials;
