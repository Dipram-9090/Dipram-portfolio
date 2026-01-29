import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollBackground = () => {
  useGSAP(() => {
    document.querySelectorAll(".js-color-stop").forEach((section) => {
      const color = section.dataset.backgroundColor;

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom bottom",
        onEnter: () => {
          gsap.to("body", { backgroundColor: color, duration: 0.6 });
          // gsap.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.6 });
        },
        onEnterBack: () => {
          gsap.to("body", { backgroundColor: color, duration: 0.6 });
          // gsap.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.6 });
        },
      });
    });
  });
};

export default useScrollBackground;
