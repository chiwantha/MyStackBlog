/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import Loading from "./Loading";

const Modal = ({ data, currentIndex, onClose, onNext, onPrev }) => {
  const currentImage = data[currentIndex];

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight" && currentIndex < data.length - 1) {
      onNext();
    } else if (event.key === "ArrowLeft" && currentIndex > 0) {
      onPrev();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, data.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center z-50">
      <div className="max-w-6xl max-h-full relative">
        {currentImage ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className=""></div>
              <button
                onClick={onClose}
                className=" bg-red-500 hover:bg-red-700 py-1 px-3 rounded-xl right-0 text-white text-xl"
                aria-label="Close modal"
              >
                X
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={onPrev}
                className="absolute left-0 text-white text-2xl bg-orange-500 hover:bg-orange-700
                 py-3 px-2 rounded-br-md rounded-tr-md"
                disabled={currentIndex === 0}
                aria-label="Previous image"
              >
                &#10094; {/* Previous Arrow */}
              </button>
              <img
                src={`/upload/${currentImage.img}`}
                alt="Enlarged"
                className=" w-[900px] h-auto object-cover rounded-xl" // Set max-width to control size
                loading="lazy" // Lazy load the image
              />
              <button
                onClick={onNext}
                className="absolute right-0 text-white text-2xl  bg-orange-500 hover:bg-orange-700
                 py-3 px-2 rounded-bl-md rounded-tl-md"
                disabled={currentIndex === data.length - 1}
                aria-label="Next image"
              >
                &#10095; {/* Next Arrow */}
              </button>
            </div>
            <div className="bg-black/80 border border-neutral-700 p-2 rounded-xl flex justify-between gap-2">
              <div className="flex flex-col text-slate-200">
                <p>
                  Title :{" "}
                  <span className="text-blue-400">{currentImage.title}</span>
                </p>
                <Link to={`/profile/${currentImage.authorSlug}`}>
                  <p>
                    Author :{" "}
                    <span className="hover:underline text-orange-400">
                      {currentImage.authorName}
                    </span>
                  </p>
                </Link>
              </div>
              <a
                href={`/upload/${currentImage.img}`}
                download
                className="flex items-center justify-center px-4 text-white aspect-square bg-orange-600 rounded-lg hover:bg-orange-700 "
              >
                <FaDownload />
              </a>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Modal;
