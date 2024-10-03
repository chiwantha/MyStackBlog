import { Link } from "react-router-dom";
import StackButton from "../../components/StackButton";
import { useRef, useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import "tailwindcss/tailwind.css"; // Ensure Tailwind is imported

const BlogEditor = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const placeholder = "Start typing your content...";
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = [
    "Skill Development",
    "Talent Development",
    "Professional Development",
    "Networking Strategies",
    "Influence and Persuasion",
    "Public Speaking Techniques",
  ];

  const handleCategoryChange = (event) => {
    const inputValue = event.target.value;
    setSelectedCategory(inputValue);

    if (inputValue) {
      const filteredSuggestions = categories.filter((category) =>
        category.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (category) => {
    setSelectedCategory(category);
    setSuggestions([]);
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      uploader: {
        insertImageAsBase64URI: true, // Enables image upload as base64
      },
    }),
    [placeholder],
  );

  return (
    <div className="my-3 space-y-3" style={{ flex: 4 }}>
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl border border-slate-300/50 bg-slate-100 p-2 text-blue-500 dark:border-slate-600/50 dark:bg-slate-800">
        <h2 className="text-xl font-bold">Happy to Share ...</h2>
        <Link to="/feed">
          <StackButton fill={1} label={"Back to Feed"} rounded={"lg"} />
        </Link>
      </div>
      {/* Content */}
      <div className="bg-white dark:bg-slate-800 px-2 py-4 space-y-3 rounded-xl">
        {/* Title */}
        <div className="space-y-1 flex-col flex">
          <span className="text-neutral-400">Blog Title</span>
          <input
            type="text"
            className="border-neutral-400 border p-2 rounded-lg"
            placeholder="Title Here ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Category */}
        <div className="space-y-1 flex-col flex relative">
          <span className="text-neutral-400">Select Category</span>
          <input
            type="text"
            className="border-neutral-400 border p-2 rounded-lg"
            placeholder="Select a category..."
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          {suggestions.length > 0 && (
            <ul className="absolute border bg-neutral-300 z-50 top-[74px] w-full border-neutral-400 rounded-lg max-h-60 overflow-auto">
              {suggestions.map((category, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Image */}
        <div className="flex flex-col space-y-1">
          <span className="text-neutral-400">Blog Image</span>
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
                  }}
                  className="absolute top-1 right-3 mt-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-full transition-all"
                >
                  X
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer
                    bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-6 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
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
                </label>
              </div>
            )}
          </div>
        </div>
        {/* Blog Content */}
        <div className="space-y-1">
          <span className="text-neutral-400">Blog Content</span>
          {/* Text Editor */}
          <div>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
        <div>
          <StackButton label={"Create Blog"} />
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
