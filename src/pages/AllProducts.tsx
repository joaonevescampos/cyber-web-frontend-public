import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductList from "../components/ui/ProductList";
import { ToastContainer } from "../components/modal/ToastContainer";
import Loading from "../components/modal/Loading";
import Pagination from "../components/ui/Pagination";
import { useAllProducts } from "../hooks/useAllProducts";
import SelectOption from "../components/ui/selectOption";
import { useCategories } from "../hooks/useCategories";
import { Link } from "react-router-dom";
import arrowIcon from "../assets/img/arrow_icon.svg";
import CategoryFilter from "../components/ui/CategoryFilter";

const ProductsPage = ({}) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceOrder, setSelectedPriceOrder] =
    useState<string>("Filter by price");

  const { products, metadata, fetchAllProducts, loading, error } =
    useAllProducts();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let order = selectedPriceOrder;
    order = order === "By price: High to Low" ? "desc" : "asc";
     if (selectedCategory !== "all") {
      fetchAllProducts(
        `/products/category/${selectedCategory}?page=${currentPage}&sort=price&order=${order}`
      );
    } else {
      fetchAllProducts(
        `/products?page=${currentPage}&sort=price&order=${order}`
      );
    }
  }, [currentPage]);

  const { categories, loading: categoriesLoading } =
    useCategories("/categories");

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (error) {
      addToast(error);
    }
  }, [error]);

  useEffect(() => {
    fetchAllProducts("/products");
  }, []);

  const formatName = (name: string) => {
    return name.trim().replaceAll(" ", "-");
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (categoryName === "all") {
      fetchAllProducts(`/products`);
    } else {
      fetchAllProducts(`/products/category/${formatName(categoryName)}`);
    }
  };

  const handleSelectPriceOrder = (priceOrder: string) => {
    setSelectedPriceOrder(priceOrder);
    priceOrder = priceOrder === "By price: High to Low" ? "desc" : "asc";
    if (selectedCategory !== "all") {
      fetchAllProducts(
        `/products/category/${selectedCategory}?page=${currentPage}&sort=price&order=${priceOrder}`
      );
    } else {
      fetchAllProducts(
        `/products?page=${currentPage}&sort=price&order=${priceOrder}`
      );
    }
  };

  return (
    <>
      <Header />
      <menu className="flex gap-4 mt-[88px] pt-10 max-w-[1120px] m-auto text-[#A4A4A4] max-lg:px-4 max-md:hidden">
        <li>
          <Link to="/">Home</Link>
        </li>
        <img
          src={arrowIcon}
          alt="arrow"
          className="rotate-180 w-4 opacity-40"
        />
        <li>
          <Link to="/products/all">Catalog</Link>
        </li>
        <img
          src={arrowIcon}
          alt="arrow"
          className="rotate-180 w-4 opacity-40"
        />
        <li className="text-black">
          <Link to={`/products/${selectedCategory}`}>{selectedCategory}</Link>
        </li>
      </menu>
      <main className="flex max-md:flex-col max-md:items-center justify-center gap-8 mt-[88px] w-full min-w-[800px] max-lg:min-w-[600px] max-md:min-w-0 max-lg:px-4">
        {loading ? (
          <div className="flex items-center justify-center h-[836px] w-full">
            <Loading />
          </div>
        ) : products ? (
          <>
            {categoriesLoading ? (
              <Loading />
            ) : (
              <CategoryFilter
                options={categories}
                onChange={handleSelectCategory}
                placeholder={selectedCategory}
                openInitionState={window.innerWidth < 768 ? false : true}
              />
            )}
            <section className="flex flex-col gap-4 max-w-[831px]">
              <div className="flex max-md:flex-col-reverse items-center max-md:items-start max-md:justify-start justify-between w-full max-w-[1120px] max-md:w-full gap-4">
                <span className="text-[#6C6C6C]">
                  Products Result:{" "}
                  <strong className="font-medium text-xl text-black">
                    {metadata?.total_items}
                  </strong>
                </span>
                <SelectOption
                  onChange={handleSelectPriceOrder}
                  options={["By price: High to Low", "By price: Low to High"]}
                  placeholder={selectedPriceOrder}
                />
              </div>
              <ProductList products={products} cols={3} productAmount={9} />
              <div className="my-6 m-auto w-fit">
                <Pagination
                  totalPages={metadata ? metadata?.total_pages : 1}
                  currentPage={currentPage}
                  onChange={(p) => setCurrentPage(p)}
                  order={selectedPriceOrder}
                />
              </div>
            </section>
          </>
        ) : (
          <p>Cannot get the products</p>
        )}
      </main>
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
        isError={true}
      />
      <Footer />
    </>
  );
};

export default ProductsPage;
