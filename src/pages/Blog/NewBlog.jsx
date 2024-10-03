import { Link } from "react-router-dom";
import StackButton from "../../components/StackButton";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill Snow Theme
import "tailwindcss/tailwind.css"; // Ensure Tailwind is imported

const BlogEditor = () => {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [title, setTitle] = useState("");

  // Function to handle creating a blog
  const handleCreateBlog = () => {
    // Placeholder for handling the blog creation logic
    // console.log("Creating blog with the following data:");
    // console.log("Title:", title);
    // console.log("Category:", selectedCategory);
    console.log("Content length:", value.length); // Check the length
    console.log("Content:", value);

    // Here you will implement the API call to save the blog data
    // For example, using fetch or axios to send a POST request to your backend
  };

  const categories = [
    "Cars",
    "Technology",
    "Cloud Computing",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Blockchain Technology",
    "Travel",
    "Health",
    "Finance",
    "Education",
    "Lifestyle",
    "Food",
    "Sports",
    "Entertainment",
    "Real Estate",
    "Automobile",
    "Photography",
    "Fashion",
    "Music",
    "Film",
    "Gaming",
    "Art",
    "History",
    "Literature",
    "Politics",
    "Science",
    "Nature",
    "Parenting",
    "Relationships",
    "Personal Finance",
    "Mental Health",
    "Fitness",
    "Wellness",
    "Self-Improvement",
    "Sustainability",
    "Nonprofit",
    "Philanthropy",
    "Social Media",
    "Marketing",
    "Content Creation",
    "Cryptocurrency",
    "E-commerce",
    "Startups",
    "Project Management",
    "Leadership",
    "Public Speaking",
    "Networking",
    "Career Development",
    "Human Resources",
    "Corporate Culture",
    "Real Estate Investment",
    "Home Improvement",
    "Interior Design",
    "DIY Projects",
    "Gardening",
    "Pets",
    "Travel Tips",
    "Adventure",
    "Outdoor Activities",
    "Cooking",
    "Baking",
    "Healthy Eating",
    "Food Trends",
    "Wine",
    "Craft Beer",
    "Gourmet",
    "Veganism",
    "Nutrition",
    "Home Remedies",
    "Cultural Studies",
    "Religion",
    "Spirituality",
    "Philosophy",
    "Psychology",
    "Sociology",
    "Anthropology",
    "Archaeology",
    "Mythology",
    "Folklore",
    "Environmental Science",
    "Astrophysics",
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Statistics",
    "Economics",
    "Geography",
    "Geopolitics",
    "Global Issues",
    "Climate Change",
    "Urban Development",
    "Architecture",
    "Transportation",
    "Aerospace",
    "Marine Biology",
    "Wildlife Conservation",
    "Renewable Energy",
    "Public Health",
    "Disaster Management",
    "Emergency Preparedness",
    "Legal Studies",
    "Criminal Justice",
    "Cyber Law",
    "Intellectual Property",
    "International Relations",
    "Trade",
    "Economics",
    "Cultural Criticism",
    "Social Justice",
    "Human Rights",
    "Gender Studies",
    "LGBTQ+ Issues",
    "Disability Rights",
    "Racial Justice",
    "Immigration",
    "Community Development",
    "Activism",
    "Volunteerism",
    "Grassroots Movements",
    "Digital Marketing",
    "SEO",
    "Branding",
    "Advertising",
    "Graphic Design",
    "Web Design",
    "User Experience",
    "Content Strategy",
    "Email Marketing",
    "Influencer Marketing",
    "Affiliate Marketing",
    "Analytics",
    "Market Research",
    "Public Relations",
    "Crisis Management",
    "Event Planning",
    "Customer Service",
    "Sales Techniques",
    "Negotiation",
    "Customer Relationship Management",
    "Retail Management",
    "Supply Chain Management",
    "E-commerce Platforms",
    "Dropshipping",
    "Subscription Services",
    "Mobile Apps",
    "Game Development",
    "Virtual Reality",
    "Augmented Reality",
    "Artificial Intelligence Applications",
    "Machine Learning",
    "Data Analysis",
    "Big Data",
    "Cloud Services",
    "Cybersecurity Solutions",
    "Network Administration",
    "DevOps",
    "Software Development",
    "Web Applications",
    "Mobile Development",
    "Database Management",
    "Blockchain Applications",
    "Fintech",
    "Insurtech",
    "EdTech",
    "HealthTech",
    "LegalTech",
    "Agritech",
    "Smart Cities",
    "Internet of Things",
    "Wearable Technology",
    "Gadget Reviews",
    "Tech News",
    "Productivity Tools",
    "Project Collaboration Tools",
    "Remote Work",
    "Work-Life Balance",
    "Time Management",
    "Goal Setting",
    "Mindfulness",
    "Meditation",
    "Yoga",
    "Pilates",
    "Martial Arts",
    "Outdoor Sports",
    "Team Sports",
    "Individual Sports",
    "Extreme Sports",
    "Fitness Challenges",
    "Weight Loss",
    "Nutrition Supplements",
    "Healthy Habits",
    "Lifestyle Changes",
    "Aging",
    "Retirement Planning",
    "Senior Living",
    "Long-term Care",
    "Insurance Planning",
    "Investment Strategies",
    "Stock Market",
    "Real Estate Trends",
    "Financial Independence",
    "Debt Management",
    "Saving Strategies",
    "Tax Planning",
    "Estate Planning",
    "Legacy Building",
    "Charitable Giving",
    "End-of-Life Planning",
    "Crisis Communication",
    "Workplace Diversity",
    "Team Building",
    "Employee Engagement",
    "Performance Management",
    "Talent Acquisition",
    "Recruitment Strategies",
    "Job Search Tips",
    "Resume Writing",
    "Interview Techniques",
    "Career Transitions",
    "Freelancing",
    "Gig Economy",
    "Workplace Culture",
    "Employee Benefits",
    "Remote Team Management",
    "Conflict Resolution",
    "Organizational Behavior",
    "Change Management",
    "Succession Planning",
    "Executive Coaching",
    "Life Coaching",
    "Career Coaching",
    "Financial Coaching",
    "Health Coaching",
    "Personal Development",
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

  // Modules for the toolbar with all necessary tools
  const modules = {
    toolbar: [
      [
        {
          font: [
            "Arial",
            "Courier",
            "Georgia",
            "Times New Roman",
            "Verdana",
            "sans-serif",
            "serif",
            "monospace",
          ],
        },
        { size: ["small", "normal", "large", "huge"] },
      ], // Font and Size
      ["bold", "italic", "underline", "strike"], // Bold, italic, underline, strikethrough
      [{ header: 1 }, { header: 2 }], // Headers
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ align: [] }], // Alignment
      ["blockquote", "code-block"], // Blockquote, code block
      [{ color: [] }, { background: [] }], // Font color and background
      ["link", "image"], // Links and images
      ["clean"], // Clear formatting
    ],
  };

  // Formats supported by the editor
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "list",
    "bullet",
    "align",
    "blockquote",
    "code-block",
    "color",
    "background",
    "link",
    "image",
  ];

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
        <div className="space-y-2 flex-col flex">
          <span className="text-neutral-400 ">Blog Title</span>
          <input
            type="text"
            className="border-neutral-400 border p-2 rounded-lg"
            placeholder="Title Here ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2 flex-col flex relative">
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
        <div className="space-y-2 ">
          <span className="text-neutral-400">Blog Content</span>
          {/* Text Editor */}
          <div className="">
            <ReactQuill
              className="overflow-hidden border-1 border-neutral-200 bg-white rounded-lg"
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder="Write your blog content here..."
            />
          </div>
        </div>

        <div className="" onClick={handleCreateBlog}>
          <StackButton label={"Create Blog"} />
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
