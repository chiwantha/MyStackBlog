import WelcomeBanner from "../../components/WelcomeBanner";
import CardPannel from "../../components/CardPannel";
import Categories from "../../components/Categories";
const Home = () => {
  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      <WelcomeBanner />
      <CardPannel title={"Latest Blogs"} from={0} to={3} />
      <Categories />
      <CardPannel title={"Popular Blogs"} from={3} to={7} />
    </div>
  );
};

export default Home;
