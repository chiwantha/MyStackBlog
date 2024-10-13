/* eslint-disable react/prop-types */
const GalleryImage = ({ data, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="w-full h-full bg-black hover:scale-110 hover:shadow-2xl transition-transform">
        <img
          src={`/upload/${data.img}`}
          alt="Image"
          className="object-cover w-full h-full object-center"
        />
      </div>
    </div>
  );
};

export default GalleryImage;
