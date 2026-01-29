const FilledABOUT = ({ ref, text, className }) => {
  return (
    <div ref={ref} className={className}>
      <h1 className="font-bebas font-medium lg:text-[33vw] md:text-[30vw] text-[30vw] text-center text-white">
        {text}
      </h1>
    </div>
  );
};

export default FilledABOUT;
