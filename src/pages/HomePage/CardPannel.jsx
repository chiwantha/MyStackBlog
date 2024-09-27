import StackButton from "../../components/StackButton";
import BlogCard from "../../components/BlogCard";
import { BLOG_CARDS } from "../../constants";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const CardPannel = ({ from, to, title, btntext }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">
          {title ? title : "Section Title"}
        </h1>
        <StackButton label={btntext ? btntext : "View More"} fill={1} />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_CARDS.slice(from ? from : 0, to ? to : 3).map((card, index) => (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
            key={index}
          >
            <BlogCard
              author={card.author}
              subtitle={card.subtitle}
              intro={card.intro}
              image={card.image}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardPannel;
