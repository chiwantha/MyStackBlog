import { useState } from "react";
import GalleryImage from "./GalleryImage";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Loading from "./Loading";
import Modal from "./ImageModal";

const GalleryComp = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const imagesPerPage = 16; // Adjust based on your grid layout

  // Fetch data using React Query
  const { data, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await makeRequest.get("gallery/load");
      return res.data;
    },
  });

  // Filter images based on search query
  const filteredImages =
    data?.filter((image) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        image.title?.toLowerCase().includes(searchTerm) ||
        image.category?.toLowerCase().includes(searchTerm) ||
        image.intro?.toLowerCase().includes(searchTerm) ||
        image.authorName?.toLowerCase().includes(searchTerm)
      );
    }) || [];

  // Calculate total pages and slice data for the current page
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage,
  );

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle search query input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (currentImages && currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImages && currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative flex flex-col gap-2 rounded-xl border border-neutral-500/40 bg-orange-300 p-2 text-black dark:bg-slate-800">
        <h3 className="text-blue-500">Search Images</h3>
        <div className="w-full rounded-xl bg-transparent">
          <input
            type="search"
            placeholder="title, category, author"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 outline-none focus:border-orange-700"
          />
        </div>
      </div>

      {/* Image Grid */}
      <div
        className="flex justify-center items-center p-2 rounded-xl  border sha
      border-slate-500/20 bg-slate-100 dark:border-slate-500/50 dark:bg-slate-800"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 rounded-lg overflow-hidden">
            {" "}
            {currentImages.length > 0 &&
              currentImages.map((item, index) => (
                <GalleryImage
                  data={item}
                  key={item.id}
                  onClick={() => openModal(index)}
                />
              ))}
          </div>
        )}

        {isModalOpen && (
          <Modal
            data={currentImages} // Pass filtered images to modal
            currentIndex={currentImageIndex}
            onClose={closeModal}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white ${
              currentPage === 1
                ? "bg-gray-400"
                : "bg-orange-500 hover:bg-orange-400"
            } rounded-xl`}
          >
            Previous
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-xl px-3 py-2 ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white hover:bg-orange-400"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white ${
              currentPage === totalPages
                ? "bg-gray-400"
                : "bg-orange-500 hover:bg-orange-400"
            } rounded-xl`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryComp;
