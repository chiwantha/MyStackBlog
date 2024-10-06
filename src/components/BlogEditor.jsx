import StackButton from "./StackButton";
import { useRef, useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import "tailwindcss/tailwind.css";

const BlogEditor = () => {
  const [inputs, setInputs] = useState({
    title: "",
    selectedCategory: "",
    intro: "",
    content: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [preview, setPreview] = useState(null);

  const editor = useRef(null);

  const categories = useMemo(
    () => [
      "Skill Development",
      "Talent Development",
      "Professional Development",
      "Networking Strategies",
      "Influence and Persuasion",
      "Public Speaking Techniques",
    ],
    [],
  );

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your content...",
      toolbar: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|", // Separator
        "font",
        "fontsize",
        "paragraph", // Add heading options
        "|",
        "unorderedlist",
        "orderedlist",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "clean",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    [],
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const triggerFileInput = () => {
    document.getElementById("dropzone-file").click();
  };

  const handleCategoryChange = (event) => {
    const inputValue = event.target.value;
    setInputs((prev) => ({ ...prev, selectedCategory: inputValue }));

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
    setInputs((prev) => ({ ...prev, selectedCategory: category }));
    setSuggestions([]);
  };

  const handleIntroChange = (e) => {
    const newIntro = e.target.value.slice(0, 100);
    setInputs((prev) => ({ ...prev, intro: newIntro }));
  };

  const handleTitleChange = (e) => {
    setInputs((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (newContent) => {
    setInputs((prev) => ({ ...prev, content: newContent }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 px-2 py-4 space-y-5 rounded-xl">
      {/* Title */}
      <div className="space-y-1 flex-col flex">
        <span className="text-orange-400">Blog Title</span>
        <input
          type="text"
          className="border-neutral-400 border p-2 rounded-lg"
          placeholder="Title Here ..."
          value={inputs.title}
          onChange={handleTitleChange}
        />
      </div>

      {/* Category */}
      <div className="space-y-1 flex-col flex relative">
        <span className="text-orange-400">Select Category</span>
        <input
          type="text"
          className="border-neutral-400 border p-2 rounded-lg"
          placeholder="Select a category..."
          value={inputs.selectedCategory}
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

      {/* Intro */}
      <div className="space-y-1 flex-col flex relative">
        <div>
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
          className="border-neutral-400 border p-2 rounded-lg"
          placeholder="Give an introduction to your blog ..."
          rows={3}
          value={inputs.intro}
          onChange={handleIntroChange}
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
                onClick={() => setPreview(null)}
                className="absolute top-1 right-3 mt-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-full transition-all"
              >
                X
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <div
                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                onClick={triggerFileInput}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17l10-10m0 0L7 7m10 10V7a4 4 0 00-4-4H6a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4z"
                    />
                  </svg>
                  <p className="text-gray-400">Click to upload or drop file</p>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <span className="text-orange-400">Blog Content</span>
        <JoditEditor
          ref={editor}
          value={inputs.content}
          config={config}
          tabIndex={1}
          onChange={handleContentChange} // Update the content in the state
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <StackButton />
      </div>
    </div>
  );
};

export default BlogEditor;
