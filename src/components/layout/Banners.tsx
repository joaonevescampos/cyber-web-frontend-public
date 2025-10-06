import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import iPadProImg from "../../assets/img/ipadPro.png"
import popularProductsImg from "../../assets/img/popularProducts.png"
import samsungGalaxyImg from "../../assets/img/samsungGalaxy.png"
import macbookProImg from "../../assets/img/macbookPro.png"

const Banners = () => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const carouselRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      id: "ipad",
      title: "Ipad Pro",
      image: iPadProImg,
      bgColor: "bg-[#F9F9F9]",
      textColor: "text-black",
      buttonStyle: "border-black text-black hover:bg-black hover:text-white"
    },
    {
      id: "popular",
      title: "Popular Products",
      image: popularProductsImg,
      bgColor: "bg-white",
      textColor: "text-black",
      buttonStyle: "border-black text-black hover:bg-black hover:text-white"
    },
    {
      id: "samsung",
      title: "Samsung Galaxy",
      image: samsungGalaxyImg,
      bgColor: "bg-[#EAEAEA]",
      textColor: "text-black",
      buttonStyle: "border-black text-black hover:bg-black hover:text-white"
    },
    {
      id: "macbook",
      title: "Macbook Pro",
      image: macbookProImg,
      bgColor: "bg-[#2C2C2C]",
      textColor: "text-white",
      buttonStyle: "border-white text-white hover:bg-white hover:text-[#2C2C2C]"
    }
  ];

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = currentSlide * carouselRef.current.offsetWidth;
    }
  }, [currentSlide]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const slideWidth = carouselRef.current.offsetWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    }
  };

  return (
    <section className="w-full">
      <div className="w-full mx-auto [@media(min-width:1440px)]:max-w-none">
        <div className="[@media(min-width:1301px)]:hidden">
          <div 
            ref={carouselRef}
            className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className={`min-w-full h-[723px] flex flex-col items-center px-8 py-14 snap-center ${card.bgColor}`}
              >
                <div className="flex flex-col items-center gap-4 max-w-[321px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full max-w-[321px] h-[331px] object-cover scale-[1.25]"
                  />
                  <h2 className={`font-inter font-light text-[49px] leading-[48px] text-center whitespace-nowrap ${card.textColor}`}>
                    {card.title}
                  </h2>
                  <p className="font-inter font-medium text-[#909090] text-sm leading-6 text-center">
                    <span className="whitespace-nowrap">iPad combines a magnificent 10.2-inch&nbsp;Retina</span><br />
                    <span className="whitespace-nowrap">display, incredible performance, multitasking</span><br />
                    <span className="whitespace-nowrap">and ease of use.</span>
                  </p>
                  <Link
                    to="/products/all"
                    className={`flex justify-center items-center px-14 py-4 border rounded-md text-base font-medium leading-6 transition-colors ${card.buttonStyle}`}
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="flex justify-center items-center gap-[9px] mt-12 mb-14">
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-opacity ${currentSlide === i ? 'bg-black opacity-100' : 'bg-black opacity-10'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
        </div>

        <div className="hidden [@media(min-width:1301px)]:flex w-full">
          <div className="flex-1 min-w-[280px] xl:max-w-[360px] [@media(min-width:1440px)]:max-w-none h-[640px] bg-white relative px-8 lg:pt-0 lg:pb-[56px] flex flex-col justify-between">
            <div className="flex justify-center items-end relative h-[346px] [@media(min-width:1440px)]:h-[366px] overflow-hidden">
              <img
                src={popularProductsImg}
                alt="Popular Products"
                className="h-[346px] xl:w-[380px] [@media(min-width:1440px)]:w-[420px] [@media(min-width:1440px)]:h-[366px] object-cover xl:translate-y-8 [@media(min-width:1440px)]:translate-y-8 xl:scale-[1.15] [@media(min-width:1440px)]:scale-[1.15]"
              />

            </div>
            <div className="flex flex-col gap-4 items-center text-center w-[343px] mx-auto lg:w-[296px] lg:h-[208px] lg:justify-between lg:gap-0 lg:items-start lg:text-left">
              <h2 className="font-inter font-light text-black text-[33px] leading-[48px] lg:whitespace-nowrap xl:whitespace-nowrap [@media(min-width:1440px)]:whitespace-nowrap">
                Popular Products
              </h2>
              <p className="hidden xl:block [@media(min-width:1440px)]:hidden font-inter font-medium text-[#909090] text-[13px] leading-5">
                iPad combines a magnificent 10.2-inch<br />Retina display, incredible performance,<br />multitasking and ease of use.
              </p>
              <p className="[@media(min-width:1300px)]:hidden [@media(min-width:1440px)]:block font-inter font-medium text-[#909090] text-sm leading-6">
                iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
              </p>
              <Link
                to="/products/all"
                className="flex justify-center items-center px-14 py-4 border border-black rounded-md text-black text-base font-medium leading-6 hover:bg-black hover:text-white transition-colors w-fit"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="flex-1 min-w-[280px] xl:max-w-[360px] [@media(min-width:1440px)]:max-w-none h-[640px] bg-[#F9F9F9] relative px-8 lg:pt-0 lg:pb-[56px] flex flex-col justify-between">
            <div className="flex justify-center items-end h-[346px] [@media(min-width:1440px)]:h-[366px]">
              <img
                src={iPadProImg}
                alt="iPad Pro"
                className="w-full max-w-[340px] h-[346px] xl:max-w-[320px] xl:h-[326px] [@media(min-width:1440px)]:max-w-[360px] [@media(min-width:1440px)]:h-[366px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 items-center text-center w-[343px] mx-auto lg:w-[296px] lg:h-[208px] lg:justify-between lg:gap-0 lg:items-start lg:text-left">
              <h2 className="font-inter font-light text-black text-[33px] leading-[48px] lg:whitespace-nowrap xl:whitespace-nowrap [@media(min-width:1440px)]:whitespace-nowrap">
                Ipad Pro
              </h2>
              <p className="hidden xl:block [@media(min-width:1440px)]:hidden font-inter font-medium text-[#909090] text-[13px] leading-5">
                iPad combines a magnificent 10.2-inch<br />Retina display, incredible performance,<br />multitasking and ease of use.
              </p>
              <p className="xl:hidden [@media(min-width:1440px)]:block font-inter font-medium text-[#909090] text-sm leading-6">
                iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
              </p>
              <Link
                to="/products/all"
                className="flex justify-center items-center px-14 py-4 border border-black rounded-md text-black text-base font-medium leading-6 hover:bg-black hover:text-white transition-colors w-fit"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="flex-1 min-w-[280px] xl:max-w-[360px] [@media(min-width:1440px)]:max-w-none h-[640px] bg-[#EAEAEA] relative px-8 lg:pt-0 lg:pb-[56px] flex flex-col justify-between">
            <div className="flex justify-center items-end h-[346px] [@media(min-width:1440px)]:h-[366px]">
              <img
                src={samsungGalaxyImg}
                alt="Samsung Galaxy"
                className="w-full max-w-[340px] h-[346px] xl:max-w-[340px] [@media(min-width:1440px)]:max-w-[360px] [@media(min-width:1440px)]:h-[366px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 items-center text-center w-[343px] mx-auto lg:w-[296px] lg:h-[208px] lg:justify-between lg:gap-0 lg:items-start lg:text-left">
              <h2 className="font-inter font-light text-black text-[33px] leading-[48px] lg:whitespace-nowrap xl:whitespace-nowrap [@media(min-width:1440px)]:whitespace-nowrap">
                Samsung Galaxy
              </h2>
              <p className="hidden xl:block [@media(min-width:1440px)]:hidden font-inter font-medium text-[#909090] text-[13px] leading-5">
                iPad combines a magnificent 10.2-inch<br />Retina display, incredible performance,<br />multitasking and ease of use.
              </p>
              <p className="xl:hidden [@media(min-width:1440px)]:block font-inter font-medium text-[#909090] text-sm leading-6">
                iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
              </p>
              <Link
                to="/products/all"
                className="flex justify-center items-center px-14 py-4 border border-black rounded-md text-black text-base font-medium leading-6 hover:bg-black hover:text-white transition-colors w-fit"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="flex-1 min-w-[280px] xl:max-w-[360px] [@media(min-width:1440px)]:max-w-none h-[640px] bg-[#2C2C2C] relative px-8 lg:pt-0 lg:pb-[56px] flex flex-col justify-between">
            <div className="flex justify-center items-end h-[346px] [@media(min-width:1440px)]:h-[366px]">
              <img
                src={macbookProImg}
                alt="MacBook Pro"
                className="w-full max-w-[340px] h-[346px] xl:max-w-[340px] [@media(min-width:1440px)]:max-w-[360px] [@media(min-width:1440px)]:h-[366px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 items-center text-center w-[343px] mx-auto lg:w-[296px] lg:h-[208px] lg:justify-between lg:gap-0 lg:items-start lg:text-left">
              <h2 className="font-inter font-light text-white text-[33px] leading-[48px] lg:whitespace-nowrap xl:whitespace-nowrap [@media(min-width:1440px)]:whitespace-nowrap">
                Macbook Pro
              </h2>
              <p className="hidden xl:block [@media(min-width:1440px)]:hidden font-inter font-medium text-[#909090] text-[13px] leading-5">
                iPad combines a magnificent 10.2-inch<br />Retina display, incredible performance,<br />multitasking and ease of use.
              </p>
              <p className="xl:hidden [@media(min-width:1440px)]:block font-inter font-medium text-[#909090] text-sm leading-6">
                iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
              </p>
              <Link
                to="/products/all"
                className="flex justify-center items-center px-14 py-4 border border-white rounded-md text-white text-base font-medium leading-6 hover:bg-white hover:text-[#2C2C2C] transition-colors w-fit"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banners;