import { useEffect, useState } from "react";
import type { ShippingType } from "../../models/ShippingType";

const Shipping = () => {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [shippingArray, setShippingArray] = useState<ShippingType[]>([
    {
      id: "1",
      value: "Free",
      description: "Regulary shipment",
      date: "17 Oct, 2023",
      selected: true,
    },
    {
      id: "2",
      value: "$8.50",
      description: "Get your delivery as soon as possible",
      date: "1 Oct, 2023",
      selected: false,
    },
    {
      id: "3",
      value: "Schedule",
      description: "Pick a date when you want to get your delivery",
      selected: false,
    },
  ]);

  const handleSelectshipping = (id: string) => {
    setSelectedId(id);
  };

  useEffect(() => {
    const updatedShipping = shippingArray.map((shipping) => {
      if (shipping.id === selectedId) {
        return { ...shipping, selected: true };
      }
      return { ...shipping, selected: false };
    });

    setShippingArray(updatedShipping);
  }, [selectedId]);

  return (
    <section className="flex flex-col gap-8 max-w-[1120px] m-auto py-12">
      <h1 className="font-semibold text-xl">Shipment Method</h1>
      <ul className="flex flex-col gap-6">
        {shippingArray.map((shipping) => (
          <li
            className="flex items-center p-6 border-[#D1D1D8] border-1 rounded-[11px] w-full"
            key={shipping.id}
          >
            <div className="flex max-md:items-center justify-between gap-4 w-full">
              <div className="flex max-md:flex-col gap-4">
                <div
                  onClick={() => handleSelectshipping(shipping.id)}
                  className="flex items-center justify-center w-6 h-6 rounded-full border-2 cursor-pointer"
                >
                  {selectedId == shipping.id ? (
                    <div className="w-3 h-3 rounded-full bg-black "></div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <span
                  className={`font-medium max-w-[500px] max-md:max-w-40 ${
                    !shipping.selected && "opacity-40"
                  }`}
                >
                  {shipping.value}
                </span>
                <span
                  className={`text-[#17183B] max-w-[500px]  ${
                    !shipping.selected && "opacity-40"
                  } ${shippingArray[2].id == shipping.id ? "max-md:max-w-none" : "max-md:max-w-40"}`}
                >
                  {shipping.description}
                </span>
              </div>
              <span
                className={`text-[#17183B] ${
                  !shipping.selected && "opacity-40"
                }`}
              >
                {shipping.date}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Shipping;
