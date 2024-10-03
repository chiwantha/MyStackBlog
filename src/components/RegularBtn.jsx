// eslint-disable-next-line react/prop-types
const RegularBtn = ({ label, width, fill }) => {
  // console.log(`${width ? `w-${width}` : "w-1/2"}`);
  return (
    <button
      className={`rounded-lg  px-6 py-2 transition-transform hover:scale-105 border
        ${fill == 1 ? "bg-orange-400 hover:bg-orange-400/80 border-orange-400 text-white" : "bg-white text-orange-400 border-orange-400 hover:bg-orange-100"}
        ${width ? `w-${width}` : ""} `}
    >
      {label}
    </button>
  );
};

export default RegularBtn;
