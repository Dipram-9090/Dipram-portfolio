import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import AnimatedLink from "./animatedLink/AnimatedLink";

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "#060010",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#060010",
  borderColor = "#fff",
  fontClass = "font-sans",
  textSize = "text-base",
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
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            fontClass={fontClass}
            textSize={textSize}
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
  isFirst,
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(8);

  const animationDefaults = { duration: 0.6, ease: "expo.out" };

  const closestEdge = (x, y, w, h) => {
    const top = (x - w / 2) ** 2 + y ** 2;
    const bottom = (x - w / 2) ** 2 + (y - h) ** 2;
    return top < bottom ? "top" : "bottom";
  };

  useEffect(() => {
    const calculate = () => {
      if (!trackRef.current) return;
      const part = trackRef.current.querySelector(".marquee-part");
      if (!part) return;
      const needed = Math.ceil(window.innerWidth / part.offsetWidth);
      setRepeatCount(Math.max(needed * 2, 8));
    };
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [text, image]);

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const parts = track.querySelectorAll(".marquee-part");

      let totalWidth = 0;
      parts.forEach((p) => (totalWidth += p.offsetWidth));

      gsap.set(track, { x: 0 });

      animationRef.current = gsap.to(track, {
        x: -totalWidth / 2,
        duration: speed,
        ease: "expoScale",
        repeat: -1,
      });
    });

    return () => {
      ctx.revert();
      animationRef.current?.kill();
    };
  }, [repeatCount, speed]);

  const onEnter = (e) => {
    if (!itemRef.current || !marqueeRef.current || !trackRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(
      e.clientX - r.left,
      e.clientY - r.top,
      r.width,
      r.height,
    );

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(trackRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, trackRef.current], { y: "0%" }, 0);

    animationRef.current?.play();
  };

  const onLeave = (e) => {
    if (!itemRef.current || !marqueeRef.current || !trackRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(
      e.clientX - r.left,
      e.clientY - r.top,
      r.width,
      r.height,
    );

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(trackRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);

    animationRef.current?.play();
  };

  return (
    <div
      ref={itemRef}
      className="flex-1 relative overflow-hidden text-center"
      style={{ borderTop: isFirst ? "none" : `1px solid ${borderColor}` }}
    >
      <AnimatedLink
        href={link}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={`flex items-center justify-center h-full uppercase cursor-pointer no-underline ${fontClass} ${textSize}`}
        style={{ color: textColor }}
      >
        {text}
      </AnimatedLink>

      <div
        ref={marqueeRef}
        className="absolute inset-0 overflow-hidden pointer-events-none translate-y-[101%]"
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div ref={trackRef} className="flex h-full">
          {Array.from({ length: repeatCount }).map((_, i) => (
            <div
              key={i}
              className="marquee-part flex items-center shrink-0 w-max"
            >
              <div
                className={`whitespace-nowrap w-max uppercase leading-none pl-[4vw] pr-[2vw] ${fontClass} ${textSize}`}
                style={{ color: marqueeTextColor }}
              >
                {text}
              </div>
              <div
                className="w-50 h-[7vh] rounded-[50px] ml-[2vw] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
