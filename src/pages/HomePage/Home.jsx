import WelcomeBanner from "../../components/WelcomeBanner";
import CardPannel from "./CardPannel";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="space-y-3">
      <WelcomeBanner />
      <CardPannel title={"Latest Blogs"} />
      <Categories />
      <CardPannel title={"Popular Blogs"} from={4} to={7} />
    </div>
  );
};

export default Home;
