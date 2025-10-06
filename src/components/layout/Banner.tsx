import { Link } from "react-router-dom";
import iphone14ProImg from "../../assets/img/iphone14pro.png"

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-[#211C24] to-[#211C24] pt-[168px] md:pt-[88px] -mb-px">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 md:px-8 lg:px-[60px] [@media(min-width:1440px)]:px-[160px] 2xl:px-[160px] gap-1 md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-8 md:gap-6 md:flex-1 md:min-w-[400px] w-full">
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 w-full">
              <div className="text-white text-[25px] font-bold leading-8 opacity-40 text-center md:text-left">
                Pro.Beyond.
              </div>
              <div className="text-white text-[72px] md:text-[96px] font-thin leading-[72px] md:leading-[72px] tracking-[-0.72px] md:tracking-[-0.96px] text-center md:text-left">
                IPhone 14 <span className="font-bold">Pro</span>
              </div>
            </div>
            <div className="text-[#909090] text-[19px] md:text-lg font-medium leading-6 text-center md:text-left">
              Created to change everything for the better. For everyone
            </div>
            <Link
              to="/products/Phones"
              className="flex justify-center items-center px-14 py-4 border border-white rounded-md text-white text-base font-medium leading-6 hover:bg-white hover:text-[#211C24] transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={iphone14ProImg}
              alt="iPhone 14 Pro"
              className="w-[321px] h-[349px] object-cover object-top md:w-[406px] md:h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
