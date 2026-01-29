import "./outlinePROJECTS.css"

const OutlinePROJECTS = ({ ref, className }) => {
  return (
    <div ref={ref} className={className}>
      <h1 className="font-bebas font-medium lg:text-[33vw] md:text-[30vw] text-[30vw] text-center text-outline-black">
        PROJECTS
      </h1>
    </div>
  );
};

export default OutlinePROJECTS;
