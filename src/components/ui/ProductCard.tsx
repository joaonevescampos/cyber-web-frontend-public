import { Link } from "react-router-dom";
import FilledButton from "./FilledButton";
import favoriteIcon from "../../assets/img/favorite_icon_product.svg";
import favoriteIconFilled from "../../assets/img/favorite_icon_filled.svg";
import { useState } from "react";
interface ProductProps {
  productName: string;
  productPrice: number;
  discountedPrice: number | null;
  productUrl: string;
  id?: number;
  key: string;
}

const ProductCard = ({
  productName,
  productPrice,
  discountedPrice,
  productUrl,
  id,
}: ProductProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="relative flex flex-col gap-4 max-md:gap-2 items-center justify-end w-[268px] max-md:h-[352px] max-md:w-[164px] h-[432px] bg-gray-1 rounded-xl box-border px-4 py-6">
      {isFavorite ? (
        <button onClick={handleClick}>
          <img
            src={favoriteIconFilled}
            alt="favorite icon"
            className="absolute top-6 right-[16px] max-md:right-[12px] w-[29px] h-[26px] cursor-pointer"
          />
        </button>
      ) : (
        <button onClick={handleClick}>
          <img
            src={favoriteIcon}
            alt="favorite icon"
            className="absolute top-6 right-[16px] max-md:right-[12px] opacity-50 w-[29px] h-[26px] cursor-pointer"
          />
        </button>
      )}

      <img
        src={productUrl}
        alt={productName}
        className="w-[160px] max-md:w-[104px]"
      />
      <h2 className="font-medium text-center leading-[24px] line-clamp-3 max-md:line-clamp-2 w-full max-md:h-12 overflow-y-hidden">
        {productName}
      </h2>

      {discountedPrice !== null && discountedPrice < productPrice ? (
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">
            {`$ ${discountedPrice}`}
          </span>
        </div>
      ) : (
        <span className="text-2xl font-bold">{`$ ${productPrice}`}</span>
      )}

      {/* <span className="text-2xl font-bold">{`$ ${productPrice}`}</span> */}
      <Link to={`/product/${id}`}>
        <FilledButton />
      </Link>
    </div>
  );
};

export default ProductCard;
