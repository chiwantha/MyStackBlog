import { useState } from "react";
import { motion } from "framer-motion";
import { BLOG_CARDS } from "../constants";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const cardsPerPage = 6;

  // Calculate the index range for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  // Filter the blog cards based on the search query
  const filteredCards = BLOG_CARDS.filter((card) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      card.blogtitle.toLowerCase().includes(searchTerm) ||
      card.category.toLowerCase().includes(searchTerm) ||
      card.author.toLowerCase().includes(searchTerm)
    );
  });

  // Get current cards based on filtered results
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Calculate total number of pages based on filtered results
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update the search query state
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Determine the range of page numbers to display
  const maxPagesToShow = 3;
  const half = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

  // Adjust start and end page to always show 3 pages
  if (endPage - startPage < maxPagesToShow - 1) {
    if (startPage === 1) {
      endPage = Math.min(maxPagesToShow, totalPages);
    } else {
      startPage = Math.max(1, endPage - (maxPagesToShow - 1));
    }
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative flex flex-col gap-2 rounded-xl border border-neutral-500/40 bg-orange-300 p-2 text-black dark:bg-slate-800">
        <h3 className="text-blue-500">Search Blogs </h3>
        <div className="w-full rounded-xl bg-transparent">
          <input
            type="search"
            placeholder="title, category, author"
            value={searchQuery}
            onChange={handleSearchChange} // Update state on input change
            className="w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 outline-none focus:border-orange-700"
          />
        </div>
        {/* <CiSearch className="absolute right-2" /> */}
      </div>
      {/* Blog Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {currentCards.map((card, index) => (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
            key={index}
          >
            <BlogCard
              id={card.id}
              blogtitle={card.blogtitle}
              category={card.category}
              author={card.author}
              subtitle={card.subtitle}
              intro={card.intro}
              image={card.image}
            />
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white ${currentPage === 1 ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-400"} rounded-xl`}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`rounded-xl px-3 py-2 ${
              currentPage === startPage + index
                ? "bg-orange-500 text-white hover:bg-orange-400"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {startPage + index}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white ${currentPage === totalPages ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-400"} rounded-xl`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
