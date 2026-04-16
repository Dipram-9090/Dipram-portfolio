import WavyGradient from "../../../../components/WavyGradient";
import FilledABOUT from "../../../about/sections/aboutHero/components/FIlledABOUT";
import OutlineABOUT from "../../../about/sections/aboutHero/components/OutlineABOUT";

const ServicesHero = () => {
  return (
    <div className="hero-section relative h-[50vh] md:h-[80vh] lg:h-screen flex items-center justify-center w-full">
      <WavyGradient waveHeight={0.7} />
      {/* <img
        className="absolute z-20 bottom-0 left-[50%] -translate-x-[50%] h-[90vh] lg:h-[115vh] md:h-[110vh] object-cover"
        src="/img/servicesPage/services-hero.webp"
        alt=""
      /> */}
      <FilledABOUT text="SERVICES" className="absolute z-10 w-full translate-y-10" />
      {/* <OutlineABOUT text="SERVICES" className="absolute z-30 w-full" /> */}
    </div>
  );
};

export default ServicesHero;
