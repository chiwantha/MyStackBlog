// eslint-disable-next-line react/prop-types
const RegularBtn = ({ label, width, fill, textSize, bg }) => {
  // Define the color, fallback to orange if bg is not provided
  const bgColor = bg ? bg : "orange";

  return (
    <button
      className={`rounded-lg px-6 py-2 transition-transform hover:scale-105 border flex items-center justify-center
        ${
          fill != 1
            ? `bg-${bgColor}-400 hover:bg-${bgColor}-400/80 border-${bgColor}-400 text-${bgColor}-400`
            : `bg-white text-${bgColor}-400 border-${bgColor}-400 hover:bg-${bgColor}-100`
        }
        ${width ? `w-${width}` : ""} ${textSize ? `text-${textSize}` : ""}`}
    >
      {label}
    </button>
  );
};

export default RegularBtn;
