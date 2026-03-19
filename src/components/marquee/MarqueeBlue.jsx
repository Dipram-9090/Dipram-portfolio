import React, { useRef } from 'react'
import LogoIcon from '../iconComponents/LogoIcon'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const items = [
  'Interactive Experiences',
  'Design System',
  'UI/UX',
  'Web & App Design',
]

// 1. Create 4 copies so we never run out of visual trailing content on ultra-wide screens
const repeatedItems = [...items, ...items, ...items, ...items]

const MarqueeBlue = () => {
  const wrapperRef = useRef(null)
  const trackRef   = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    gsap.fromTo(
      track,
      { xPercent: 0 },
      {
        // 2. Move exactly 1/4th of the total track width (which equals exactly 1 original list)
        xPercent: -25, 
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    )
  }, [])

  return (
    <div ref={wrapperRef} className="bg-[#5043FA] overflow-hidden w-full">
      <div ref={trackRef} className="flex w-max">
        {repeatedItems.map((label, i) => (
          <div key={i} className="flex items-center gap-4 py-2 shrink-0 mx-2">
            <p className="text-white text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5">
              {label}
            </p>
            <div className="text-white">
              <LogoIcon color="white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarqueeBlue