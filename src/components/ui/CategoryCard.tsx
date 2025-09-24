import type CategoryType from "../../models/Categories";

const CategoryCard = ({ name, url_icon }: CategoryType) => {
  return (
    <div className="w-full h-[128px] flex flex-col gap-2 items-center justify-center bg-gray-5 rounded-xl cursor-pointer">
      <img src={url_icon} alt={name} className="w-12" />
      <span className="text-center">{name}</span>
    </div>
  );
};

export default CategoryCard;
