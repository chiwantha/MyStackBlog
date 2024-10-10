import Dna from "../../components/Dna";

const About = () => {
  return (
    <div className="my-3 space-y-3" style={{ flex: 4 }}>
      <div className="rounded-xl py-5 px-3 border border-slate-300/50 bg-slate-100 dark:border-slate-600/50 dark:bg-slate-800">
        <h1 className="text-3xl text-orange-500 font-bold">SITE DNA</h1>
        <div className="text-slate-400">
          <Dna />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-slate-200 rounded-xl py-5 px-3"></div>
        <div className="bg-slate-200 rounded-xl py-5 px-3"></div>
      </div>
    </div>
  );
};

export default About;
