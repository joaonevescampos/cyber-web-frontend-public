import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { useGlobal } from "../../hooks/useGlobal";
import creditCard from "../../assets/img/credit-card.png";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import type { PaymentType } from "../../models/PaymentType";
import type { AddressType } from "../../models/AddressType";
import { useAuth } from "@clerk/clerk-react";
import SuccessPayment from "../modal/SuccessPayment";
import ErrorPayment from "../modal/ErrorPayment";

const Payment = forwardRef((_, ref) => {
  const [addressSelected, setAddressSelected] = useState<AddressType>();
  const { getToken } = useAuth();
  const [openSucess, setOpenSucess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const {
    cart,
    getProductsInCart,
    addresses,
    getAddresses,
    summary,
    getSummary,
    shippingSelected,
  } = useGlobal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PaymentType>();

  useEffect(() => {
    getProductsInCart();
    getSummary();
    getAddresses();
  }, []);

  useEffect(() => {
    const addressSelectedFilter = addresses.filter(
      (address) => address.selected === true
    )[0];
    setAddressSelected(addressSelectedFilter);
  }, [addresses]);

  const onSubmit = async (data: PaymentType) => {
    console.log("Form Data:", data);

    try {
      // 1. Monta os produtos para enviar ao backend
      const productsRequest = cart.map((product) => ({
        productId: product.id,
        quantity: product.amount,
      }));

      // 2. Pega o token do usuário
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }
      console.log("Token do Clerk:", token);

      // 3. Cria o carrinho no backend
      const createCartResponse = await fetch(
        "http://localhost:3333/api/shopping_carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ products: productsRequest }),
        }
      );

      if (!createCartResponse.ok) {
        throw new Error("Failed to create shopping cart");
      }

      const createdCart = await createCartResponse.json();
      const cartId = createdCart.shopping_cart_id;

      // 4. Atualiza o status do carrinho para "finalizado"
      const updateStatusResponse = await fetch(
        `http://localhost:3333/api/shopping_carts/${cartId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "finish" }),
        }
      );

      if (!updateStatusResponse.ok) {
        throw new Error("Failed to update cart status");
      }

      // 5. Navega para a página de confirmação
      setOpenSucess(true);
    } catch (error: any) {
      setOpenError(true);
      throw new Error(`Error: ${error}`)
      // alert(error.message || "Something went wrong");
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  const handleCloseModal = () => {
    setOpenSucess(false);
    setOpenError(false);
  };

  return (
    <div className="flex gap-24 max-lg:flex-col max-lg:w-fit max-lg:m-auto">
      {openSucess || openError && (
        <div className="fixed inset-0 top-0 left-0 bg-black opacity-40 z-40 w-full h-full"></div>
      )}
      {openSucess && (<SuccessPayment />)}
      {openError && (<ErrorPayment handleClose={handleCloseModal}/>)}

      {/* summary  */}
      <div className="flex flex-col gap-6 flex-1 max-w-[512px] box-border p-8 max-md:p-4 border-1 border-[#EBEBEB] rounded-[10px]">
        <h2 className="font-medium text-xl">Summary</h2>
        <ul className="flex flex-col gap-4 max-h-[250px] overflow-y-auto">
          {cart.map((product) => (
            <li
              className="flex gap-4 max-md:justify-between items-center p-4 bg-[#F6F6F6] rounded-[13px]"
              key={product.id}
            >
              <img
                src={product.url_image}
                alt={product.name}
                className="w-10"
              />
              <span className="truncate w-[300px] max-md:w-[120px] max-md:text-sm font-medium">
                {product.name}
              </span>
              <span className="text-xs opacity-60">x{product.amount}</span>
              <span className="font-bold">${product.price}</span>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="text-[#545454] text-sm font-medium">Address</h3>
          <span>{addressSelected?.address}</span>
        </div>
        <div>
          <h3 className="text-[#545454] text-sm font-medium">
            Shipping Method
          </h3>
          <span>{shippingSelected.value}</span>
        </div>
        <strong className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>${summary.subtotal}</span>
        </strong>
        <div className="flex justify-between">
          <span className="text-[#545454]">Estimated Tax</span>
          <span>${summary.estimatedTax}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#545454]">Estimated shipping & Handling</span>
          <span>{summary.estimatedShip}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold">${summary.total}</span>
        </div>
      </div>
      {/* Payment  */}
      <div className="flex flex-col gap-6 flex-1 w-full max-w-[512px]">
        <h2 className="font-bold text-xl">Payment</h2>
        <nav className="flex items-center gap-14 max-md:gap-10 text-sm">
          <span className="border-b-1 h-8">Credit Card</span>
          <span className="text-[#717171] h-8">Pay Pal</span>
          <span className="text-[#717171] h-8">Pay Pal Credit</span>
        </nav>
        <img
          src={creditCard}
          alt="credit card"
          className="w-[337px] max-md:m-auto"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            id="name"
            placeholder="Cardholder Name"
            className="p-4 border-1 border-[#CECECE] rounded-[7px] outline-0 w-full"
            {...register("name", { required: "Card name is required." })}
          />
          <p className="text-red-700">{errors.name?.message}</p>
          <Controller
            name="cardNumber"
            control={control}
            rules={{
              required: "Card Number is required",
              validate: (value) =>
                value.replace(/\D/g, "").length === 16 ||
                "Card Number must have 16 digits",
            }}
            render={({ field }) => (
              <PatternFormat
                {...field}
                format="#### #### #### ####"
                mask="_"
                placeholder="Card Number"
                className="p-4 border-1 border-[#9F9F9F] rounded-[7px] outline-0"
              />
            )}
          />
          <p className="text-red-700">{errors.cardNumber?.message}</p>
          <div className="flex gap-4">
            <div>
              <Controller
                name="expDate"
                control={control}
                rules={{
                  required: "Expiration date is required",
                  validate: (value) => {
                    const cleaned = value.replace(/\D/g, "");
                    if (cleaned.length !== 4) {
                      return "Expiration date must have 4 digits";
                    }

                    const month = parseInt(cleaned.substring(0, 2), 10);
                    const year = parseInt("20" + cleaned.substring(2), 10);

                    if (month < 1 || month > 12) {
                      return "Invalid month. Must be 1 to 12";
                    }

                    const now = new Date();
                    const currentMonth = now.getMonth() + 1;
                    const currentYear = now.getFullYear();

                    if (
                      year < currentYear ||
                      (year === currentYear && month < currentMonth)
                    ) {
                      return "Expiration year must be in the future";
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <PatternFormat
                    {...field}
                    format="##/##"
                    mask="_"
                    placeholder="Exp. Date"
                    className="p-4 border-1 border-[#9F9F9F] rounded-[7px] outline-0 w-full"
                  />
                )}
              />
              <p className="text-red-700">{errors.expDate?.message}</p>
            </div>
            <div>
              <Controller
                name="cvv"
                control={control}
                rules={{
                  required: "CVV is required",
                  validate: (value) =>
                    value.replace(/\D/g, "").length === 3 ||
                    "CVV must have 3 digits",
                }}
                render={({ field }) => (
                  <PatternFormat
                    {...field}
                    format="###"
                    mask="_"
                    placeholder="CVV"
                    className="p-4 border-1 border-[#9F9F9F] rounded-[7px] outline-0 w-full"
                  />
                )}
              />
              <p className="text-red-700">{errors.cvv?.message}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center pt-4">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded border border-gray-400 
             checked:bg-black checked:border-black 
             checked:after:content-['✓'] checked:after:text-white 
             checked:after:block checked:after:text-center checked:after:leading-4"
            />
            <span>Same as billing address</span>
          </div>
          {/* No componente pai, terá um botão para enviar os dados para o backend. Como eu faço para passar o handleSubmit pra lá?  */}
        </form>
      </div>
    </div>
  );
});

export default Payment;
