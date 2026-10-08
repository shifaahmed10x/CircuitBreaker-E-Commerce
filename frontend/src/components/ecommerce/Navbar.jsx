import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8ded6] bg-[#fffaf5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Mobile Menu */}
        <button
          type="button"
          aria-label="Open menu"
          className="text-[#302722] lg:hidden"
        >
          <Menu size={22} strokeWidth={1.7} />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-2xl tracking-[-0.03em] text-[#302722] lg:text-3xl"
        >
          The Skin Room
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">

          <Link
            to="/products"
            className="text-sm text-[#50453e] transition hover:text-[#a85d49]"
          >
            Shop
          </Link>

          <a
            href="/#concerns"
            className="text-sm text-[#50453e] transition hover:text-[#a85d49]"
          >
            Skin Concerns
          </a>

          <a
            href="/#bestsellers"
            className="text-sm text-[#50453e] transition hover:text-[#a85d49]"
          >
            Bestsellers
          </a>

          <a
            href="/#about"
            className="text-sm text-[#50453e] transition hover:text-[#a85d49]"
          >
            About
          </a>

        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 text-[#302722]">

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="transition hover:text-[#a85d49]"
          >
            <Search
              size={20}
              strokeWidth={1.6}
            />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden transition hover:text-[#a85d49] sm:block"
          >
            <Heart
              size={20}
              strokeWidth={1.6}
            />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className="relative transition hover:text-[#a85d49]"
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.6}
            />

            {cartCount > 0 && (
              <span className="absolute -right-2.5 -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#a85d49] px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Navbar;