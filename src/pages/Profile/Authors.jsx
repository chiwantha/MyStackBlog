import AuthorList from "../../components/AuthorList";

const Authors = () => {
  const scrollToTop = async () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // For smooth scrolling
    });
  };
  scrollToTop();
  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      <AuthorList />
    </div>
  );
};

export default Authors;
