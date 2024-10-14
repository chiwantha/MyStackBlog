import GalleryComp from "../../components/GalleryComp";

const Gallery = () => {
  const scrollToTop = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling
    });
  };
  scrollToTop();
  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      <GalleryComp />
    </div>
  );
};

export default Gallery;
