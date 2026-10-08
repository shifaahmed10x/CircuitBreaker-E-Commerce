import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productApi";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load our bestsellers.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const bestsellers = products.slice(0, 4);

  return (
    <section
      id="bestsellers"
      className="border-t border-[#e8ded6] bg-[#fffaf5] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section heading */}
        <div className="mb-10 flex items-end justify-between gap-6">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
              Bestsellers
            </p>

            <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] text-[#302722] sm:text-5xl">
              Loved every day
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-[#75665e]">
              Simple skincare essentials made for comfortable,
              everyday routines.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm font-medium text-[#40352f] transition hover:text-[#a85d49] sm:flex"
          >
            Shop all
            <ArrowRight size={16} strokeWidth={1.6} />
          </Link>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-[#75665e]">
              <LoaderCircle
                size={18}
                className="animate-spin"
                strokeWidth={1.6}
              />

              Loading our bestsellers...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="border border-[#e4d8cf] bg-[#f8f0e9] p-8 text-center">
            <p className="text-sm text-[#75665e]">
              {error}
            </p>

            <Link
              to="/products"
              className="mt-4 inline-block text-sm font-medium text-[#a85d49]"
            >
              Browse all products
            </Link>
          </div>
        )}

        {/* Products */}
        {!loading && !error && bestsellers.length > 0 && (
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && bestsellers.length === 0 && (
          <div className="border border-[#e4d8cf] p-8 text-center">
            <p className="text-sm text-[#75665e]">
              No products are available right now.
            </p>
          </div>
        )}

        {/* Mobile shop all */}
        <div className="mt-10 sm:hidden">
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 border border-[#bfaea2] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#40352f]"
          >
            Shop all
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ProductGrid;