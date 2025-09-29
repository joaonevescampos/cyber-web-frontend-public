import { useState } from "react";
import EditIcon from "../../assets/img/edit-icon.svg";
import CloseIcon from "../../assets/img/close_icon.svg";
import PlusIcon from "../../assets/img/plus-icon.svg";
import AddressForm from "../modal/AddressForm";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../modal/ToastContainer";
import { useGlobal } from "../../hooks/useGlobal";

const Address = () => {
  const { addresses, removeAddress } = useGlobal();
  const [selectedId, setSelectedId] = useState(addresses[0].id);
  const [openAddressForm, setOpenAddressForm] = useState<boolean>(false);
  const [editAddressId, setEditAddressId] = useState<string>("");

  const { errorToasts, addToast, removeErrorToast } = useToast();


  const handleSelectAddress = (id: string) => {
    setSelectedId(id);
  };

  const handleRemoveAddress = (id: string) => {
    if (addresses.length > 1) {
      const addressesUpdated = addresses.filter((address) => address.id !== id);
      if (selectedId === id) {
        setSelectedId(addressesUpdated[0].id);
      }
      removeAddress(id);
    } else {
      addToast("Cannot delete a unique address!", true, 3000);
    }
  };

  const handleOpenAddress = () => {
    setOpenAddressForm(true);
    setEditAddressId("");
  };

  const handleEditAddress = (id: string) => {
    setOpenAddressForm(true);
    setEditAddressId(id);
  };

  const handleCloseAddress = () => {
    setOpenAddressForm(false);
  };

  return (
    <section className="flex flex-col gap-8 max-w-[1120px] m-auto max-lg:px-4 py-12">
      <ToastContainer
        toasts={errorToasts}
        removeToast={removeErrorToast}
        isError={true}
      />
      {openAddressForm && (
        <div className="fixed inset-0 top-0 left-0 bg-black opacity-40 z-40"></div>
      )}
      <h1 className="font-semibold text-xl">Select Address</h1>
      <ul className="flex flex-col gap-6 max-h-[500px] overflow-y-auto">
        {addresses?.length > 0 ? (
          addresses.map((address) => (
            <li
              className="flex items-center p-6 bg-[#F6F6F6] w-full"
              key={address.id}
            >
              <div className="flex gap-4 w-full">
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
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between w-full">
                    <div className="flex gap-4">
                      <span className="text-[18px] truncate max-w-[500px] max-md:max-w-40">
                        {address.name}
                      </span>
                      <span className="flex items-center justify-center text-white bg-black px-2 rounded text-xs">
                        {address.tag.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-2 max-md:max-w-48">
                      <span className="max-md:max-w-40">{address.address}</span>
                      <span className="w-fit">{address.contact}</span>
                    </div>
                    <div className="flex gap-6 md:items-start">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEditAddress(address.id)}
                      >
                        <img src={EditIcon} alt="edit icon" />
                      </button>
                      <button
                        onClick={() => handleRemoveAddress(address.id)}
                        className="cursor-pointer"
                      >
                        <img src={CloseIcon} alt="edit icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="flex items-center justify-center h-52 font-medium text-xl">
            There is no address registered
          </p>
        )}
      </ul>
      <div className="relative my-12">
        <hr className="border-dashed opacity-30" />
        <div className="absolute top-[-12px] left-1/2 translate-x-[-50%] flex flex-col items-center gap-2">
          <button
            onClick={() => handleOpenAddress()}
            className="cursor-pointer"
          >
            <img src={PlusIcon} alt="plus icon" />
          </button>
          <span>Add New Address</span>
        </div>
      </div>
      {openAddressForm && (
        <AddressForm
          editAddressId={editAddressId}
          handleClose={handleCloseAddress}
        />
      )}
    </section>
  );
};

export default Address;
