import { useEffect } from "react";
import checkIcon from "../../assets/img/check.png";
import { Link } from "react-router-dom";

const SuccessPayment = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] trans bg-white p-8 w-full max-w-[500px] max-md:max-w-80 rounded shadow-2xl z-50">
      <div className="flex flex-col gap-4 items-center justify-center">
        <style>
          {`
            @keyframes pulseAnim {
              0% { transform: scale(0.8); }
              50% { transform: scale(1.2); }
              70% { transform: scale(0.9); }
              100% { transform: scale(1); }
            }
          `}
        </style>
        <img
          src={checkIcon}
          alt="check icon"
          className="w-16 h-16 m-auto animate-[pulseAnim_1.5s_ease-in-out_forwards]"
        />
        <h1 className="font-semibold text-xl pb-4 text-center">
          purchase made successfully!
        </h1>
        <p className="text-center font-medium">
          Thank you for shopping at Cyber ​​Web. Your purchase will arrive soon.
          I hope you enjoy it!
        </p>
        <p className="text-center">Continue exploring our products!</p>
        <Link to="/">
          <button className="flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[8px] h-[48px] w-[188px] max-md:w-[140px] max-md:text-sm font-semibold px-4 mt-8">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
