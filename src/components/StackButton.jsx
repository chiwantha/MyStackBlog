// eslint-disable-next-line react/prop-types
const StackButton = ({ label, fill, rounded }) => {
  return (
    <div className="select-none">
      <button
        className={`flex items-center justify-center ${rounded ? `rounded-${rounded}` : `rounded-xl`} border px-6 py-1 ${
          fill === 1
            ? `:border-white bg-orange-500 text-white hover:border-orange-500 hover:bg-white hover:text-orange-500`
            : `border-orange-500 bg-white text-orange-500 hover:border-white hover:bg-orange-500 hover:text-white`
        } `}
      >
        {label ? label : "Buton"}
      </button>
    </div>
  );
};

export default StackButton;
