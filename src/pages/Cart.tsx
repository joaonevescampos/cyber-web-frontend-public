import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import closeIcon from "../assets/img/close.svg";
import type { CartItem } from "../models/Cart";
import { Link } from "react-router-dom";
import { useGlobal } from "../hooks/useGlobal";
import type { Summary } from "../models/Summary";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    getProductsInCart,
    updateAmount,
    storeSummary,
    summary,
  } = useGlobal();
  const [subtotal, setSubtotal] = useState(summary.subtotal);
  const tax = subtotal == 0 ? 0 : 50;
  const shippingHandling = subtotal == 0 ? 0 : 29;

  const sumProductsPrices = (cart: CartItem[]) => {
    const sumPrices = cart.reduce((acc, current) => {
      return acc + current.price * current.amount;
    }, 0);
    setSubtotal(sumPrices);
  };

  useEffect(() => {
    const summaryUpdated: Summary = {
      subtotal,
      estimatedTax: tax,
      estimatedShip: shippingHandling,
      total: subtotal + tax + shippingHandling,
    };
    storeSummary(summaryUpdated);
  }, [subtotal]);

  const decreaseAmount = (id: number, currentAmount: number) => {
    if (currentAmount === 1) {
      console.log("Cannot decrease the amount");
    } else {
      updateAmount(id, currentAmount - 1);
    }
  };

  const increaseAmount = (id: number, currentAmount: number) => {
    updateAmount(id, currentAmount + 1);
  };

  useEffect(() => {
    getProductsInCart();
  }, []);

  useEffect(() => {
    sumProductsPrices(cart);
  }, [cart]);

  return (
    <>
      <Header />
      <main className="flex max-lg:flex-col gap-12 py-[112px] max-lg:py-[50px] max-md:py-10 max-lg:px-16 max-md:px-4 mt-24 max-w-[1120px] m-auto">
        <section className="flex flex-1 flex-col gap-10">
          <h1 className=" font-semibold text-2xl ">Shopping Cart</h1>
          <div className="flex flex-col gap-10 max-h-[536px] overflow-y-auto">
            {cart.length > 0 ? (
              cart.map((product: CartItem) => (
                <div
                  className="flex items-center gap-6 max-md:gap-2"
                  key={product.id}
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.url_image}
                      alt={product.name}
                      className="w-[90px]"
                    />
                  </Link>
                  <div className="flex max-md:flex-col items-center max-md:items-start gap-6 max-md:gap-2">
                    <div className="flex not-last:gap-4">
                      <div className="w-40 max-lg:w-fit text-start">
                        <h2 className="font-medium">{product.name}</h2>
                        <span className="text-sm">#5645545123</span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-fit">
                      <div className="flex gap-1 h-fit">
                        <button
                          onClick={() =>
                            decreaseAmount(product.id, product.amount)
                          }
                          className={`px-2 cursor-pointer ${
                            product.amount == 1 ? "opacity-30" : "opacity-100"
                          }`}
                        >
                          -
                        </button>
                        <span className="flex items-center justify-center w-12 cursor-pointer border-1 rounded border-[#D9D9D9]">
                          {product.amount}
                        </span>
                        <button
                          onClick={() =>
                            increaseAmount(product.id, product.amount)
                          }
                          className="px-2 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="w-20 font-medium text-xl">
                        $ {product.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="cursor-pointer"
                      >
                        <img src={closeIcon} alt="close icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-4">
                <p>There is no products in the cart</p>
                <Link to="/products/all">
                  <button className="flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[6px] h-[48px] w-48">
                    <span className="font-semibold text-sm">Add products</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>
        <section className="flex-1">
          <div className="flex flex-col gap-6 px-16 py-14 max-md:p-0 max-md:border-0 border-1 border-[#EBEBEB] rounded-xl">
            <h2 className="font-bold text-xl">Order Summary</h2>
            <form className="flex flex-col gap-6">
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="discount" className="text-sm text-[#545454]">
                  Discount code / Promo code
                </label>
                <div className="p-4 border-1 border-[#9F9F9F] rounded-[7px]">
                  <input
                    type="text"
                    className="outline-0 w-full h-6"
                    placeholder="Code"
                  />
                </div>
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="bonus" className="text-sm text-[#545454]">
                  Your bonus card number
                </label>
                <div className="relative flex gap-2 p-4 border-1 border-[#9F9F9F] rounded-[7px]">
                  <input
                    type="number"
                    className="outline-0 w-fit h-6"
                    placeholder="Enter Card Number"
                  />
                  <button className="absolute right-4 top-3 px-6 py-2 border-1 text-xs rounded-[7px] cursor-pointer">
                    Apply
                  </button>
                </div>
              </fieldset>
            </form>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span>$ {subtotal}</span>
              </div>
              <div className="flex flex-col gap-2 text-[#545454]">
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-black">$ {tax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated shipping & Handling</span>
                  <span className="text-black">$ {shippingHandling}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span>$ {subtotal + tax + shippingHandling}</span>
              </div>
            </div>
            {cart.length === 0 ? (
              <div>
                <button className="flex items-center justify-center bg-gray-500 transition duration-300 text-white rounded-[6px] h-[48px] w-full cursor-not-allowed">
                  <span className="font-semibold">Checkout</span>
                </button>
                <p className=" text-sm text-red-700 pt-2">
                  Your cart is empty. Add at least one product to proceed.
                </p>
              </div>
            ) : (
              <Link to="/payment">
                <button className="flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[6px] h-[48px] w-full">
                  <span className="font-semibold">Checkout</span>
                </button>
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
