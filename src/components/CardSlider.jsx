/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import StackButton from "./StackButton";
import BlogCard from "./BlogCard";
import { BLOG_CARDS } from "../constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CardPannel = ({
  from = 0,
  to = BLOG_CARDS.length,
  title,
  btntext,
  link,
  btn,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default to 3 items per page for large screens

  // Calculate the total number of slides
  const totalSlides = Math.ceil((to - from) / itemsPerPage);

  // Calculate the current subset of blog cards to display
  const visibleCards = BLOG_CARDS.slice(
    currentSlide * itemsPerPage,
    currentSlide * itemsPerPage + itemsPerPage,
  );

  // Handle the navigation between slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides); // Loop back to the first slide
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides); // Loop to the last slide
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Change the time in milliseconds

    return () => clearInterval(slideInterval); // Clean up the interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, totalSlides]);

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Show 1 item for small screens (below md)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Show 2 items for medium screens
      } else {
        setItemsPerPage(3); // Show 3 items for large screens
      }
    };

    handleResize(); // Set the initial value based on the current window size
    window.addEventListener("resize", handleResize); // Adjust on window resize

    return () => window.removeEventListener("resize", handleResize); // Clean up event listener
  }, []);

  return (
    <div className="relative space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium dark:text-white">
          {title ? title : "Section Title"}
        </h1>
        {btn === undefined || btn === null || (btn !== 0 && btn !== "0") ? (
          <Link to={link ? link : "/feed"}>
            <StackButton label={btntext ? btntext : "View More"} fill={1} />
          </Link>
        ) : (
          <div className=""></div>
        )}
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between">
        <button
          className="absolute left-0 mt-[-53px] bg-orange-500 px-3 py-2 text-white shadow-lg transition-transform hover:scale-110"
          onClick={prevSlide}
        >
          {"<"} {/* Previous button */}
        </button>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visibleCards.map((card, index) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              key={index}
            >
              <BlogCard
                category={card.category}
                id={card.id}
                author={card.author}
                subtitle={card.subtitle}
                intro={card.intro}
                image={card.image}
              />
            </motion.div>
          ))}
        </div>

        <button
          className="absolute right-0 mt-[-53px] bg-orange-500 px-3 py-2 text-white shadow-lg transition-transform hover:scale-110"
          onClick={nextSlide}
        >
          {">"} {/* Next button */}
        </button>
      </div>
    </div>
  );
};

export default CardPannel;
