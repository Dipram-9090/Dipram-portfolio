import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Marquee = ({
  items = [],
  bgColor = '#ffffff',
  textColor = '#000000',
  direction = 'left', // 'left' or 'right'
  Icon
}) => {
  const wrapperRef = useRef(null)
  const trackRef   = useRef(null)

  // Duplicate 4 times to ensure no blank spaces appear during the shift
  const repeatedItems = [...items, ...items, ...items, ...items]

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    // Set animation values based on direction
    // Left: Starts at 0, moves to -25%
    // Right: Starts at -25% (hidden left edge), moves to 0
    const startX = direction === 'left' ? 0 : -25
    const endX = direction === 'left' ? -25 : 0

    gsap.fromTo(
      track,
      { xPercent: startX },
      {
        xPercent: endX,
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
  }, [direction]) // re-run if direction prop changes

  return (
    <div ref={wrapperRef} style={{ backgroundColor: bgColor }} className="overflow-hidden w-full">
      <div ref={trackRef} className="flex w-max">
        {repeatedItems.map((label, i) => (
          <div key={i} className="flex items-center gap-4 py-2 shrink-0 mx-2">
            <p 
              style={{ color: textColor }} 
              className="text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bebas uppercase text-nowrap mt-1.5"
            >
              {label}
            </p>
            {Icon && (
              <div style={{ color: textColor }}>
                <Icon color={textColor} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee