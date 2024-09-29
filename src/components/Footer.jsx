import logo from "../assets/logo/mystacklogo.png";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

// Constants for categories, social media, and best posts
const CATEGORIES = [
  "Java",
  "AI",
  "Music",
  "Movies",
  "Web Development",
  "Arduino",
];

const BEST_POSTS = [
  "Java Programming Tips",
  "AI: The Future",
  "Music Production Tips",
  "Movies to Watch in 2024",
  "Web Development Trends",
  "Arduino Basics",
];

const SOCIAL_MEDIA = {
  icons: [
    {
      id: 1,
      icon: <FaFacebookF className="h-6 w-6" />,
      url: "https://facebook.com/chiwantha",
      color: "text-blue-500",
      label: "Facebook",
    },
    {
      id: 2,
      icon: <FaGithub className="h-6 w-6" />,
      url: "https://github.com/chiwantha",
      color: "text-black",
      label: "Github",
    },
    {
      id: 3,
      icon: <FaLinkedinIn className="h-6 w-6" />,
      url: "https://linkedin.com/in/kasun-chiwantha-5168b4323",
      color: "text-cyan-500",
      label: "LinkedIn",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t-4 border-orange-950/70 dark:border-orange-600">
      {/* top container */}
      <div className="bg-orange-500/50">
        <div className="mx-2">
          <div className="mx-auto max-w-7xl py-2">
            <div className="space-y-3 py-4">
              <div className="flex justify-center text-4xl font-bold text-orange-700 dark:text-white">
                <h3>SUBSCRIBE TO NEWSLETTER</h3>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full rounded-lg px-2 py-2"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* center container */}
      <div className="bg-orange-500/20 dark:bg-[#222]">
        <div className="mx-2">
          <div className="mx-auto max-w-7xl py-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Footer Profile */}
              <div className="space-y-3">
                <img src={logo} alt="mystacklogo" width={100} />
                <p className="border-t border-orange-500 pt-2 dark:border-orange-400/40 dark:text-white">
                  At MY STACK, we consistently bring you the latest updates,
                  trends, and insights to keep you informed and inspired every
                  day.
                </p>
                <div className="flex justify-evenly rounded-xl border border-orange-500 bg-white/30 py-4 shadow-lg dark:border-orange-400/40 dark:bg-[#555]">
                  {SOCIAL_MEDIA.icons.map((link) => (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link.color}`}
                      key={link.id}
                      aria-label={link.label} // Added for accessibility
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3 border-l border-orange-800 px-5 dark:border-orange-400/40">
                <h1 className="text-3xl font-bold text-orange-600">
                  Categories
                </h1>
                <ul className="pl-4 text-lg dark:text-neutral-300">
                  {CATEGORIES.map((cat, index) => (
                    <li
                      className="hover:font-bold hover:text-orange-500 dark:hover:text-orange-300"
                      key={index}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Posts */}
              <div className="space-y-3 border-l border-orange-800 px-5">
                <h1 className="text-3xl font-bold text-orange-600">
                  Best Posts
                </h1>
                <ul className="pl-4 text-lg dark:text-neutral-300">
                  {BEST_POSTS.map((post, index) => (
                    <li
                      className="hover:font-bold hover:text-orange-500 dark:hover:text-orange-300"
                      key={index}
                    >
                      {post}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 border-l border-orange-800 px-5">
                <h1 className="text-3xl font-bold text-orange-600">Contact</h1>
                <ul className="pl-4 text-lg dark:text-neutral-300">
                  <li>
                    <a
                      href="mailto:info@mystack.kchord.com"
                      className="hover:font-bold hover:text-orange-500 dark:text-neutral-300 dark:hover:text-orange-300"
                    >
                      info@mystack.kchord.com
                    </a>
                  </li>
                  <li>Contact: +94 78 880 6670</li>
                  <li>
                    Address: 361/23 Parangoda, Dekatana,{" "}
                    <span className="font-bold italic text-blue-800 hover:scale-105 hover:text-orange-500 dark:text-green-500">
                      <a
                        target="_blank"
                        href="https://www.google.com/search?q=sri+lanka&oq=sri+lanka&gs_lcrp=EgZjaHJvbWUqBwgAEAA
                      YjwIyBwgAEAAYjwIyEggBEC4YQxiDARixAxiABBiKBTIGCAIQRRg7MgYIAxBFGDsyBggEECMYJzIGCAUQRRg9MgYI
                      BhBFGDwyBggHEEUYPdIBCDg5MjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
                      >
                        Sri Lanka
                      </a>
                    </span>
                  </li>
                  <li>
                    <a
                      href="http://www.kchord.com"
                      className="hover:font-bold hover:text-orange-500"
                    >
                      www.kchord.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* btn container */}
      <div className="bg-orange-700 py-4 text-white">
        <div className="mx-2">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <h2>© 2024 K-Chord Group ( PVT ) LTD</h2>
              <h2>Developed by Kasun Chiwantha</h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
