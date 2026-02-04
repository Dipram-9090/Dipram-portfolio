import Socials from "./components/Socials";
import WavyGradient from "../../../../components/WavyGradient";
import ProjectsButton from "../../../../components/ProjectsButton";
import ContactButton from "../../../../components/ContactButton";

const Hero = () => {
  return (
    <div className="hero-section relative overflow-hidden w-full min-h-screen lg:h-[115vh]">
      <WavyGradient noiseIntensity={4}  />
      
      {/* --- Profile Image --- */}
      <div className="absolute w-full h-full pointer-events-none">
        <img
          src="/img/hero/hero-img.webp"
          alt="Profile Image"
          className="absolute h-[90vh] md:h-[90vh] lg:h-full object-cover -translate-x-[50%] left-[50%] bottom-0 z-10"
        />
      </div>


      {/* --- Main Text Content (DIPRAM + Titles) --- */}
      <div className="absolute z-15 md:z-0 lg:z-0 h-screen w-full flex justify-center pointer-events-none">
        {/* Adjusted top position and width for mobile */}
        <div className="flex flex-col absolute top-[50%] md:top-[25%] lg:top-[35%] w-full max-w-[90%] md:max-w-2xl lg:max-w-[60vw] mx-4 gap-4 md:gap-5">
          
          <img src="/svg/DIPRAM-bg.svg" className="w-full h-auto" alt="DIPRAM" />
          
          {/* Stack titles on mobile, spread on desktop */}
          <div className="flex md:flex-row items-center md:items-start justify-between w-full font-euclid font-medium text-xl md:text-xl lg:text-[2.2vw] uppercase text-white">
            <p>Graphic Designer</p>
             
            <p>UI/UX Designer</p>
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      {/* Stack vertically on mobile, row on desktop. Adjusted bottom spacing. */}
      <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-24 md:bottom-32 lg:bottom-48 flex flex-col md:flex-row justify-center items-center gap-4 w-full px-4">
        
        <ContactButton className="cursor-pointer flex items-center justify-center font-euclid font-medium 
          text-xl md:text-3xl lg:text-[3.5vw] 
          lg:leading-16 uppercase 
          py-3 px-8 md:px-12 lg:px-[3.5vw] lg:py-[1vw] 
          rounded-full hover:bg-white hover:text-black duration-200 bg-[#32C4A2] text-white whitespace-nowrap w-full md:w-auto border-2 md:border-4 lg:border-5 hover:border-white border-[#32C4A2]">
          Work Together
        </ContactButton>

        <ProjectsButton
          className={
            "flex items-center justify-center w-full md:w-auto whitespace-nowrap rounded-full cursor-pointer font-euclid font-medium uppercase text-xl md:text-3xl lg:text-[3.5vw] lg:leading-16 py-3 px-8 md:px-12 lg:px-[3.5vw] lg:py-[1vw] bg-white lg:bg-transparent text-black border-white border-2 md:border-4 lg:border-5 lg:text-white lg:duration-200 lg:hover:text-black lg:hover:bg-white lg:hover:border-white"
          }
        />
      </div>

      {/* --- Socials --- */}
      {/* Centered at very bottom on mobile, absolute left on desktop */}
      <div className="lg:flex md:hidden hidden absolute z-20 bottom-8 left-0 w-full justify-center lg:justify-start lg:bottom-48 lg:left-0 lg:w-auto lg:px-8 text-white">
        <Socials />
      </div>
    </div>
  );
};

export default Hero;