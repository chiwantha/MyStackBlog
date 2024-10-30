import WelcomeBanner from "../../components/WelcomeBanner";
import CardPannel from "../../components/CardPannel";
import Categories from "../../components/Categories";
import AuthorPannel from "../../components/AuthorPannel";
const Home = () => {
  const scrollToTop = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling
    });
  };
  scrollToTop();
  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      <WelcomeBanner />
      <CardPannel title={"Latest Blogs"} from={0} to={3} />
      <Categories />
      <AuthorPannel title={"Top Authors"} link={"/authors"} from={0} to={4} />
      <CardPannel title={"Popular Blogs"} from={3} to={7} />
    </div>
  );
};

export default Home;
