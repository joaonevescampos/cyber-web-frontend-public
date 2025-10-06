import { Controller, useForm } from "react-hook-form";
import CloseIcon from "../../assets/img/close.svg";
import { PatternFormat } from "react-number-format";
import { useGlobal } from "../../hooks/useGlobal";
import { v4 as uuidv4 } from "uuid";
import type { AddressType } from "../../models/AddressType";

const AddressForm = ({ handleClose, editAddressId = {} }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddressType>();

  const { addresses, addAddress, updateAddress } = useGlobal();

  const editAddress: AddressType = addresses.filter(
    (address) => address.id === editAddressId
  )[0];

  const onSubmit = (data: AddressType) => {
    if (editAddressId) {
      updateAddress({
        ...data,
        id: editAddressId,
        selected: editAddress.selected,
      });
    } else {
      const newAddress: AddressType = {
        ...data,
        id: uuidv4(),
        selected: false,
      };
      addAddress(newAddress);
    }
    handleClose();
  };

  return (
    <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] trans bg-white p-8 w-full max-w-[500px] max-md:max-w-80 rounded shadow-2xl z-50">
      <button
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => handleClose()}
      >
        <img src={CloseIcon} alt="close icon" />
      </button>
      <h1 className="font-semibold text-xl pb-4">Insert your new address</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label htmlFor="street" className="font-medium text-sm">
          Street Name *
        </label>
        <input
          type="text"
          id="street"
          placeholder="type your street name"
          className="p-4 border-1 border-[#9F9F9F] rounded-[7px] outline-0"
          {...register("name", { required: "Street name is required." })}
          defaultValue={editAddress?.name}
        />
        <p className="text-red-700 text-sm">{errors.name?.message}</p>
        <label htmlFor="address" className="font-medium text-sm">
          Address *
        </label>
        <input
          type="text"
          id="address"
          placeholder="type your hole address"
          className="p-4 border-1 border-[#9F9F9F] rounded-[7px] outline-0"
          {...register("address", { required: "Address is required." })}
          defaultValue={editAddress?.address}
        />
        <p className="text-red-700 text-sm">{errors.address?.message}</p>
        <label htmlFor="phone" className="font-medium text-sm">
          Phone *
        </label>
        <Controller
          name="contact"
          control={control}
          defaultValue={editAddress?.contact || ""}
          rules={{
            required: "Phone is required",
            validate: (value) =>
              value.replace(/\D/g, "").length === 11 ||
              "Phone must have 11 digits",
          }}
          render={({ field }) => (
            <PatternFormat
              {...field}
              format="(##) #####-####"
              mask="_"
              placeholder="(11) 98765-4321"
              className="p-4 border-1 border-[#9F9F9F] rounded-[7px] outline-0"
            />
          )}
        />

        <p className="text-red-700 text-sm">{errors.contact?.message}</p>
        <h2 className="font-medium text-[18px] pb-4">
          Select your address type
        </h2>
        <div className="flex gap-4 pb-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="home"
              {...register("tag", { required: "Select one option" })}
              className="accent-black w-4 h-4 cursor-pointer"
              defaultChecked={editAddress?.tag === "home" && true}
            />
            <span className="pl-2">Home</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="office"
              {...register("tag")}
              className="accent-black w-4 h-4 cursor-pointer"
              defaultChecked={editAddress?.tag === "office" && true}
            />
            <span className="pl-2">Office</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="other"
              {...register("tag")}
              className="accent-black w-4 h-4 cursor-pointer"
              defaultChecked={editAddress?.tag === "other" && true}
            />
            <span className="pl-2">Other</span>
          </label>
        </div>
        <p className="text-red-700 text-sm">{errors.tag?.message}</p>

        <button
          type="submit"
          className="flex items-center justify-center bg-black hover:bg-gray-4 transition duration-300 text-white cursor-pointer rounded-[6px] h-[48px] w-full"
        >
          <span className="font-semibold">Save</span>
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
