import React, { useEffect } from "react";
import { useGlobal } from "../../hooks/useGlobal";
import creditCard from "../../assets/img/credit-card.png";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import type { PaymentType } from "../../models/PaymentType";

const Payment = () => {
  const { cart, getProductsInCart } = useGlobal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PaymentType>();

  useEffect(() => {
    getProductsInCart();
  }, []);

  const onSubmit = (data: PaymentType) => {
    console.log(data);
  };

  return (
    <div className="flex gap-24">
      {/* summary  */}
      <div className="flex flex-col gap-6 flex-1 max-w-[512px] box-border p-8 border-1 border-[#EBEBEB] rounded-[10px]">
        <h2 className="font-medium text-xl">Summary</h2>
        <ul className="flex flex-col gap-4">
          {cart.map((product) => (
            <li className="flex gap-4 items-center p-4 bg-[#F6F6F6] rounded-[13px]">
              <img
                src={product.url_image}
                alt={product.name}
                className="w-10"
              />
              <span className="truncate w-[300px] font-medium">
                {product.name}
              </span>
              <span className="text-xs opacity-60">x{product.amount}</span>
              <span className="font-bold">${product.price}</span>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="text-[#545454] text-sm font-medium">Address</h3>
          <span>1131 Dusty Townline, Jacksonville, TX 40322</span>
        </div>
        <div>
          <h3 className="text-[#545454] text-sm font-medium">
            Shipping Method
          </h3>
          <span>Free</span>
        </div>
        <strong className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>$2347</span>
        </strong>
        <div className="flex justify-between">
          <span className="text-[#545454]">Estimated Tax</span>
          <span>$50</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#545454]">Estimated shipping & Handling</span>
          <span>$29</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold">$2426</span>
        </div>
      </div>
      {/* Payment  */}
      <div className="flex flex-col gap-6 flex-1 max-w-[512px]">
        <h2 className="font-bold text-xl">Payment</h2>
        <nav className="flex items-center gap-14">
          <span className="border-b-1 h-8">Credit Card</span>
          <span className="text-[#717171] h-8">Pay Pal</span>
          <span className="text-[#717171] h-8">Pay Pal Credit</span>
        </nav>
        <img src={creditCard} alt="credit card" className="w-[337px]" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            id="name"
            placeholder="Cardholder Name"
            className="p-4 border-1 border-[#CECECE] rounded-[7px] outline-0 w-full"
            {...register("name", { required: "Card name is required." })}
          />
          <p className="text-red-700">{errors.name?.message}</p>
          <input
            type="text"
            id="cardNumber"
            placeholder="Card Number"
            className="p-4 border-1 border-[#CECECE] rounded-[7px] outline-0 w-full"
            {...register("cardNumber", {
              required: "Card number is required.",
            })}
          />
          <p className="text-red-700">{errors.cardNumber?.message}</p>
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                id="expDate"
                placeholder="Exp. Date"
                className="p-4 border-1 border-[#CECECE] rounded-[7px] outline-0 w-full"
                {...register("expDate", {
                  required: "Expiration date is required.",
                })}
              />
              <p className="text-red-700">{errors.expDate?.message}</p>
            </div>
            <div>
              <input
                type="text"
                id="cvv"
                placeholder="CVV"
                className="p-4 border-1 border-[#CECECE] rounded-[7px] outline-0 w-full"
                {...register("name", { required: "Card CVV is required." })}
              />
              <p className="text-red-700">{errors.cvv?.message}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center pt-4">
            <input type="checkbox" className="bg-black" />
            <span>Same as billing address</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
