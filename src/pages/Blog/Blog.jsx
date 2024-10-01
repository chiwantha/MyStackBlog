import { Link } from "react-router-dom";
import StackButton from "../../components/StackButton";

const Blog = () => {
  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      <div className="flex items-center justify-between rounded-xl border border-slate-300/50 bg-slate-100 p-2 text-blue-500 dark:border-slate-600/50 dark:bg-slate-800">
        <h2 className="text-xl font-bold">Happy to Share ...</h2>
        <Link to="/feed">
          <StackButton fill={1} label={"Back to Feed"} rounded={"lg"} />
        </Link>
      </div>
      <div className="">Blog</div>
    </div>
  );
};

export default Blog;
