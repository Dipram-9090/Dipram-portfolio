import { useRef, useEffect, forwardRef } from "react";
import { gsap } from "gsap";
import AnimatedLink from "./animatedLink/AnimatedLink"; 

function FlowingMenu({
  items = [],
  // -- Appearance --
  textColor = "#fff",
  bgColor = "#060010",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#060010",
  borderColor = "#fff",
  fontClass = "font-sans",
  textSize = "text-base",

  // -- Dimensions & Layout --
  gap = "gap-[2vw]",
  paddingLeft = "pl-[2vw]",
  imageWidth = "w-50",
  imageHeight = "h-[7vh]",
  imageRadius = "rounded-full",

  // -- Animation --
  speed = 15,
  fadeDuration = 0.25,
  revealEase = "expoScale",
  
  // -- Logic --
  copies = 4, // Number of times to repeat content for the loop
  linkComponent = AnimatedLink, // Allow swapping the link component
}) {
  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="flex flex-col h-full">
        {items.map((item, i) => (
          <MenuItem
            key={i}
            {...item}
            // Pass all props down
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            fontClass={fontClass}
            textSize={textSize}
            gap={gap}
            paddingLeft={paddingLeft}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            imageRadius={imageRadius}
            fadeDuration={fadeDuration}
            revealEase={revealEase}
            copies={copies}
            LinkComponent={linkComponent}
            isFirst={i === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  fontClass,
  textSize,
  gap,
  paddingLeft,
  imageWidth,
  imageHeight,
  imageRadius,
  fadeDuration,
  revealEase,
  copies,
  LinkComponent,
  isFirst,
}) {
  const itemRef = useRef(null);
  const marqueeWrapperRef = useRef(null);
  const marqueeAnimationRef = useRef(null);
  
  // Refs for the multiple copies of the content
  const contentRefs = useRef([]);

  // --- Logic 1: Direction Detection ---
  const getDirection = (e, el) => {
    const bounds = el.getBoundingClientRect();
    const y = e.clientY - bounds.top;
    return y < bounds.height / 2 ? "bottom" : "top";
  };

  // --- Logic 2: Seamless Marquee Setup ---
  useEffect(() => {
    if (!marqueeWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Setup the infinite loop
      // We target the refs array that we fill in the render loop below
      const targets = contentRefs.current.filter(Boolean);
      
      if (targets.length > 0) {
        marqueeAnimationRef.current = gsap.to(targets, {
          xPercent: -100,
          duration: speed,
          repeat: -1,
          ease: "none",
          paused: true,
        });
      }

      // 2. Set initial hidden state
      gsap.set(marqueeWrapperRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
      });
    });

    return () => ctx.revert();
  }, [speed, copies]);

  const onEnter = (e) => {
    if (!itemRef.current || !marqueeWrapperRef.current) return;

    const dir = getDirection(e, itemRef.current);

    // Initial setups for the animation
    gsap.set(marqueeWrapperRef.current, {
      clipPath: dir === "top" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
    });

    // Animate Reveal
    gsap.to(marqueeWrapperRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: fadeDuration,
      ease: revealEase,
    });

    marqueeAnimationRef.current?.play();
  };

  const onLeave = (e) => {
    if (!itemRef.current || !marqueeWrapperRef.current) return;

    const dir = getDirection(e, itemRef.current);

    // Animate Hide
    gsap.to(marqueeWrapperRef.current, {
      clipPath: dir === "top" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      duration: fadeDuration,
      ease: revealEase,
    });

    marqueeAnimationRef.current?.pause();
  };

  // Reset refs array on render
  contentRefs.current = [];

  return (
    <div
      ref={itemRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex-1 relative overflow-hidden text-center cursor-pointer"
      style={{ borderTop: isFirst ? "none" : `1px solid ${borderColor}` }}
    >
      {/* Static Layer */}
      <LinkComponent
        to={link}
        className={`flex items-center justify-center h-full uppercase cursor-pointer no-underline ${fontClass} ${textSize}`}
        style={{ color: textColor }}
      >
        {text}
      </LinkComponent>

      {/* Marquee Hover Layer */}
      <div
        ref={marqueeWrapperRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          backgroundColor: marqueeBgColor,
          clipPath: "inset(100% 0% 0% 0%)",
        }}
      >
        <div className="flex h-full w-fit items-center whitespace-nowrap">
          {/* Dynamically render copies based on 'copies' prop */}
          {Array.from({ length: copies }).map((_, i) => (
            <MarqueeGroup
              key={i}
              ref={(el) => (contentRefs.current[i] = el)}
              text={text}
              image={image}
              fontClass={fontClass}
              textSize={textSize}
              textColor={marqueeTextColor}
              gap={gap}
              paddingLeft={paddingLeft}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              imageRadius={imageRadius}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Group with fully exposed props
const MarqueeGroup = forwardRef(
  (
    {
      text,
      image,
      fontClass,
      textSize,
      textColor,
      gap,
      paddingLeft,
      imageWidth,
      imageHeight,
      imageRadius,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`flex h-full items-center shrink-0 ${gap} ${paddingLeft}`}
      >
        {/* Item A */}
        <div
          className={`whitespace-nowrap w-max uppercase leading-none ${fontClass} ${textSize}`}
          style={{ color: textColor }}
        >
          {text}
        </div>
        <div
          className={`${imageWidth} ${imageHeight} ${imageRadius} bg-cover bg-center`}
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Item B (Repeated for density) */}
        <div
          className={`whitespace-nowrap w-max uppercase leading-none ${fontClass} ${textSize}`}
          style={{ color: textColor }}
        >
          {text}
        </div>
        <div
          className={`${imageWidth} ${imageHeight} ${imageRadius} bg-cover bg-center`}
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    );
  }
);

export default FlowingMenu;