import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Address from "../components/ui/Address";
import localIcon from "../assets/img/location.svg";
import shippingIcon from "../assets/img/shipping.svg";
import paymentIcon from "../assets/img/payment.svg";
import { useState } from "react";
import Shipping from "../components/ui/Shipping";
import { useNavigate } from "react-router-dom";
import Payment from "../components/ui/Payment";

interface StepType {
  step: string;
  name: string;
  icon: string;
  active: boolean;
}

const Steps = () => {
  const [steps, setSteps] = useState<StepType[]>([
    { step: "step 1", name: "Address", icon: localIcon, active: true },
    { step: "step 2", name: "Shipping", icon: shippingIcon, active: false },
    { step: "step 3", name: "Payment", icon: paymentIcon, active: false },
  ]);
  const navigate = useNavigate()

  const goNext = () => {
    const currentIndex = steps.findIndex((step) => step.active);

    if (currentIndex === 2) {
      return;
    }

    const updatedSteps = steps.map((step, index) => {
      if (index === currentIndex) {
        return { ...step, active: false };
      }
      if (index === currentIndex + 1) {
        return { ...step, active: true };
      }
      return step;
    });

    setSteps(updatedSteps);
  };

  const goBack = () => {
    const currentIndex = steps.findIndex((step) => step.active);

    if (currentIndex === 0) {
      navigate("/cart")
    }

    const updatedSteps = steps.map((step, index) => {
      if (index === currentIndex) {
        return { ...step, active: false };
      }
      if (index === currentIndex - 1) {
        return { ...step, active: true };
      }
      return step;
    });

    setSteps(updatedSteps);
  };
  return (
    <>
      <Header />
      <main className="mt-[88px] max-w-[1120px] m-auto">
        <div className="flex justify-between py-18">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${!step.active && "opacity-30"} flex gap-2`}
            >
              <img src={step.icon} alt={step.name} />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{step.step}</span>
                <span className="text-[19px] font-medium">{step.name}</span>
              </div>
            </div>
          ))}
        </div>
        {steps[0].active && (
          <section>
            <Address />
          </section>
        )}
        {steps[1].active && (
          <section>
            <Shipping />
          </section>
        )}
        {steps[2].active && (
          <section>
            <Payment />
          </section>
        )}
        <div className="flex gap-6 justify-end pb-12">
          <button
            onClick={goBack}
            className={`flex items-center justify-center transparent hover:bg-gray-1 transition duration-300 text-black border-1 cursor-pointer rounded-[6px] h-16 w-52 ${steps[2].active && "w-61"}`}
          >
            <span className="font-semibold">Back</span>
          </button>
          <button
            onClick={goNext}
            className={`flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[6px] h-16 w-52 ${steps[2].active && "w-61"}`}
          >
            <span className="font-semibold">
              {steps[2].active ? "Pay" : "Next"}
            </span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Steps;
