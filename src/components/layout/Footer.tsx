import { Link } from "react-router-dom";
import twitterLogo from "../../assets/img/x-icon.svg";
import facebookLogo from "../../assets/img/facebook-icon.svg";
import linkedinLogo from "../../assets/img/linkedin-icon.svg";
import instagramLogo from "../../assets/img/instagram-icon.svg";
import logoLight from "../../assets/img/logoname-light.svg";

type NavItem = { label: string; path: string };
type SocialLink = { name: string; href: string; icon: string };

const companyServices: NavItem[] = [
  { label: "Bonus program", path: "/bonus" },
  { label: "Gift cards", path: "/gift-cards" },
  { label: "Credit and payment", path: "/payment" },
  { label: "Service contracts", path: "/contracts" },
  { label: "Non-cash account", path: "/non-cash" },
  { label: "Payment", path: "/payment-info" },
];

const buyerAssistance: NavItem[] = [
  { label: "Find an order", path: "/orders" },
  { label: "Terms of delivery", path: "/delivery" },
  { label: "Exchange and return of goods", path: "/returns" },
  { label: "Guarantee", path: "/guarantee" },
  { label: "Frequently asked questions", path: "/faq" },
  { label: "Terms of use of the site", path: "/terms" },
];

const socialMediaLinks: SocialLink[] = [
  { name: "Twitter (X)", href: "https://twitter.com/compassuol", icon: twitterLogo },
  { name: "Facebook", href: "https://www.facebook.com/compass.uol/", icon: facebookLogo },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/compass-uol/", icon: linkedinLogo },
  { name: "Instagram", href: "https://www.instagram.com/compass.uol/", icon: instagramLogo },
];

function LinkList({ items }: { items: NavItem[] }) {
  return (
    <ul className="mt-[-0.5rem] space-y-3 text-[0.875rem] leading-8 text-[#CFCFCF] font-normal text-center sm:text-left">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={item.path}
            className="block  transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded-sm"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function DesktopSection({ title, items }: { title: string; items: NavItem[] }) {
  const sectionId = `footer-section-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <nav aria-labelledby={sectionId} className="hidden sm:block">
      <h3 id={sectionId} className="mb-3 text-lg font-semibold tracking-wide">
        {title}
      </h3>
      <LinkList items={items} />
    </nav>
  );
}

function MobileSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <section aria-label={title} className="sm:hidden flex flex-col items-center gap-2">
      <h3 className="text-base font-semibold text-center">{title}</h3>
      <LinkList items={items} />
    </section>
  );
}

function SocialNetworks() {
  return (
    <div className="mt-0 sm:mt-[14rem] flex justify-center sm:justify-start gap-8">
      {socialMediaLinks.map((media) => (
        <a
          key={media.name}
          href={media.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${media.name}`}
          title={media.name}
          className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-sm"
        >
          <img src={media.icon} alt={`${media.name} icon`} className="h-4 w-4 max-md:h-6 max-md:w-6" loading="lazy" />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-black max-md:bg-[#181313] text-white px-4 py-12 sm:py-20 md:py-[104px] md:px-[40px] lg:px-[160px]"
    >
      <div className="
        mx-auto max-w-7xl
        grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12
        md:flex md:items-start md:justify-between md:gap-8 lg:gap-16
      ">
        <div className="md:basis-1/3 md:max-w-none flex flex-col items-center sm:items-start text-center sm:text-left pt-12 sm:pt-0">
          <Link to="/" aria-label="Go to homepage">
            <img src={logoLight} alt="Cyber Logo" className="h-6" />
          </Link>
          <p className="mt-4 sm:mt-6 max-w-md sm:max-w-[24rem] text-[0.875rem] leading-[1.5rem] text-[#CFCFCF] font-normal sm:font-medium">
            We are a residential interior design firm located in Portland. Our boutique–studio offers more than
          </p>
          <div className="hidden sm:block">
            <SocialNetworks />
          </div>
        </div>

        <div className="hidden sm:flex md:basis-1/3 md:max-w-none justify-center">
          <DesktopSection title="Services" items={companyServices} />
        </div>

        <div className="hidden sm:flex md:basis-1/3 md:max-w-none justify-end">
          <DesktopSection title="Assistance to the buyer" items={buyerAssistance} />
        </div>

        <MobileSection title="Services" items={companyServices} />
        <MobileSection title="Assistance to the buyer" items={buyerAssistance} />

        <div className="sm:hidden">
          <SocialNetworks />
        </div>
      </div>
    </footer>
  );
}
