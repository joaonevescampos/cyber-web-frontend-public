import React, { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../modal/ToastContainer";

import type { ProductDataType } from "../../pages/ProductDetailsPage";
import { useGlobal } from "../../hooks/useGlobal";

interface ProductDetailsProps {
  product: ProductDataType;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<number>(1);

  const {
    successToasts,
    errorToasts,
    addToast,
    removeSuccessToast,
    removeErrorToast,
  } = useToast();

  const { addToCart } = useGlobal();

  const handleAddToWishlist = () => {
    addToast("Added to Wishlist!", false, 3000);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Product not found.</p>
      </div>
    );
  }

  const isAddToCartEnabled =
    (product?.colors.length === 0 || selectedColor !== null) &&
    (product?.storage_options.length === 0 || selectedStorage !== null);

  const handleAddToCart = () => {
    if (isAddToCartEnabled) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        url_image: product.url_image,
        amount: 1,
      });
      addToast("Added to Cart!", false, 3000);
    }
  };

  useEffect(() => {
    const imageUrl = product.url_image || "https://via.placeholder.com/400";
    setMainImage(imageUrl);

    if (product.colors.length > 0) {
      setSelectedColor(product.colors[0].id);
    }

    if (product.storage_options.length > 0) {
      setSelectedStorage(product.storage_options[0].id);
    }

    setSelectedThumbnail(1);
  }, [product]);

  const images = product.url_image
    ? [
        { id: 1, url: product.url_image },
        { id: 2, url: product.url_image },
        { id: 3, url: product.url_image },
        { id: 4, url: product.url_image },
      ]
    : [];

  return (
    <>
      <div className="flex justify-center items-center container mx-auto md:p-8">
        <ToastContainer
          toasts={successToasts}
          removeToast={removeSuccessToast}
          isError={false}
        />
        <ToastContainer
          toasts={errorToasts}
          removeToast={removeErrorToast}
          isError={true}
        />
        <div className="flex flex-col justify-center lg:flex-row gap-12 max-md:items-center">
          <div className="flex justify-center items-center flex-col max-lg:flex-col-reverse lg:flex-row gap-2 w-full lg:w-1/2">
            <div className="flex justify-center lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto">
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.url || "https://via.placeholder.com/80"}
                  alt={`Product thumbnail ${img.id}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 
                  ${
                    selectedThumbnail === img.id
                      ? "border-transparent"
                      : "border-transparent opacity-50"
                  }`}
                  onClick={() => {
                    setMainImage(img.url);
                    setSelectedThumbnail(img.id);
                  }}
                />
              ))}
            </div>

            <div className="flex-1 flex justify-center items-center rounded-lg max-lg:py-[37px]">
              <img
                src={mainImage || "https://via.placeholder.com/400"}
                alt={product.name}
                className="object-contain rounded-lg h-[516px] max-md:h-[330px]"
              />
            </div>
          </div>

          <div className="max-w-[536px] w-full max-md:flex max-md:flex-col max-md:w-[341px]">
            <h1 className="text-[40px] font-bold text-black mb-3 max-md:mb-6 leading-11">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              {product.discounted_price !== null &&
              product.discounted_price < product.price ? (
                <>
                  <span className="text-[32px] font-medium text-black">
                    ${product.discounted_price}
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-medium text-black">
                  ${product.price}
                </span>
              )}
            </div>

            <div className="space-y-6">
              {product.colors.length > 0 && (
                <div className="flex items-center gap-6 mt-2">
                  <h3 className="text-[15px] font-medium">Select color :</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        className={`w-8 h-8 rounded-full border-2 focus:outline-none cursor-pointer
                        ${
                          selectedColor === color.id
                            ? "border-gray-600 ring-1 ring-gray-300"
                            : "border-gray-50"
                        }`}
                        style={{ backgroundColor: color.hex_code }}
                        onClick={() => {
                          if (selectedColor === color.id) {
                            setSelectedColor(null);
                          } else {
                            setSelectedColor(color.id);
                          }
                        }}
                        title={color.name}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {product.storage_options.length > 0 && (
                <div>
                  <div className="flex gap-4 max-md:gap-2">
                    {product.storage_options.map((storage) => (
                      <button
                        key={storage.id}
                        className={`w-[122px] max-md:w-[80px] h-[48px] rounded-lg border-2 text-[14px] cursor-pointer hover:bg-gray-100 transition duration-300
                        ${
                          selectedStorage === storage.id
                            ? "border-black text-black font-medium"
                            : "border-gray-300 text-gray-700"
                        }`}
                        onClick={() => {
                          if (selectedStorage === storage.id) {
                            setSelectedStorage(null);
                          } else {
                            setSelectedStorage(storage.id);
                          }
                        }}
                      >
                        {storage.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.specs && (
                <div className="flex flex-wrap gap-4 max-md:gap-2">
                  <div className="w-[168px] max-md:w-[166px] h-16 bg-[#F4F4F4] rounded-[7px] flex items-center gap-2">
                    <img
                      src="/src/assets/img/screen-size_icon.svg"
                      alt="screen size icon"
                      className="w-6 h-6 ml-1"
                    />
                    <div>
                      <p className="text-[14px] text-[#A7A7A7]">Screen size</p>
                      {product.specs.screen_size && (
                        <p className="text-[14px] text-[#4E4E4E] font-medium">
                          {product.specs.screen_size}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[168px] max-md:w-[166px] h-16 px-2 bg-[#F4F4F4] rounded-[7px] flex items-center gap-2">
                    <img
                      src="/src/assets/img/cpu_icon.svg"
                      alt="screen size icon"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[14px] text-[#A7A7A7]">CPU</p>
                      {product.specs.cpu && (
                        <p className="text-[14px] text-[#4E4E4E] font-medium">
                          {product.specs.cpu}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[168px] max-md:w-[166px] h-16 px-2 bg-[#F4F4F4] rounded-[7px] flex items-center gap-2">
                    <img
                      src="/src/assets/img/cores_icon.svg"
                      alt="screen size icon"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[14px] text-[#A7A7A7]">CPU</p>
                      {product.specs.total_cores && (
                        <p className="text-[14px] text-[#4E4E4E] font-medium">
                          {product.specs.total_cores}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[168px] max-md:w-[166px] h-16 px-2 bg-[#F4F4F4] rounded-[7px] flex items-center gap-2">
                    <img
                      src="/src/assets/img/main-camera_icon.svg"
                      alt="screen size icon"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[14px] text-[#A7A7A7]">Main camera</p>
                      {product.specs.main_camera && (
                        <p className="text-[14px] text-[#4E4E4E] font-medium">
                          {product.specs.main_camera}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[168px] max-md:w-[166px] h-16 px-2 bg-[#F4F4F4] rounded-[7px] flex items-center gap-2">
                    <img
                      src="/src/assets/img/front-camera_icon.svg"
                      alt="screen size icon"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[14px] text-[#A7A7A7]">Front-camera</p>
                      {product.specs.front_camera && (
                        <p className="text-[14px] text-[#4E4E4E] font-medium">
                          {product.specs.front_camera}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[168px] max-md:w-[166px] h-16 px-2 bg-[#F4F4F4] rounded-[7px] flex items-center gap-2">
                    <img
                      src="/src/assets/img/battery_icon.svg"
                      alt="screen size icon"
                      className="w-6 h-6"
                    />
                    <div>
                      <p className="text-[14px] text-[#A7A7A7]">
                        Battery capacity
                      </p>
                      {product.specs.battery && (
                        <p className="text-[14px] text-[#4E4E4E] font-medium">
                          {product.specs.battery}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-[14px] text-[#6C6C6C] self-stretch">
                {product.description}
              </p>
            </div>

            <div className="flex max-md:flex-col gap-4 pt-8 pb-8">
              <button
                className="flex-1 py-4 px-6 rounded-[6px] text-[16px] font-semibold border-1 border-black text-black hover:bg-gray-100 transition cursor-pointer duration-300"
                onClick={handleAddToWishlist}
              >
                Add to Wishlist
              </button>
              <button
                className={`flex-1 py-4 px-6 rounded-[6px] text-[16px] font-semibold transition duration-300 cursor-pointer
                ${
                  isAddToCartEnabled
                    ? "bg-black text-white hover:bg-gray-4 hover:border-gray-4 border-1 border-black"
                    : "bg-gray-300 text-gray-500 border-1 border-gray-300 cursor-not-allowed"
                }`}
                disabled={!isAddToCartEnabled}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            <div className="flex gap-8">
              <div className="flex max-md:flex-col gap-4 items-center max-w-[157px] w-full">
                <img
                  src="/src/assets/img/delivery_icon.svg"
                  alt="delivery truck"
                />
                <div className="text-[14px] max-md:text-center">
                  <p className="text-[#717171] whitespace-nowrap">
                    Free Delivery
                  </p>
                  <p className="text-black font-medium">1-2 day</p>
                </div>
              </div>
              <div className="flex max-md:flex-col gap-4 items-center max-w-[157px] w-full">
                <img
                  src="/src/assets/img/stock_icon.svg"
                  alt="delivery truck"
                />
                <div className="text-[14px] max-md:text-center">
                  <p className="text-[#717171]">In Stock</p>
                  <p className="text-black font-medium">Today</p>
                </div>
              </div>
              <div className="flex max-md:flex-col gap-4 items-center max-w-[157px] w-full">
                <img
                  src="/src/assets/img/guaranteed_icon.svg"
                  alt="delivery truck"
                />
                <div className="text-[14px] max-md:text-center">
                  <p className="text-[#717171]">Guaranteed</p>
                  <p className="text-black font-medium">1 year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
