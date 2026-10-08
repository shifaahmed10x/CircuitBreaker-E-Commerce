import { useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";

import Navbar from "../components/ecommerce/Navbar";
import Footer from "../components/ecommerce/Footer";
import ProductCard from "../components/ecommerce/ProductCard";
import { getProducts } from "../services/productApi";

function Products() {
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
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {/* Header */}
        <div className="mb-10">

          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[#75665e] hover:text-[#a85d49]"
          >
            <ArrowLeft size={16} />
            Back home
          </a>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
            The Skin Room
          </p>

          <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em] text-[#302722]">
            All skincare
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#75665e]">
            Thoughtful essentials for cleansing, treating,
            hydrating, and protecting your skin.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">

            <div className="flex items-center gap-3 text-[#75665e]">

              <LoaderCircle
                size={20}
                className="animate-spin"
              />

              <span className="text-sm">
                Loading products...
              </span>

            </div>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="border border-[#dfc4b7] bg-[#f8eee8] p-6">

            <h2 className="font-serif text-xl text-[#302722]">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-[#75665e]">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 bg-[#3b302a] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Try again
            </button>

          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="border border-[#e4d8cf] bg-white p-10 text-center">

            <h2 className="font-serif text-2xl text-[#302722]">
              No products yet
            </h2>

            <p className="mt-2 text-sm text-[#75665e]">
              Add products through the Product Service
              and they will appear here.
            </p>

          </div>
        )}

        {/* Products */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between border-b border-[#e4d8cf] pb-4">

              <p className="text-sm text-[#75665e]">
                {products.length} products
              </p>

              <select
                className="border-none bg-transparent text-sm text-[#50453e] outline-none"
                defaultValue="popular"
              >
                <option value="popular">
                  Popular
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>

            </div>

            <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

              {products.map((product) => (
               <ProductCard
  key={product.id}
  product={product}
/>
              ))}

            </div>
          </>
        )}

      </main>

      <Footer />

    </div>
  );
}

export default Products;