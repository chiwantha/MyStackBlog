import Background from "./components/Background";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage/Home";

function App() {
  return (
    <div className="select-none antialiased">
      <Background />
      <Navbar />
      <div className="mx-2">
        <div className="mx-auto max-w-7xl py-3">
          <Home />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
