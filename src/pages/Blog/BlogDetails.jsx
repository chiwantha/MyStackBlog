import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Assuming you're fetching blog details from an API

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`) // Replace with your API endpoint
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.content}</p>
      <p>
        <strong>Author:</strong> {blog.author_name}
      </p>
      <p>
        <strong>Subtitle:</strong> {blog.author_subtitle}
      </p>
    </div>
  );
};

export default BlogDetails;
