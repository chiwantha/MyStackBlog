import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import ProfileCard from "./ProfileCard";
import Loading from "./Loading";

const AuthorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const cardsPerPage = 6;

  // Fetch data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const res = await makeRequest.get("/user/list");
      return res.data;
    },
  });

  // Filter cards based on search query
  const filteredCards =
    data?.filter(({ name, subtitle, blogcount, badge }) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        name?.toLowerCase().includes(searchTerm) ||
        subtitle?.toLowerCase().includes(searchTerm) ||
        badge?.toLowerCase().includes(searchTerm) ||
        String(blogcount).toLowerCase().includes(searchTerm)
      );
    }) || [];

  // Calculate pagination details
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const currentCards = filteredCards.slice(
    indexOfLastCard - cardsPerPage,
    indexOfLastCard,
  );

  // Scroll to top function for smoother page transitions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop(); // Added scroll to top when changing pages
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Pagination logic (simplified with flexibility for future changes)
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
      {/* Search functionality */}
      <div className="relative flex flex-col gap-2 rounded-xl border border-neutral-500/40 bg-orange-300 p-2 text-black dark:bg-slate-800">
        <h3 className="text-blue-500">Search Users</h3>
        <input
          type="search"
          placeholder="name, category, badge"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 outline-none focus:border-orange-700"
        />
      </div>

      {/* Author Cards Display */}
      {error ? (
        <p className="text-red-500">Something went wrong: {error.message}</p>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {currentCards.length > 0 ? (
            currentCards.map((data) => (
              <motion.div
                key={data.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileCard onList={1} data={data} />
              </motion.div>
            ))
          ) : (
            <p>No authors found</p>
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

export default AuthorList;
