import AboutHero from "./sections/aboutHero/AboutHero";
import MarqueeBlue from "../../components/marquee/MarqueeBlue";
import MarqueeWhite from "../../components/marquee/MarqueeWhite";
import Section2 from "./sections/section 2/Section2";
import Section3 from "./sections/section3/Section3";
import Footer from "../../components/Footer";
import Section4 from "./sections/section4/Section4";

const About = () => {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* About hero */}
      <div className="relative w-full">
        <AboutHero />
        <div className="absolute translate-y-15 rotate-4 bottom-0 z-100 justify-start w-full">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 -rotate-2 bottom-0 z-99 flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div>
      <div className="relative w-full">
        <Section2 />
        <div className="absolute translate-y-15 rotate-6 bottom-9 z-100 justify-start w-full">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 -rotate-2 bottom-0 z-99 flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div>
      <div className="relative w-full">
        <Section3 />
        <div className="absolute translate-y-15 rotate-2 bottom-9 z-100 justify-start w-full">
          <MarqueeBlue />
        </div>
        <div className="absolute translate-y-9 -rotate-4 bottom-0 z-99 flex justify-end w-full ">
          <MarqueeWhite />
        </div>
      </div>

      <Section4 />

      <Footer />
      {/* <div className="mt-40 h-screen w-full bg-[#131313]"></div> */}
    </div>
  );
};

export default About;
