import React, { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Logofolio = () => {
  const scrollRef = useRef(null);

  // {/*
  useGSAP(() => {
    const split1 = new SplitText(".logofolioClass1", {
      type: "chars,words",
      charsClass: "char",
    });
    const split2 = new SplitText(".logofolioClass2", {
      type: "chars,words",
      charsClass: "char",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 60%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      split1.chars,
      { y: "0vw" },
      { y: "-11.5vw", stagger: { amount: 0.3 }, ease: "none", duration: 0.2 },
    );
    tl.fromTo(
      split2.chars,
      { y: "0vw" },
      { y: "-11.5vw", stagger: { amount: 0.3 }, ease: "none", duration: 0.2 },
      "<0.05",
    );

    return () => {
      split1.revert();
      split2.revert();
    };
  }, []);

  // */}

  return (
    <div className="bg-[#131313] lg:h-screen md:h-[50vh] h-[30vh] w-full flex items-center justify-center">
      <div
        ref={scrollRef}
        className="h-[11.5vw] flex flex-col items-center justify-start gap-0 overflow-hidden"
      >
        <h1 className="logofolioClass1 font-bebas text-[15vw] leading-[10vw] pt-[1.5vw] font-medium text-white">
          LOGOFOLIO
        </h1>
        <h1 className="logofolioClass2 font-bebas text-[15vw] leading-[10vw] pt-[1.5vw] font-medium text-white">
          LOGOFOLIO
        </h1>
      </div>
    </div>
  );
};

export default Logofolio;
