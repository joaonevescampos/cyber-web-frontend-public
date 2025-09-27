import { useEffect, useState } from "react";
import EditIcon from "../../assets/img/edit-icon.svg";
import CloseIcon from "../../assets/img/close_icon.svg";
import PlusIcon from "../../assets/img/plus-icon.svg";
import AddressForm from "../modal/AddressForm";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../modal/ToastContainer";

interface AddressType {
  id: number;
  name: string;
  address: string;
  contact: string;
  tag: string;
}

const defaultAdresses = [
  {
    id: 1,
    name: "2118 Thornridge",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    contact: "2095550104",
    tag: "home",
  },
  {
    id: 2,
    name: "Headoffice",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    contact: "7045550127",
    tag: "office",
  },
];

const Address = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [addresses, setAddresses] = useState<AddressType[]>(defaultAdresses);
  const [openAddressForm, setOpenAddressForm] = useState<boolean>(false);
  const { errorToasts, addToast, removeErrorToast } = useToast();

  const handleSelectAddress = (id: number) => {
    setSelectedId(id);
  };

  const handleRemoveAddress = (id: number) => {
    if (addresses.length > 1) {
      const addressesUpdated = addresses.filter((address) => address.id !== id);
      if (selectedId === id) {
        setSelectedId(addressesUpdated[0].id);
      }
      setAddresses(addressesUpdated);
    } else {
      addToast("Cannot delete a unique address!", true, 3000);
    }
  };

  const handleOpenAddress = () => {
    setOpenAddressForm(true);
  };

  const handleCloseAddress = () => {
    setOpenAddressForm(false);
  };

  return (
    <section className="flex flex-col gap-8 max-w-[1120px] m-auto py-12">
      <ToastContainer
        toasts={errorToasts}
        removeToast={removeErrorToast}
        isError={true}
      />
      {openAddressForm && (
        <div className="fixed inset-0 top-0 left-0 bg-black opacity-40 z-40"></div>
      )}
      <h1 className="font-semibold text-xl">Select Address</h1>
      <ul className="flex flex-col gap-6">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <li
              className="flex gap-4 justify-between items-center p-6 bg-[#F6F6F6]"
              key={address.id}
            >
              <div className="flex gap-4">
                <div
                  onClick={() => handleSelectAddress(address.id)}
                  className="flex items-center justify-center w-6 h-6 rounded-full border-2 cursor-pointer"
                >
                  {selectedId == address.id ? (
                    <div className="w-3 h-3 rounded-full bg-black "></div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 pb-2">
                    <span className="text-[18px]">{address.name}</span>
                    <span className="flex items-center justify-center text-white bg-black px-2 rounded text-xs">
                      {address.tag.toUpperCase()}
                    </span>
                  </div>
                  <span>{address.address}</span>
                  <span>{address.contact}</span>
                </div>
              </div>
              <div className="flex gap-6">
                <button className="cursor-pointer" onClick={() => handleOpenAddress()}>
                  <img src={EditIcon} alt="edit icon" />
                </button>
                <button
                  onClick={() => handleRemoveAddress(address.id)}
                  className="cursor-pointer"
                >
                  <img src={CloseIcon} alt="edit icon" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="flex items-center justify-center h-52 font-medium text-xl">
            There is no address registered
          </p>
        )}
        <div className="relative my-12">
          <hr className="border-dashed opacity-30" />
          <div className="absolute top-[-12px] left-1/2 translate-x-[-50%] flex flex-col items-center gap-2">
            <button onClick={() => handleOpenAddress()} className="cursor-pointer">
              <img src={PlusIcon} alt="plus icon"/>
            </button>
            <span>Add New Address</span>
          </div>
        </div>
      </ul>
      {openAddressForm && <AddressForm handleClose={handleCloseAddress} />}
    </section>
  );
};

export default Address;
