/* eslint-disable react/no-unescaped-entities */
import Dev from "../../assets/images/AboutProfile.jpg";
import { motion } from "framer-motion";
import mystack from "../../assets/images/mystack.png";
import kchord from "../../assets/images/kchord.png";
import devsl from "../../assets/images/devsl.png";

const About = () => {
  return (
    <div className="my-3 space-y-3" style={{ flex: 4 }}>
      <section className="rounded-xl shadow-lg py-5 px-3 border bg-slate-50 border-slate-300/50 dark:border-slate-600/50 dark:bg-slate-800 space-y-3">
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl text-orange-500 font-bold"
        >
          SITE DNA
        </motion.h1>
        <hr className="border-neutral-700" />
        <div className="text-slate-600 dark:text-slate-200 text-[18px]">
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-500">MY-STACK</span> is built on a
            foundation of <span className="text-orange-500">simplicity</span>{" "}
            and <span className="text-orange-500">user engagement.</span> The
            site features a clean and intuitive layout, making navigation easy
            for visitors. Each category is clearly defined, allowing users to
            find relevant content effortlessly. This focus on user experience
            ensures that readers can explore the site without confusion.
          </motion.p>
          <br />
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            The content is crafted to engage and inform, with relevant images
            and concise text. This approach captures the reader's interest and
            encourages deeper exploration. Additionally, the responsive design
            ensures that MY-STACK is accessible on any device, making it easy
            for tech enthusiasts to connect from anywhere.
          </motion.p>
          <br />
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className=""
          >
            A special thanks to{" "}
            <span className="text-orange-500">K-Chord Group</span> for their
            support in hosting <span className="text-orange-500">MY-STACK</span>{" "}
            on their Servers for free, helping us share knowledge with all of
            you!
          </motion.p>
        </div>
      </section>

      <div className="gap-3 grid sm:grid-cols-3 grid-cols-1">
        {[
          { img: kchord, alt: "K-Chord Logo" },
          { img: mystack, alt: "MyStack Logo" },
          { img: devsl, alt: "DevSL Logo" },
        ].map(({ img, alt }, index) => (
          <div
            key={index}
            className="flex justify-center items-center overflow-hidden h-[100px] shadow-md rounded-lg border border-neutral-400 bg-white"
          >
            <img src={img} alt={alt} className="h-full" />
          </div>
        ))}
      </div>

      <section className="border-slate-600/50 bg-slate-800 py-5 rounded-xl px-3 space-y-3">
        <h1 className="text-3xl text-orange-500 font-bold">DEVELOPER DNA</h1>
        <hr className="border-neutral-700 pb-2" />
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="text-slate-100 sm:order-1 flex items-center">
            <pre className="overflow-x-auto">
              <code className="text-[13px] md:text-lg">
                <span className="text-blue-500">const</span> DEV &#123; {"\n"}
                &nbsp;&nbsp;<span className="text-purple-500">name</span>:{" "}
                <span className="text-green-500">"Kasun Chiwantha"</span>,{"\n"}
                &nbsp;&nbsp;<span className="text-purple-500">title</span>:{" "}
                <span className="text-green-500">
                  "Full-Stack Developer & CEO"
                </span>
                ,{"\n"}
                &nbsp;&nbsp;<span className="text-purple-500">company</span>:
                &#123; {"\n"}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-purple-500">name</span>:{" "}
                <span className="text-green-500">
                  "K-Chord Solutions (PVT) LTD"
                </span>
                ,{"\n"}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-purple-500">organization</span>:{" "}
                <span className="text-green-500">"K-Chord Group"</span>, {"\n"}
                &nbsp;&nbsp;&#125;, {"\n"}
                &nbsp;&nbsp;<span className="text-purple-500">contact</span>:
                &#123; {"\n"}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-purple-500">mobile</span>:{" "}
                <span className="text-green-500">
                  ["+94 788806670", "+94 761294262"]
                </span>
                , {"\n"}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-purple-500">email</span>:{" "}
                <span className="text-green-500">"contact@chiwantha.dev"</span>,{" "}
                {"\n"}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-purple-500">linkedin</span>:{" "}
                <span className="text-green-500">
                  "linkedin.com/in/kasun-chiwantha"
                </span>
                , {"\n"}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-purple-500">portfolio</span>:{" "}
                <span className="text-green-500">
                  <a
                    href="https://www.chiwantha.dev"
                    target="_blank"
                    className="hover:text-orange-500"
                  >
                    "chiwantha.dev"
                  </a>
                </span>
                , {"\n"}
                &#125; {"\n"}&#125;;
              </code>
            </pre>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={Dev}
              alt="Developer"
              className="aspect-square w-[70%] rounded-full border-4 border-dashed border-orange-400"
            />
          </div>
        </div>
      </section>

      <section className="py-5 rounded-xl px-3 border bg-slate-200 border-slate-300/50 dark:border-slate-600/50 dark:bg-slate-800 space-y-3">
        <h1 className="text-3xl text-orange-500 font-bold">TECHNOLOGIES</h1>
        <hr className="border-neutral-700 pb-2" />
        <p className="text-slate-600 dark:text-slate-200">
          MY-STACK uses MySQL for data storage, Node.js for server-side logic,
          Express for the backend, and React for a dynamic user interface. This
          combination creates a fast and user-friendly blog platform.
        </p>
      </section>
    </div>
  );
};

export default About;
