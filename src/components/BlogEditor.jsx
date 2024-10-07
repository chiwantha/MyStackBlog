import StackButton from "./StackButton";
import { useMemo, useState, useContext, useEffect, useCallback } from "react";
import JoditEditor from "jodit-react";
import "tailwindcss/tailwind.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { DarkModeContext } from "../context/darkModeContext";

const BlogEditor = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [category, setcategory] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [err, seterr] = useState("");
  const queryClient = useQueryClient();
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    intro: "",
    content: "",
    img: "",
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await makeRequest.get("/blog/category");
      return res.data;
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setcategory(data.map((cat) => cat.category)); // Extract and set categories
    }
  }, [data, isSuccess]);

  const config = useMemo(
    () => ({
      theme: darkMode && "dark",
      readonly: false,
      disablePlugins: "add-new-line",
      placeholder: "Start typing your content...",
      uploader: {
        insertImageAsBase64URI: true, // Enables image upload as base64
      },
    }),
    [darkMode],
  );

  const upload = async () => {
    try {
      const formdata = new FormData();
      formdata.append("file", file);
      const res = await makeRequest.post("/upload/image", formdata);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const triggerFileInput = () => {
    document.getElementById("dropzone-file").click();
  };

  const handleContentChange = useCallback((newContent) => {
    setInputs((prev) => ({ ...prev, content: newContent }));
  }, []);

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation({
    mutationKey: ["newBlog"],
    mutationFn: async (newBlog) => {
      return await makeRequest.post("/blog/new", newBlog);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("feed");
      queryClient.invalidateQueries("postPannel");
    },
    onError: (error) => {
      // Accessing error response from the server
      if (error.response) {
        // Server responded with a status other than 200
        seterr(error.response.data); // Use the message from the server response
      } else if (error.request) {
        // The request was made but no response was received
        seterr("No response from the server");
      } else {
        // Something happened in setting up the request
        seterr("Error: " + error.message);
      }
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (file) inputs.img = await upload();
    mutation.mutate(inputs);
    setInputs({
      title: "",
      category: "",
      intro: "",
      content: "",
      img: "",
    });
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 px-2 py-4 space-y-5 rounded-xl">
      {/* Title */}
      <div className="space-y-1 flex-col flex">
        <span className="text-orange-400">Blog Title</span>
        <input
          type="text"
          className=" border p-2 rounded-lg bg-gray-50
           dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:text-neutral-300"
          placeholder="Title Here ..."
          value={inputs.title}
          name="title"
          onChange={handleInputChange}
        />
      </div>

      {/* Category */}
      <div className="space-y-1 flex-col flex relative">
        <span className="text-orange-400">Select Category</span>
        <select
          className="border p-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600
          dark:text-neutral-300 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          value={inputs.category}
          name="category"
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select a category...
          </option>
          {category.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Intro */}
      <div className="space-y-1 flex-col flex relative">
        <div className="">
          <span className="text-orange-400">Blog Intro</span>
          {inputs.intro.length > 0 && (
            <span
              className={`ml-2 ${
                90 <= inputs.intro.length && inputs.intro.length <= 100
                  ? "text-green-500"
                  : "text-red-400"
              }`}
            >
              {`(text length: ${inputs.intro.length}/100)`}
            </span>
          )}
        </div>
        <textarea
          className="border p-2 rounded-lg bg-gray-50
          dark:text-neutral-300 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          placeholder="Give an introduction to your blog ..."
          rows={3}
          value={inputs.intro}
          name="intro"
          onChange={handleInputChange}
          maxLength={100}
        />
      </div>

      {/* Image */}
      <div className="flex flex-col space-y-1">
        <span className="text-orange-400">Blog Image</span>
        <div className="flex flex-col-reverse">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Image Preview"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setFile(null); // Clear the file as well
                }}
                className="absolute top-1 right-3 mt-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-full transition-all"
              >
                X
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <div
                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg 
              cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                onClick={triggerFileInput}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Content */}
      <div className="space-y-1">
        <span className="text-orange-400">Blog Content</span>
        <div>
          <JoditEditor
            value={inputs.content}
            config={config}
            tabIndex={1}
            onChange={handleContentChange} // Update the content in the state
          />
        </div>
      </div>

      {err && (
        <div className="mt-5  py-2 bg-red-300 flex dark:bg-red-800 dark:text-white justify-center rounded-lg">
          {err}
        </div>
      )}

      <div onClick={handleClick}>
        <StackButton label={"Create Blog"} />
      </div>
    </div>
  );
};

export default BlogEditor;
