import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import favoritesIcon from "../../assets/img/favorites_icon.svg";
import cartIcon from "../../assets/img/cart_icon.svg";
import userIcon from "../../assets/img/user_icon.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products/all" },
    { name: "Contact Us", path: "/under-construction/contact" },
    { name: "Blog", path: "/under-construction/blog" }
  ];

  const isActivePath = (itemPath: string) => {
    if (!itemPath) return false;

    if (itemPath === "/products/all") {
      return (
        location.pathname.startsWith("/products") ||
        location.pathname.startsWith("/product")
      );
    }

    return location.pathname === itemPath;
  };

  return (
    <div className="relative">
      <header className="bg-white border-b border-[#B5B5B5] fixed top-0 w-full z-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center px-4 py-6 md:px-8 md:py-4 lg:px-[60px] [@media(min-width:1440px)]:px-[160px] 2xl:px-[160px] xl:py-4">
            <div className="flex items-center">
              <Link to="/">
                <img
                  src="/src/assets/img/logoname-dark.svg"
                  alt="Cyber Logo"
                  className="h-6 w-auto"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center rounded-lg px-4 py-4 w-[220px] lg:w-[372px] h-[56px] bg-gray-2">
              <img
                src="/src/assets/img/search_icon.svg"
                alt="Search"
                className="w-6 h-6 mr-2 flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Search"
                className="text-sm font-medium placeholder:opacity-50 bg-transparent outline-none flex-1 w-full"
              />
            </div>

            <nav className="hidden md:flex items-center gap-[20px] xl:gap-[44px] [@media(min-width:1440px)]:gap-[52px] 2xl:gap-[52px]">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={() => 
                    `text-base font-medium transition-opacity ${
                      isActivePath(item.path) && item.path !== "" 
                        ? "text-black opacity-100" 
                        : "text-black opacity-30 hover:opacity-70"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img
                src={isMenuOpen ? "/src/assets/img/close_icon.svg" : "/src/assets/img/burguer_icon.svg"}
                alt={isMenuOpen ? "Close menu" : "Open menu"}
                className="w-10 h-10"
              />
            </button>

            <div className="hidden md:flex items-center gap-3 lg:gap-6">
              {[
                { name: 'Favorites', src: favoritesIcon },
                { name: 'Cart', src: cartIcon },
                { name: 'User', src: userIcon }
              ].map((item) => (
                <button className="p-1" key={item.name}>
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-8 h-8"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <nav className="md:hidden bg-white border-b border-[#B5B5B5] fixed top-[72px] left-0 w-full z-50">
          <div className="px-4 py-6 md:px-8 md:py-4 lg:px-[60px] [@media(min-width:1440px)]:px-[160px] 2xl:px-[160px] xl:py-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block text-base font-medium transition-opacity py-3 ${
                    isActive && item.path !== ""
                      ? "text-black opacity-100"
                      : "text-black opacity-30 hover:opacity-70"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="mt-4 flex items-center gap-4">
              {[
                { name: 'Favorites', src: favoritesIcon },
                { name: 'Cart', src: cartIcon },
                { name: 'User', src: userIcon }
              ].map((item) => (
                <button className="p-1" key={item.name}>
                  <img src={item.src} alt={item.name} className="w-8 h-8" />
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
