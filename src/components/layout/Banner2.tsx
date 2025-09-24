import { memo } from "react";
import { cn } from "../../utils/cn";
import ShopNowButton from "../ui/ShopNowButton";

import leftCluster from "../../assets/img/prefooter-left.png";
import rightCluster from "../../assets/img/prefooter-right.png";
import mobileUpCluster from "../../assets/img/prefooter-mobile_up.png";
import mobileDownCluster from "../../assets/img/prefooter-mobile_down.png";

const titleStyles = {
  thin: "font-thin text-[3rem] sm:text-[2.6rem] md:text-[4rem] lg:text-[4.5rem] leading-[2.9rem] sm:leading-[3.7rem] md:leading-[5.5rem] lg:leading-[5.5rem] tracking-[.1em]",
  emphasis:
    "font-medium text-[3.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] leading-[2.5rem] sm:leading-[3rem] md:leading-[3.5rem] lg:leading-[3.5rem]",
};

const titleWords = [
  { text: "Big", className: titleStyles.thin },
  { text: "Summer", className: titleStyles.thin },
  { text: "Sale", className: titleStyles.emphasis },
] as const;

type ClusterId = "left" | "right" | "mobileUp" | "mobileDown";

type ClusterConfig = {
  id: ClusterId;
  imgSrc: string;
  alt?: string;
  wrapperClass: string;
  zoomClass: string;
  sizeClass: string;
};

const clusters: ClusterConfig[] = [
  {
    id: "left",
    imgSrc: leftCluster,
    alt: "",
    wrapperClass:
      "pointer-events-none select-none hidden sm:block absolute left-0 sm:left-[-10px] md:left-[-1px] bottom-[-12px] sm:bottom-[-60px] md:bottom-[-85px] lg:bottom-[-125px] md:-translate-x-[105px] lg:-translate-x-3",
    zoomClass:
      "origin-bottom-left scale-[0.93] sm:scale-[1.5] md:scale-[1.06] lg:scale-[1.12] xl:scale-[.80]",
    sizeClass:
      "w-[160px] sm:w-[220px] md:w-[395px] lg:w-[520px] xl:w-[620px] 2xl:w-[670px] max-w-none",
  },
  {
    id: "right",
    imgSrc: rightCluster,
    alt: "",
    wrapperClass:
      "pointer-events-none select-none hidden sm:block absolute right-0 bottom-[-20px] sm:bottom-[0px] md:bottom-[-30px] lg:bottom-[.1px] translate-x-3 sm:translate-x-4 md:translate-x-6",
    zoomClass:
      "origin-bottom-right scale-[0.73] sm:scale-[0.80] md:scale-[0.85] lg:scale-[0.90] xl:scale-[0.70]",
    sizeClass:
      "w-[120px] sm:w-[190px] md:w-[410px] lg:w-[440px] xl:w-[520px] 2xl:w-[580px] max-w-none",
  },
  {
    id: "mobileUp",
    imgSrc: mobileUpCluster,
    alt: "",
    wrapperClass:
      "pointer-events-none select-none block sm:hidden absolute top-[0] w-full",
    zoomClass: "origin-top-right scale-[1.0]",
    sizeClass: "w-full max-w-none",
  },
  {
    id: "mobileDown",
    imgSrc: mobileDownCluster,
    alt: "",
    wrapperClass:
      "pointer-events-none select-none block sm:hidden absolute bottom-[1px] overflow-hidden w-full",
    zoomClass: "origin-bottom-left",
    sizeClass: "w-full max-w-none",
  },
];

const bannerLayoutClasses =
  "relative -mb-px w-full overflow-hidden text-white";
const bannerBgClasses =
  "bg-[radial-gradient(120%_160%_at_22%_50%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_45%),linear-gradient(115deg,#2b2b2d_0%,#161617_55%,#000_100%)]";
const bannerHeightClasses =
  "h-[34rem] sm:h-[20rem] md:h-[25rem] lg:h-[28rem]";

const BannerTitle = () => (
  <h2
    id="banner2-title"
    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-[4rem]"
  >
    <span
      className="inline-flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-2 md:gap-x-3 gap-y-7"
      aria-label={titleWords.map((w) => w.text).join(" ")}
    >
      {titleWords.map(({ text, className }) => (
        <span key={text} className={className}>
          {text}
        </span>
      ))}
    </span>
  </h2>
);

const DecorativeClusterImage = ({ config }: { config: ClusterConfig }) => {
  const { imgSrc, alt, wrapperClass, zoomClass, sizeClass } = config;
  return (
    <div className={wrapperClass} aria-hidden="true">
      <div className={zoomClass}>
        <img
          src={imgSrc}
          alt={alt ?? ""}
          className={sizeClass}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

const Banner2 = memo(function Banner2() {
  return (
    <>
      <section
        className={cn(bannerLayoutClasses, bannerBgClasses, bannerHeightClasses, "lg:hidden")}
        aria-labelledby="banner2-title-mobile"
        role="region"
      >
        {clusters.map((config) => (
          <DecorativeClusterImage key={config.id} config={config} />
        ))}
        <div className="relative z-10 mx-auto w-full h-full flex flex-col justify-center items-center text-center px-5 sm:px-24 md:px-28 md:pt-12">
          <BannerTitle />
          <p className="text-sm md:text-base text-[#787878] font-normal leading-relaxed max-w-[60ch] md:max-w-[40ch] md:mt-0 mt-6">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
          <div className="md:mt-6 mt-16">
            <ShopNowButton to="/products/all" />
          </div>
        </div>
      </section>

      <section
        className={cn(bannerLayoutClasses, bannerBgClasses, bannerHeightClasses, "hidden lg:block")}
        aria-labelledby="banner2-title-desktop"
        role="region"
      >
        {clusters.map((config) => (
          <DecorativeClusterImage key={config.id} config={config} />
        ))}
        <div className="relative z-10 mx-auto w-full h-full flex flex-col justify-center items-center text-center px-5 sm:px-24 md:px-28 lg:px-64 lg:pt-20">
          <BannerTitle />
          <p className="text-sm md:text-base text-[#787878] font-normal leading-relaxed max-w-[60ch] md:max-w-[40ch] lg:max-w-none mt-0">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
          <ShopNowButton to="/products/all" className="mt-9" />
        </div>
      </section>
    </>
  );
});

export default Banner2;
