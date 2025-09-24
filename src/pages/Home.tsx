import { useEffect, useState } from "react";
import ProductList from "../components/ui/ProductList";
import CategoryList from "../components/ui/CategoryList";
import Header from "../components/layout/Header";
import Banner from "../components/layout/Banner";
import SmallerBanner from "../components/layout/SmallerBanner";
import Banners from "../components/layout/Banners";
import Footer from "../components/layout/Footer";
import Banner2 from "../components/layout/Banner2";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import { ToastContainer } from "../components/modal/ToastContainer";
import Loading from "../components/modal/Loading";

const Home = () => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  interface MenuItem {
    id: number;
    label: string;
    endpoint: string;
  }

  const menuItems: MenuItem[] = [
    { id: 0, label: "New Arrival", endpoint: "/products/tag/new_arrival" },
    { id: 1, label: "Bestseller", endpoint: "/products/tag/bestseller" },
    { id: 2, label: "Featured Products", endpoint: "/products/tag/featured_products" },
  ];

  const {
    products: productsMenu,
    fetchProducts,
    loading: productsLoadingMenu,
    error: productsErrorMenu,
  } = useProducts(menuItems[0].endpoint);

  const {
    products: productsDiscounted,
    fetchProducts: featchProductDiscounted,
    loading: productsLoadingDiscounted,
    error: productsErrorDiscounted,
  } = useProducts("/products/tag/discount_up_to_50");

  useEffect(() => {
    featchProductDiscounted("/products/tag/discount_up_to_50");
  }, []);

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories("/categories");

  const handleClick = (item: MenuItem) => {
    setActiveItem(item.id);
    fetchProducts(item.endpoint);
  };

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (productsErrorMenu) {
      addToast(productsErrorMenu);
    }
  }, [productsErrorMenu]);

  useEffect(() => {
    if (categoriesError) {
      addToast(categoriesError);
    }
  }, [categoriesError]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className=" text-[18px] font-medium">
        <Banner />
        <SmallerBanner />
        {categoriesLoading ? (
          <div className="h-[192px]">
            <Loading />
          </div>
        ) : categoriesError ? (
          <p className="text-center w-full my-40">There was a problem to get the data</p>
        ) : (
          <CategoryList categories={categories} />
        )}

        <menu className="flex gap-6 m-auto px-4 md:w-full max-w-[1120px] max-lg:max-w-[700px] max-md:max-w-[343px] overflow-x-auto whitespace-nowrap no-scrollbar mt-[56px] mb-8 ">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item)}
              className={`cursor-pointer text-lg max-md:text-[16px] transition-all 
              ${
                activeItem === item.id
                  ? "border-b-2"
                  : "text-[#8b8b8b] hover:text-black"
              }`}
            >
              {item.label}
            </li>
          ))}
        </menu>

        {productsLoadingMenu ? (
          <div className="h-[880px]">
            <Loading />
          </div>
        ) : productsErrorMenu ? (
          <p className="text-center w-full my-40">There was a problem to get the data</p>
        ) : (
          <ProductList products={productsMenu} cols={4} productAmount={8} />
        )}

        <Banners />

        {productsLoadingDiscounted ? (
          <div className="h-[880px]">
            <Loading />
          </div>
        ) : productsErrorDiscounted ? (
          <p className="text-center w-full my-40">There was a problem to get the data</p>
        ) : (
          <section className="m-auto mt-20 max-md:mt-10 md:w-full max-w-[1120px] max-lg:max-w-[700px] max-md:max-w-[343px]">
            <h2 className="mb-8 font-medium text-2xl">Discounts up to -50%</h2>
            <ProductList
              products={productsDiscounted}
              cols={4}
              productAmount={4}
            />
          </section>
        )}

        <ToastContainer
          toasts={toasts}
          removeToast={removeToast}
          isError={true}
        />
        <Banner2 />
      </main>
      <Footer />
    </div>
  );
};
export default Home;

