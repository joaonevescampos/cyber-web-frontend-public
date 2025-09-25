import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { removeFromCart } = useCart();

  return (
    <>
      <Header />
      <main className="mt-24">
       
      </main>
      <Footer />
    </>
  );
};

export default Cart;
