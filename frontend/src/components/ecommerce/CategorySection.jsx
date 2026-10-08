const categories = [
  {
    name: "Hydration",
    description: "For soft, comfortable skin",
  },
  {
    name: "Acne Care",
    description: "For clearer-looking skin",
  },
  {
    name: "Brightening",
    description: "For a fresh, healthy glow",
  },
  {
    name: "Sun Care",
    description: "Everyday protection",
  },
];

function CategorySection() {
  return (
    <section
      id="concerns"
      className="bg-[#fffaf5] px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
            Find what your skin needs
          </p>

          <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] text-[#302722]">
            Shop by concern
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href="#shop"
              className="group relative overflow-hidden bg-[#eee2d8] p-7 transition duration-300 hover:-translate-y-1"
            >
              <div className="mb-16 text-4xl font-serif text-[#b27b66]/40">
                0{index + 1}
              </div>

              <h3 className="font-serif text-2xl text-[#302722]">
                {category.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#75665e]">
                {category.description}
              </p>

              <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-wider text-[#a85d49]">
                Explore →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;