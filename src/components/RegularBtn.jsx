// eslint-disable-next-line react/prop-types
const RegularBtn = ({ label, width }) => {
  // console.log(`${width ? `w-${width}` : "w-1/2"}`);
  return (
    <button
      className={`rounded-lg bg-orange-400 px-6 py-2 transition-transform hover:scale-105 hover:bg-orange-400/80 ${width ? `w-${width}` : ""} text-white`}
    >
      {label}
    </button>
  );
};

export default RegularBtn;
