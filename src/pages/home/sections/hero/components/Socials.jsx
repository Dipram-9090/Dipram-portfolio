import React from "react";
import gsap from "gsap";

const Socials = () => {
  // 1. Define your data here
  const socialData = [
    // {
    //   name: "Twitter",
    //   url: "#",
    //   icon: "/svg/hero/bi_twitter-x.svg",
    // },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/dipram-biswas/",
      icon: "/svg/hero/Linkedin.svg",
    },
    {
      name: "Behance",
      url: "https://www.behance.net/diprambiswas9090",
      icon: "/svg/hero/Behance.svg",
    },
    
  ];

  // 2. Animation handlers (unchanged, they work perfectly with mapping)
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      backgroundColor: "rgba(0,0,0,0.5)",
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      backgroundColor: "rgba(0,0,0,0)",
      ease: "power1.out",
    });
  };

  return (
    <div className="flex flex-col gap-1">
      {/* 3. Map over the data array */}
      {socialData.map((item, index) => (
        <a
          key={index} // or use key={item.name} if names are unique
          href={item.url}
          target="_blank"
          rel="noreferrer" // Good practice for security with target="_blank"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hover:cursor-pointer flex gap-4 px-6 py-2 rounded-full"
        >
          <img
            src={item.icon}
            alt={item.name}
            className="h-full w-auto"
          />
          <p className="font-euclid text-xl">{item.name}</p>
        </a>
      ))}
    </div>
  );
};

export default Socials;