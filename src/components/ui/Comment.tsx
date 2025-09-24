import type { CommentsType } from "../../models/Comments";
import StarIcon from "./StarIcon";

const Comment = ({
  name_user,
  url_image_user,
  message,
  rating,
  created_at,
}: CommentsType) => {
  const totalStars = 5;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const renderStars = () => {
    const starElements = [];
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;

    for (let i = 0; i < fullStars; i++) {
      starElements.push(
        <div key={`full-${i}`}>
          <StarIcon className="text-[#FFB547] w-5 h-5" />
        </div>
      );
    }

    if (decimalPart > 0 && fullStars < totalStars) {
      const fillPercentage = decimalPart * 100;
      starElements.push(
        <div key="decimal" className="relative">
          <StarIcon className="text-[#f0b100] fill-transparent w-5 h-5" />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <StarIcon className="text-yellow-500 w-5 h-5" />
          </div>
        </div>
      );
    }

    const remainingStars = totalStars - starElements.length;
    for (let i = 0; i < remainingStars; i++) {
      starElements.push(
        <div key={`empty-${i}`}>
          <StarIcon className="text-[#f0b100] fill-transparent w-5 h-5" />
        </div>
      );
    }
    return starElements;
  };

  return (
    <div className="bg-[#FAFAFA] p-6 rounded-lg w-full mx-auto font-sans">
      <div className="flex items-start gap-4">
        <img
          src={url_image_user}
          alt={"avatar"}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="w-full">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-semibold text-lg text-gray-900">
                {name_user}
              </span>
              <div className="flex items-center mt-1 gap-1">{renderStars()}</div>
            </div>
            <span className="text-sm font-normal text-gray-400 whitespace-nowrap flex-shrink-0">
              {formattedDate}
            </span>
          </div>
          <p className="text-base text-[#7E7E7E] font-medium leading-relaxed mt-2">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
