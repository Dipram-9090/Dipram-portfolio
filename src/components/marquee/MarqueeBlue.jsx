import React, { useRef } from 'react'
import LogoIcon from '../iconComponents/LogoIcon'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const MarqueeBlue = () => {
  const marqueeRef = useRef(null)
  useGSAP(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -10,
      ease: 'linear',
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, [])
  return (
    <div ref={marqueeRef} className="bg-[#5043FA] flex shrink-0 w-max">
      <div className='flex w-max items-center'>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Interactive Experiences
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Design System
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            UI/UX
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Web & App Design
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Interactive Experiences
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Design System
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            UI/UX
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Web & App Design
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Interactive Experiences
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Design System
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            UI/UX
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Web & App Design
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Interactive Experiences
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Design System
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            UI/UX
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Web & App Design
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
      </div>
      <div className='flex w-max items-center'>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Interactive Experiences
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Design System
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            UI/UX
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Web & App Design
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Interactive Experiences
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Design System
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            UI/UX
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
        <div className='flex items-center gap-4 py-2 shrink-0 mx-2'>
          <p className='text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5'>
            Web & App Design
          </p>
          <div className='text-white'>
            <LogoIcon color="white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarqueeBlue
