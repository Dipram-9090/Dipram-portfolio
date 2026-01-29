import React from 'react';
import WavyGradient from '../../components/WavyGradient';
import AnimatedLink from '../../components/animatedLink/AnimatedLink';

const ErrorPage = () => {
  return (
    <div className='relative w-screen h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-4 text-center'>
        
        {/* Subtitle: text-xl (mobile) -> text-4xl (desktop) */}
        <p className='font-euclid font-medium text-xl md:text-2xl lg:text-4xl'>
            OOPS ! WRONG WAY
        </p>
      
      {/* Main Title: 
          - text-[35vw] (mobile): Scales dynamically with screen width
          - text-[25rem] (desktop): Your original massive size
          - leading-none: Prevents huge gaps above/below text
      */}
      <h1 className='font-bebas font-medium text-[35vw] md:text-[25vw] lg:text-[25rem] leading-none text-black select-none my-4 lg:my-0'>
        ERROR
      </h1>
      
      {/* Button:
          - text-lg / px-8 (mobile)
          - text-3xl / px-12 (desktop)
      */}
      <AnimatedLink 
        to="/" 
        className="cursor-pointer duration-200 hover:bg-black hover:ring-black hover:text-white font-euclid font-medium text-black uppercase ring-3 ring-inset ring-black rounded-full 
        text-lg px-8 py-2 
        md:text-2xl md:px-10 
        lg:text-3xl lg:px-12 lg:py-2"
      >
        Go back to Home
      </AnimatedLink>
    </div>
  );
}

export default ErrorPage;