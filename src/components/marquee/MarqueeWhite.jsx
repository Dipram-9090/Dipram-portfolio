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

// Duplicate 4 times to ensure no blank spaces appear during the shift
const repeatedItems = [...items, ...items, ...items, ...items]

const MarqueeWhite = () => {
  const wrapperRef = useRef(null)
  const trackRef   = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    // To move right seamlessly: start shifted to the left (-25%), animate to 0%
    gsap.fromTo(
      track,
      { xPercent: -25 },
      {
        xPercent: 0,
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
    <div ref={wrapperRef} className="bg-white overflow-hidden w-[120vw]">
      <div ref={trackRef} className="flex w-max">
        {repeatedItems.map((label, i) => (
          <div key={i} className="flex items-center gap-4 py-2 shrink-0 mx-2">
            <p className="text-[#5043FA] text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5">
              {label}
            </p>
            <div className="text-[#5043FA]">
              <LogoIcon color="#5043FA" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarqueeWhite