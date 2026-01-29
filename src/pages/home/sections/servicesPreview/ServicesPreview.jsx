import React from "react";
import FlowingMenu from "../../../../components/FlowingMenu";
import ProjectsButton from "../../../../components/ProjectsButton";
import LearnMore from "../../../../components/LearnMore";

import "./servicesPreview.css";

const ServicesPreview = () => {
  const demoItems = [
    {
      link: "/services",
      text: "Product Interface Design",
      image: "/img/services/image2.png",
    },
    {
      link: "/services",
      text: "Brand & Visual Systems",
      image: "/img/services/image3.png",
    },
    {
      link: "/services",
      text: "Marketing & Growth Creatives",
      image: "/img/services/image4.png",
    },
    {
      link: "/services",
      text: "End-to-End Design Support",
      image: "/img/services/image1.png",
    },
  ];
  return (
    <div className="lg:h-[120vh] md:[120vh] h-screen w-full mt-50 flex flex-col gap-12">
      <div className="mix-blend-difference flex flex-col">
        <h1 className="font-bebas text-white text-center text-8xl">SERVICES</h1>
        <p className="font-euclid text-white text-xl text-center w-[70%] mx-auto mt-5">
          I provide design services that focus on strengthening brand presence,
          improving clarity, and creating consistent visual experiences across
          digital platforms. Every project is approached with strategic
          intent—ensuring the work adds lasting value rather than short-term
          impact.
        </p>
      </div>

      <div id="flowing-menu">
        <FlowingMenu
          items={demoItems}
          speed={20}
          textColor="#ffffff"
          bgColor="transparent"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#000000"
          borderColor="#ffffff"
          fontClass="font-euclid"
          textSize="text-xl md:text-2xl lg:text-3xl"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full sm:w-auto">
        <LearnMore
          to={"/services"}
          className="mix-blend-difference hover:bg-[#19E6B6] hover:cursor-pointer duration-200 font-euclid font-medium text-black bg-white rounded-full text-lg md:text-xl lg:text-3xl px-8 py-2 lg:px-12 w-2/3 sm:w-auto text-center"
        />

        <ProjectsButton
          className="mix-blend-difference hover:bg-[#19E6B6] hover:text-black hover:ring-[#19E6B6] hover:cursor-pointer duration-200 font-euclid font-medium text-white ring-3 ring-inset ring-white rounded-full uppercase text-lg md:text-xl lg:text-3xl px-8 py-2 lg:px-12 w-2/3 sm:w-auto text-center"
        />
      </div>
    </div>
  );
};

export default ServicesPreview;
