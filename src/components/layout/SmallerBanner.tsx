import { Link } from "react-router-dom";
import airPodsAltImg from "../../assets/img/airpods-alt.png"
import airPodsImg from "../../assets/img/airpods.png"
import playstationDesk from "../../assets/img/PlayStation.png"
import playstationMobi from "../../assets/img/PlayStation-mobile.png"
import visionProImg from "../../assets/img/visionPro.png"
import visionProAltImg from "../../assets/img/visionPro-alt.png"
import macbookImg from "../../assets/img/macbook.png"
import macbookAltImg from "../../assets/img/macbook-alt.png"

const SmallerBanner = () => {
  return (
    <>
      <section className="lg:hidden w-full flex flex-col">
        <div className="w-full h-[376px] bg-[#EDEDED] relative px-4 py-10">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <img
              src={airPodsImg}
              alt="AirPods Max"
              className="w-[192px] h-[200px] object-contain"
            />
            <div className="w-[343px] h-[72px] flex flex-col justify-center items-center text-center">
              <h3 className="font-inter font-light text-black text-[34px] leading-[40px] mb-2">Apple AirPods <span className="font-medium">Max</span></h3>
              <p className="font-inter font-medium text-[#909090] text-sm leading-6">Computational audio. Listen, it's powerful</p>
            </div>
          </div>
        </div>

        <div className="w-full h-[392px] bg-[#353535] relative px-4 py-10">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <img
              src={visionProImg}
              alt="Apple Vision Pro"
              className="w-[325px] h-[192px] object-contain"
            />
            <div className="w-[343px] h-[96px] flex flex-col justify-center items-center text-center">
              <h3 className="font-inter font-light text-white text-[34px] leading-[40px] mb-2">Apple Vision <span className="font-medium">Pro</span></h3>
              <p className="font-inter font-medium text-[#909090] text-sm leading-6">An immersive way to experience<br />entertainment</p>
            </div>
          </div>
        </div>

        <div className="w-full h-[424px] bg-white relative px-4 py-10">
          <div className="flex flex-col items-center justify-start gap-6">
            <img
              src={playstationMobi}
              alt="PlayStation 5"
              className="w-[200px] h-[200px] object-contain"
            />
            <div className="w-[343px] h-[96px] flex flex-col justify-start items-center text-center">
              <h3 className="font-inter font-light text-black text-[34px] leading-[40px] mb-4" style={{letterSpacing: '0.49px'}}>Playstation <span className="font-medium">5</span></h3>
              <p className="font-inter font-medium text-[#909090] text-sm leading-6">Incredibly powerful CPUs, GPUs, and an SSD<br />with integrated I/O will redefine your<br />Playstation experience</p>
            </div>
          </div>
        </div>

        <div className="w-full h-[504px] bg-[#EDEDED] relative px-4 py-10">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <img
              src={macbookImg}
              alt="MacBook Air"
              className="w-[330px] h-[200px] object-contain"
            />
            <div className="w-[343px] h-[200px] flex flex-col justify-center items-center text-center">
              <h2 className="font-inter font-medium text-black text-[34px] leading-[40px] mb-4">Macbook <span className="font-light">Air</span></h2>
              <p className="font-inter font-medium text-[#909090] text-sm leading-6 mb-4">The new 15-inch MacBook Air makes room<br />for more of what you love with a spacious<br />Liquid Retina display.</p>
              <Link
                to="/products/all"
                className="flex justify-center items-center w-[343px] h-[56px] border border-black rounded-md text-black text-base font-medium leading-6 hover:bg-black hover:text-white transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden lg:flex w-full h-[450px] lg:h-[500px] xl:h-[600px] overflow-hidden">
        <div className="flex-1 h-[450px] lg:h-[500px] xl:h-[600px] flex flex-col">
          <div className="w-full h-[246px] lg:h-[273px] xl:h-[328px] bg-white relative">
            <img
              src={playstationDesk}
              alt="PlayStation 5"
              className="w-[270px] lg:w-[320px] xl:w-[360px] h-[246px] lg:h-[273px] xl:h-[328px] object-contain absolute left-0 top-0 z-0"
            />
            <div className="w-[254px] lg:w-[300px] xl:w-[280px] [@media(min-width:1440px)]:w-[338px] h-[96px] lg:h-[107px] xl:h-[128px] absolute left-[254px] lg:left-[300px] xl:left-[316px] [@media(min-width:1440px)]:left-[338px] top-1/2 -translate-y-1/2 flex flex-col justify-center z-10">
              <h3 className="font-inter font-medium text-black text-[37px] lg:text-[41px] xl:text-[49px] leading-[30px] lg:leading-[34px] xl:leading-[40px] mb-3 lg:mb-3 xl:mb-4 xl:whitespace-nowrap [@media(min-width:1440px)]:whitespace-nowrap" style={{letterSpacing: '0.49px'}}>Playstation 5</h3>
              <p className="font-inter font-medium text-[#909090] text-sm leading-6 [@media(min-width:1440px)]:hidden">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
              <p className="hidden [@media(min-width:1440px)]:block font-inter font-medium text-[#909090] text-sm leading-6">Incredibly powerful CPUs, GPUs, and an SSD with<br />integrated I/O will redefine your PlayStation<br />experience.</p>
            </div>
          </div>

          <div className="w-full h-[204px] lg:h-[227px] xl:h-[272px] flex">
            <div className="flex-1 h-[204px] lg:h-[227px] xl:h-[272px] bg-[#EDEDED] relative">
              <img
                src={airPodsAltImg}
                alt="AirPods Max"
                className="w-[78px] lg:w-[87px] xl:w-[104px] h-[204px] lg:h-[227px] xl:h-[272px] object-contain absolute left-0 top-0 z-0"
              />
              <div className="w-[120px] lg:w-[134px] xl:w-[160px] h-[107px] lg:h-[119px] xl:h-[143px] absolute left-[111px] lg:left-[124px] xl:left-[148px] top-1/2 -translate-y-1/2 flex flex-col justify-center items-start z-10">
                <h3 className="font-inter font-light text-black text-[22px] lg:text-[24px] xl:text-[29px] leading-[30px] lg:leading-[33px] xl:leading-[40px] mb-2">Apple<br />AirPods<br /><span className="font-medium">Max</span></h3>
                <p className="font-inter font-medium text-[#909090] text-sm leading-6">Computational audio. Listen, it's powerful</p>
              </div>
            </div>

            <div className="flex-1 h-[204px] lg:h-[227px] xl:h-[272px] bg-[#353535] relative">
              <img
                src={visionProAltImg}
                alt="Apple Vision Pro"
                className="w-[102px] lg:w-[114px] xl:w-[136px] h-[143px] lg:h-[159px] xl:h-[190px] object-contain absolute left-0 top-1/2 -translate-y-1/2 z-0"
              />
              <div className="w-[120px] lg:w-[134px] xl:w-[160px] h-[108px] lg:h-[120px] xl:h-[144px] absolute left-[111px] lg:left-[124px] xl:left-[148px] top-1/2 -translate-y-1/2 flex flex-col justify-center items-start z-10">
                <h3 className="font-inter font-light text-white text-[22px] lg:text-[24px] xl:text-[29px] leading-[30px] lg:leading-[33px] xl:leading-[40px] mb-2">Apple<br />Vision <span className="font-medium">Pro</span></h3>
                <p className="font-inter font-medium text-[#909090] text-sm leading-6">An immersive way to experience entertainment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 h-[450px] lg:h-[500px] xl:h-[600px] bg-[#EDEDED] relative">
          <div className="w-[270px] lg:w-[300px] xl:w-[360px] h-[204px] lg:h-[227px] xl:h-[272px] absolute left-[42px] lg:left-[47px] xl:left-[56px] top-1/2 -translate-y-1/2 flex flex-col justify-center">
            <h2 className="font-inter font-thin text-black text-[48px] lg:text-[53px] xl:text-[64px] leading-[42px] lg:leading-[47px] xl:leading-[56px] mb-3 lg:mb-3 xl:mb-4">Macbook<br /><span className="font-medium">Air</span></h2>
            <p className="font-inter font-medium text-[#909090] text-sm leading-6 mb-4 xl:hidden [@media(min-width:1440px)]:hidden">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
            <p className="hidden xl:block [@media(min-width:1440px)]:hidden font-inter font-medium text-[#909090] text-sm leading-6 mb-4">The new 15‑inch MacBook Air makes room<br />for more of what you love with a spacious<br />Liquid Retina display.</p>
            <p className="hidden [@media(min-width:1440px)]:block font-inter font-medium text-[#909090] text-sm leading-6 mb-4">The new 15‑inch MacBook Air makes room for more<br />of what you love with a spacious Liquid Retina<br />display.</p>
            <Link
              to="/products/all"
              className="flex justify-center items-center px-12 lg:px-14 py-3 lg:py-4 border border-black rounded-md text-black text-base font-medium leading-6 hover:bg-black hover:text-white transition-colors w-fit"
            >
              Shop Now
            </Link>
          </div>

          <img
            src={macbookAltImg}
            alt="MacBook Air"
            className="w-[212px] lg:w-[235px] xl:w-[282px] h-[377px] lg:h-[418px] xl:h-[502px] object-contain absolute right-0 top-1/2 -translate-y-1/2 z-0"
          />
        </div>
      </section>
    </>
  )
}

export default SmallerBanner
