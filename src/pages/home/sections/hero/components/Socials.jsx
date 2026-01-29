import gsap from "gsap";

const Socials = () => {
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      backgroundColor: "rgba(0,0,0,0.5)",
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      backgroundColor: "rgba(0,0,0,0)",
      ease: "power1.out",
    });
  };

  return (
    <div className="flex flex-col gap-1">
      {/* <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hover:cursor-pointer flex gap-4 px-6 py-2 rounded-full"
      >
        <img
          src="/svg/hero/bi_twitter-x.svg"
          alt="Twitter"
          className="h-full w-auto"
        />
        <p className="font-euclid text-xl">Twitter</p>
      </button> */}
      <a
        href="https://www.behance.net/diprambiswas9090"
        target="blank"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hover:cursor-pointer flex gap-4 px-6 py-2 rounded-full"
      >
        <img
          src="/svg/hero/Behance.svg"
          alt="Behance"
          className="h-full w-auto"
        />
        <p className="font-euclid text-xl">Behance</p>
      </a>
      <a
        href="https://www.linkedin.com/in/dipram-biswas/"
        target="blank"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hover:cursor-pointer flex gap-4 px-6 py-2 rounded-full"
      >
        <img
          src="/svg/hero/Linkedin.svg"
          alt="Linkedin"
          className="h-full w-auto"
        />
        <p className="font-euclid text-xl">Linkedin</p>
      </a>
    </div>
  );
};

export default Socials;
