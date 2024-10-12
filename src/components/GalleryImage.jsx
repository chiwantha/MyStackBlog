/* eslint-disable react/prop-types */
const GalleryImage = ({ data }) => {
  return (
    <div>
      <div className="bg-black rounded-xl shadow-md">
        <img
          src={`/upload/${data.img}`}
          alt="Image"
          className="object-cover flex bg-white w-full"
        />
      </div>
    </div>
  );
};

export default GalleryImage;
