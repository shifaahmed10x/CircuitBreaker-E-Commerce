import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/ecommerce/Navbar";
import Footer from "../components/ecommerce/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    subtotal,
    delivery,
    total,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffaf5]">
        <Navbar />

        <main className="mx-auto flex min-h-[550px] max-w-7xl flex-col items-center justify-center px-5 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
            The Skin Room
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#302722]">
            Your bag is empty
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-[#75665e]">
            Your skincare ritual is waiting.
            Discover something you'll love.
          </p>

          <Link
            to="/products"
            className="mt-7 bg-[#3b302a] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white"
          >
            Shop skincare
          </Link>

        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
            Your selection
          </p>

          <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em] text-[#302722]">
            Your bag
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* Items */}
          <section className="space-y-6">

            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex gap-5 border-b border-[#e4d8cf] pb-6"
              >

                <Link
                  to={`/products/${item.id}`}
                  className="h-36 w-28 shrink-0 overflow-hidden bg-[#f1e7df] sm:h-40 sm:w-32"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">

                  <div className="flex justify-between gap-4">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#a85d49]">
                        {item.category}
                      </p>

                      <Link
                        to={`/products/${item.id}`}
                        className="mt-1 block font-serif text-xl text-[#302722]"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-sm text-[#75665e]">
                        ₹{item.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#8c7c72] transition hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <div className="mt-auto flex items-center justify-between pt-5">

                    <div className="flex items-center border border-[#cdbdb2]">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center hover:bg-[#f1e7df]"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="flex h-9 w-10 items-center justify-center border-x border-[#cdbdb2] text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center hover:bg-[#f1e7df]"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    <p className="font-medium text-[#302722]">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                </div>
              </article>
            ))}

          </section>

          {/* Summary */}
          <aside className="h-fit bg-[#eee2d8] p-7">

            <h2 className="font-serif text-2xl text-[#302722]">
              Order summary
            </h2>

            <div className="mt-7 space-y-4 border-b border-[#d3c1b5] pb-5">

              <div className="flex justify-between text-sm text-[#75665e]">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm text-[#75665e]">
                <span>Delivery</span>
                <span>
                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery}`}
                </span>
              </div>

            </div>

            <div className="flex justify-between pt-5 text-lg font-medium text-[#302722]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              type="button"
              className="mt-7 w-full bg-[#3b302a] py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#51433b]"
            >
              Proceed to checkout
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#75665e]">
              Free delivery on orders above ₹999.
            </p>

          </aside>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Cart;