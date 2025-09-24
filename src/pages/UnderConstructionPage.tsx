import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import toolsIcon from "../assets/img/tools.png";
import { Link } from "react-router-dom";

const UnderConstructionPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow min-h-[70vh] flex items-center justify-center px-4 py-14 mt-[72px]">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Under Construction
          </h1>
          <p className="text-base text-gray-500">
            Sorry, but we're currently working on this feature!
          </p>
          <div className="uc-images mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
            <img
              src={toolsIcon}
              alt="Tools"
              className="w-full max-w-[80px] md:max-w-[110px] lg:max-w-[130px] object-contain"
            />
          </div>
          <Link to="/">
            <button className="flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[8px] h-[48px] w-[188px] max-md:w-[140px] max-md:text-sm font-semibold px-4 mt-8">
              Return to Home
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnderConstructionPage;
