import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

const BlogList = () => {
  const scrollToTop = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const cardsPerPage = 9;

  // Fetch data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await makeRequest.get("/blog/feed");
      return res.data;
    },
  });

  // Filter blog cards based on search query
  const filteredCards =
    data?.filter((blog) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        blog.intro?.toLowerCase().includes(searchTerm) ||
        blog.category?.toLowerCase().includes(searchTerm) ||
        blog.authorName?.toLowerCase().includes(searchTerm)
      );
    }) || [];

  // Calculate total pages and slice data for the current page
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

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
    scrollToTop();
  };

  // Handle search query input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Determine which page numbers to show
  const maxPagesToShow = 3;
  const half = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

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
        <h3 className="text-blue-500">Search Blogs</h3>
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

      {/* Blog Cards */}
      {error ? (
        `Something went wrong: ${error}`
      ) : isLoading ? (
        <div className="w-full flex justify-center bg-transparent">
          <img
            src={
              "https://tamilnaducouncil.ac.in/wp-content/uploads/2018/10/loading-gif.gif"
            }
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {currentCards.length > 0 ? (
            currentCards.map((blog) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={blog.id}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))
          ) : (
            <p>No blogs found</p>
          )}
        </div>
      )}

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

export default BlogList;
