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
import CategoryFilter from "../components/ui/CategoryFilter";
import { Link, useParams } from "react-router-dom";
import arrowIcon from "../assets/img/arrow_icon.svg";
import BrandFilter from "../components/ui/BrandFilter";
import { useBrands } from "../hooks/useBrands";
import Services from "../services/AppServices";
import type { ProductsType } from "../models/Products";

const CategoryProduct = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categoryName
  );
  const [selectedPriceOrder, setSelectedPriceOrder] =
    useState<string>("Filter by price");
  const [filteredProducts, setFilteredProducts] = useState<
    ProductsType[] | null
  >(null);
  const [brandsSelected, setBrandsSelected] = useState([""]);
  const { products, metadata, setMetadata, fetchAllProducts, loading, error } =
    useAllProducts();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let order = selectedPriceOrder;
    order = order === "By price: High to Low" ? "desc" : "asc";
    if (brandsSelected) {
      fetchAllProducts(
        `/products/category/${selectedCategory}?page=${currentPage}&sort=price&order=${order}&brands=${brandsSelected
          .join(",")
          .trim()}`
      );
    } else {
      fetchAllProducts(
        `/products?page=${currentPage}?sort=price&order=${order}`
      );
    }
  }, [currentPage]);

  const { categories, loading: categoriesLoading } =
    useCategories("/categories");

  const { brands, loading: brandsLoading } = useBrands("/products/brands");

  useEffect(() => {
    if (categoryName === "all") {
      fetchAllProducts("/products");
    } else {
      fetchAllProducts(`/products/category/${categoryName}`);
    }
  }, [categoryName]);

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

  const handleSelectCategory = (categoryName: string) => {
    setCurrentPage(1);
    setSelectedCategory(categoryName);
    setFilteredProducts(null);
  };

  const handleSubmitBrands = (brandsSelected: string[]) => {
    setCurrentPage(1);
    setFilteredProducts(null);
    fetchAllProducts(
      `/products/category/${selectedCategory}?page=${currentPage}&sort=price&brands=${brandsSelected
        .join(",")
        .trim()}`
    );
    setBrandsSelected(brandsSelected);
  };

  const handleSearchClick = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredProducts(null);
      return;
    }

    const api = new Services();
    const response = await api.getAllProducts("/products");
    const totalPages = response.metadata.total_pages;

    let allProducts: ProductsType[] = [];

    for (let page = 1; page <= totalPages; page++) {
      const res = await api.getAllProducts(`/products?page=${page}`);
      allProducts = [...allProducts, ...res.data];
    }

    const searchList = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    setFilteredProducts(searchList);

    setMetadata({
      total_items: searchList.length,
      total_pages: 1,
      actual_page: 1,
    });
  };

  const handleSelectPriceOrder = (priceOrder: string) => {
    setSelectedPriceOrder(priceOrder);
    setFilteredProducts(null);
    priceOrder = priceOrder === "By price: High to Low" ? "desc" : "asc";
    if (selectedCategory !== "all") {
      fetchAllProducts(
        `/products/category/${selectedCategory}?page=${currentPage}&sort=price&order=${priceOrder}&brands=${brandsSelected
          .join(",")
          .trim()}`
      );
    } else {
      fetchAllProducts(
        `/products?page=${currentPage}&sort=price&order=${priceOrder}&brands=${brandsSelected
          .join(",")
          .trim()}`
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
      <main className="flex max-md:flex-col max-md:items-center justify-center gap-8 max-md:gap-0 mt-[88px] w-full px-2">
        {loading ? (
          <div className="flex items-center justify-center h-[836px] w-full">
            <Loading />
          </div>
        ) : products ? (
          <>
            <div className="flex flex-col gap-4 max-md:items-center max-md:w-full max-md:mt-8">
              {categoriesLoading ? (
                <Loading />
              ) : (
                <CategoryFilter
                  options={categories}
                  onChange={handleSelectCategory}
                  placeholder={selectedCategory}
                  openInitionState={false}
                />
              )}
              {brandsLoading ? (
                <Loading />
              ) : (
                <BrandFilter
                  options={brands}
                  onChange={handleSubmitBrands}
                  onClick={handleSearchClick}
                />
              )}
            </div>
            <section className="flex flex-col gap-4 max-w-[831px] lg:min-w-[600px] md:min-w-[300px]">
              <div className="flex max-md:flex-col-reverse items-center justify-between max-md:items-start max-md:justify-start w-full max-w-[1120px] gap-4">
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
              {products.length > 0 ? (
                <ProductList
                  products={filteredProducts ?? products}
                  cols={3}
                  productAmount={9}
                />
              ) : (
                <p className="flex items-center justify-center text-center font-semibold text-xl h-[500px] w-full min-w-[831px] max-lg:min-w-[600px] max-md:min-w-0">
                  There is no products
                </p>
              )}
              <div className="my-6 m-auto w-fit">
                <Pagination
                  totalPages={metadata ? metadata?.total_pages : 0}
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

export default CategoryProduct;
