import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getRecommendations } from "../../services/recommendationApi";

function RecommendationSection() {

  const [recommendations, setRecommendations] = useState([]);
  const [fallback, setFallback] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadRecommendations() {
    try {
      const data = await getRecommendations();

      setRecommendations(data.recommendations || []);
      setFallback(data.fallback === true);

    } catch (error) {
      console.error("Recommendation error:", error);

      setRecommendations([]);
      setFallback(false);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    loadRecommendations();

    // Re-check recommendation state periodically.
    const interval = setInterval(
      loadRecommendations,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  if (loading || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-[#eadfea] bg-white">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="py-12 lg:py-16">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <div className="flex items-center gap-2 text-[#7B2A8D]">

                <Sparkles size={18} />

                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  {fallback
                    ? "Top picks"
                    : "Recommended for you"}
                </span>

              </div>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-[#3B0A45] sm:text-5xl lg:text-6xl">

                {fallback
                  ? "Our top recommendations"
                  : "Your next skincare favourites"}

              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#66536B] lg:text-base">

                {fallback
                  ? "Our recommendation service is temporarily unavailable. We've selected some of our top picks for you."
                  : "Thoughtfully selected essentials to complement your everyday skincare routine."}

              </p>

            </div>

            {fallback && (

              <div className="flex w-fit items-center gap-2 border border-[#F0B8BE] bg-[#FFF3F4] px-4 py-3 text-xs font-bold text-[#C62835]">

                <AlertCircle size={16} />

                Temporarily unavailable

              </div>

            )}

          </div>

        </div>

        <div className="grid gap-6 border-t border-[#EEE7EF] py-10 md:grid-cols-3">

          {recommendations.map((product, index) => (

            <Link
              key={product.productId}
              to={`/products/${product.productId}`}
              className="group overflow-hidden border border-[#E5DCE8] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#7B2A8D] hover:shadow-[0_16px_40px_rgba(59,10,69,0.12)]"
            >

              <div className="relative aspect-[4/4.5] overflow-hidden bg-[#F6F1F7]">

                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#3B0A45] text-xs font-bold text-white">
                  0{index + 1}
                </span>

                <span className="absolute right-4 top-4 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#3B0A45] shadow-sm">
                  {fallback ? "Top Pick" : "Recommended"}
                </span>

              </div>

              <div className="p-5 lg:p-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B2A8D]">
                  The Skin Room
                </p>

                <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.02em] text-[#3B0A45]">
                  {product.productName}
                </h3>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#66536B]">
                  {product.reason}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#EEE7EF] pt-4">

                  <div className="flex items-center gap-1.5">

                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-[#F0A51A]"
                    />

                    <span className="text-xs font-bold text-[#3B0A45]">
                      4.8
                    </span>

                    <span className="text-xs text-[#887A8D]">
                      Customer rating
                    </span>

                  </div>

                  <ArrowRight
                    size={18}
                    className="text-[#3B0A45] transition group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default RecommendationSection;