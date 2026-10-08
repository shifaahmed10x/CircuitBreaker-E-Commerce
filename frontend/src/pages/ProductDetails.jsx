import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import {
  Link,
  useParams,
} from "react-router-dom";

import Navbar from "../components/ecommerce/Navbar";
import Footer from "../components/ecommerce/Footer";

import { getProductById } from "../services/productApi";
import { getInventoryByProductId } from "../services/inventoryApi";

import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [inventory, setInventory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [inventoryLoading, setInventoryLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [cartMessage, setCartMessage] = useState("");


  /*
   * Load product information
   */
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load this product."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);


  /*
   * Load inventory information
   */
  useEffect(() => {
    async function loadInventory() {
      try {
        setInventoryLoading(true);

        const data =
          await getInventoryByProductId(id);

        setInventory(data);
      } catch (err) {
        console.error(err);

        setInventory([]);
      } finally {
        setInventoryLoading(false);
      }
    }

    loadInventory();
  }, [id]);


  /*
   * Calculate total available quantity
   */
  const availableQuantity = inventory.reduce(
    (total, item) =>
      total + (item.availableQuantity ?? 0),
    0
  );


  /*
   * Increase quantity
   */
  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(
        current + 1,
        availableQuantity
      )
    );
  };


  /*
   * Decrease quantity
   */
  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };


  /*
   * Add product to cart
   */
  const handleAddToCart = () => {
    if (!product || availableQuantity <= 0) {
      return;
    }

    addToCart(product, quantity);

    setCartMessage(
      `${quantity} ${
        quantity > 1 ? "items" : "item"
      } added to your bag.`
    );

    /*
     * Remove message after a few seconds
     */
    setTimeout(() => {
      setCartMessage("");
    }, 3000);
  };


  /*
   * Loading product
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf5]">

        <Navbar />

        <div className="flex min-h-[500px] items-center justify-center">

          <p className="text-sm text-[#75665e]">
            Loading product...
          </p>

        </div>

      </div>
    );
  }


  /*
   * Product error
   */
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#fffaf5]">

        <Navbar />

        <div className="mx-auto flex min-h-[550px] max-w-7xl flex-col items-center justify-center px-5 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
            The Skin Room
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#302722]">
            Product not found
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#75665e]">
            {error ||
              "This product is no longer available."}
          </p>

          <Link
            to="/products"
            className="mt-6 bg-[#3b302a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white"
          >
            Back to shop
          </Link>

        </div>

        <Footer />

      </div>
    );
  }


  /*
   * Determine stock state
   */
  const isOutOfStock =
    !inventoryLoading &&
    availableQuantity <= 0;

  const isLowStock =
    availableQuantity > 0 &&
    availableQuantity <= 5;


  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">

        {/* Back */}
        <Link
          to="/products"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#75665e] transition hover:text-[#a85d49]"
        >
          <ArrowLeft size={16} />
          Back to skincare
        </Link>


        {/* Main product */}
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-[#f1e7df]">

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Add to wishlist"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#40352f] transition hover:bg-white hover:text-[#a85d49]"
            >
              <Heart
                size={19}
                strokeWidth={1.5}
              />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />

          </div>


          {/* Product Information */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
              {product.category}
            </p>


            {/* Name */}
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.035em] text-[#302722] sm:text-5xl">
              {product.name}
            </h1>


            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">

              <div className="flex items-center gap-1">

                <Star
                  size={16}
                  fill="currentColor"
                  strokeWidth={1}
                  className="text-[#b8755d]"
                />

                <span className="text-sm text-[#50453e]">
                  {product.rating}
                </span>

              </div>

              <span className="text-sm text-[#a3958c]">
                ·
              </span>

              <span className="text-sm text-[#75665e]">
                {product.reviews} reviews
              </span>

            </div>


            {/* Price */}
            <p className="mt-6 text-2xl font-medium text-[#302722]">
              ₹{product.price}
            </p>


            {/* Description */}
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#75665e]">
              {product.description}
            </p>


            <div className="my-7 border-t border-[#e4d8cf]" />


            {/* Stock */}
            <div>

              {inventoryLoading ? (
                <p className="text-sm text-[#75665e]">
                  Checking availability...
                </p>
              ) : isOutOfStock ? (
                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-red-500" />

                  <span className="text-sm text-red-600">
                    Out of stock
                  </span>

                </div>
              ) : isLowStock ? (
                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-orange-500" />

                  <span className="text-sm text-orange-700">
                    Only {availableQuantity} left
                  </span>

                </div>
              ) : (
                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-green-600" />

                  <span className="text-sm text-[#50453e]">
                    In stock
                  </span>

                </div>
              )}

            </div>


            {/* Quantity */}
            {!isOutOfStock && !inventoryLoading && (
              <div className="mt-7">

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#50453e]">
                  Quantity
                </p>

                <div className="flex w-fit items-center border border-[#cdbdb2]">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-11 w-11 items-center justify-center text-[#50453e] transition hover:bg-[#f1e7df] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="flex h-11 w-12 items-center justify-center border-x border-[#cdbdb2] text-sm">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      quantity >= availableQuantity
                    }
                    className="flex h-11 w-11 items-center justify-center text-[#50453e] transition hover:bg-[#f1e7df] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={15} />
                  </button>

                </div>

              </div>
            )}


            {/* Add to cart */}
            <button
              type="button"
              disabled={
                isOutOfStock ||
                inventoryLoading
              }
              onClick={handleAddToCart}
              className="mt-7 w-full bg-[#3b302a] py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#51433b] disabled:cursor-not-allowed disabled:bg-[#b8aaa2]"
            >
              {inventoryLoading
                ? "Checking stock..."
                : isOutOfStock
                  ? "Out of stock"
                  : `Add ${quantity} ${
                      quantity > 1
                        ? "items"
                        : "item"
                    } to bag`}
            </button>


            {/* Cart confirmation */}
            {cartMessage && (
              <div className="mt-4 border border-[#d8c1b4] bg-[#f6eee8] px-4 py-3 text-center text-sm text-[#8f5544]">
                {cartMessage}
              </div>
            )}


            {/* Product highlights */}
            <div className="mt-8 grid grid-cols-3 border-y border-[#e4d8cf] py-5">

              <div className="text-center">

                <p className="font-serif text-lg text-[#302722]">
                  Clean
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-wider text-[#8c7c72]">
                  Formula
                </p>

              </div>


              <div className="border-x border-[#e4d8cf] text-center">

                <p className="font-serif text-lg text-[#302722]">
                  Daily
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-wider text-[#8c7c72]">
                  Essential
                </p>

              </div>


              <div className="text-center">

                <p className="font-serif text-lg text-[#302722]">
                  Skin
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-wider text-[#8c7c72]">
                  Focused
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* Additional product information */}
        <section className="mt-20 border-t border-[#e4d8cf] pt-12">

          <div className="grid gap-10 md:grid-cols-3">

            <div>

              <h2 className="font-serif text-2xl text-[#302722]">
                Description
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#75665e]">
                {product.description}
              </p>

            </div>


            <div>

              <h2 className="font-serif text-2xl text-[#302722]">
                How to use
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#75665e]">
                Apply as part of your daily skincare
                routine and follow with the next step
                in your routine.
              </p>

            </div>


            <div>

              <h2 className="font-serif text-2xl text-[#302722]">
                Your routine
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#75665e]">
                Pair this product with other essentials
                from The Skin Room to create a simple
                everyday skincare routine.
              </p>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default ProductDetails;