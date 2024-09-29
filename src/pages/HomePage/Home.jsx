import WelcomeBanner from "../../components/WelcomeBanner";
import CardPannel from "./CardPannel";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="my-2 space-y-6" style={{ flex: 4 }}>
      <WelcomeBanner />
      <CardPannel title={"Latest Blogs"} />
      <Categories />
      <CardPannel title={"Popular Blogs"} from={4} to={7} />
    </div>
  );
};

export default Home;
