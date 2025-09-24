import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 items-center justify-center h-[500px] mt-[88px] px-4">
        <h1 className="font-bold text-7xl">404</h1>
        <h2 className="font-semibold text-xl">Error 404, page not found</h2>
        <p className="text-gray-3 text-center">
          The post or page that you are looking for either has just moved or
          doesn't exists in this server.
        </p>
        <Link to="/">
          <button className="flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[8px] h-[48px] w-[188px] max-md:w-[140px] max-md:text-sm font-semibold px-4">
            Return to Home
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
