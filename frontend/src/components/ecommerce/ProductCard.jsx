import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <article className="group">

      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f1e7df]">

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#40352f] transition hover:bg-white hover:text-[#a85d49]"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
          />
        </button>

        {/* Product Image */}
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

      </div>

      {/* Product Information */}
      <div className="pt-4">

        {/* Product name + price */}
        <div className="flex items-start justify-between gap-4">

          <Link
            to={`/products/${product.id}`}
            className="min-w-0"
          >
            <h3 className="font-serif text-lg leading-6 text-[#302722] transition hover:text-[#a85d49]">
              {product.name}
            </h3>
          </Link>

          <span className="whitespace-nowrap text-sm font-medium text-[#40352f]">
            ₹{product.price}
          </span>

        </div>

        {/* Category */}
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#a85d49]">
          {product.category}
        </p>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#81736b]">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1.5">

          <Star
            size={14}
            fill="currentColor"
            strokeWidth={1}
            className="text-[#b8755d]"
          />

          <span className="text-xs text-[#75665e]">
            {product.rating}
          </span>

          <span className="text-xs text-[#a3958c]">
            ({product.reviews})
          </span>

        </div>

        {/* Add to Bag */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 w-full border border-[#bfaea2] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#40352f] transition duration-300 hover:bg-[#3b302a] hover:text-white"
        >
          Add to bag
        </button>

      </div>
    </article>
  );
}

export default ProductCard;