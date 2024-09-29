import { Link } from "react-router-dom";
import StackButton from "../../components/StackButton";

const BlogDetails = () => {
  return (
    <div className="my-2 space-y-6" style={{ flex: 4 }}>
      Blog Page
      <div className="">
        <Link to="/home">
          <StackButton label="Back To Home" fill={0} />
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
