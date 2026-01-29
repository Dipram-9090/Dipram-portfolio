import WavyGradient from '../../../../components/WavyGradient';
import FilledABOUT from './components/FIlledABOUT';
import OutlineABOUT from './components/OutlineABOUT';

const AboutHero = () => {
  return (
    <div className='hero-section relative h-[115vh] w-full'>
      <img className='absolute z-20 bottom-0 left-[50%] -translate-x-[50%] h-[90vh] lg:h-[115vh] md:h-[110vh] object-cover' src="/img/about/about-hero-img.png" />
      <WavyGradient />
      <FilledABOUT text="ABOUT" className="absolute z-10 w-full lg:bottom-0 md:bottom-30 top-50" />
      <OutlineABOUT text="ABOUT" className="absolute z-30 w-full lg:bottom-0 md:bottom-30 top-50" />
    </div>
  );
}

export default AboutHero;
