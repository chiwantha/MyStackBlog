import CardPannel from "../../components/CardPannel";

const Feed = () => {
  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      <CardPannel title={"Uploads"} btn={0} />
      <CardPannel title={"Latest Blogs"} from={1} to={4} btn={0} />
    </div>
  );
};

export default Feed;
