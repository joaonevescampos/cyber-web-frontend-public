const AddressForm = () => {
  return (
    <div className="absolute bg-white p-4 rounded z-50">
      <h1>Insert your new address</h1>
      <form className="flex flex-col gap-4">
        <label htmlFor="street">Street Name</label>
        <input type="text" id="street" placeholder="type your street name"/>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" placeholder="type your hole address"/>
        <label htmlFor="phone">Phone</label>
        <input type="number" placeholder="type your phone number"/>
      </form>
    </div>
  );
};

export default AddressForm;
