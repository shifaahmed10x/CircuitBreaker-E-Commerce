function Hero() {
  return (
    <section className="bg-[#f3e8df]">
      <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">

        {/* Content */}
        <div className="px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#a85d49]">
            Thoughtful skincare
          </p>

          <h1 className="max-w-xl font-serif text-5xl leading-[1.05] tracking-[-0.04em] text-[#302722] sm:text-6xl lg:text-7xl">
            Your skin,
            <br />
            your ritual.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[#665951]">
            Simple, thoughtful skincare made for everyday routines
            and real skin.
          </p>

          <a
            href="#shop"
            className="mt-8 inline-flex bg-[#a85d49] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#8f4d3c]"
          >
            Shop skincare
          </a>
        </div>

        {/* Visual */}
        <div className="relative min-h-[420px] overflow-hidden bg-[#e5d0c2] lg:min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0ddd0] via-[#dfc3b3] to-[#c99f8c]" />

          {/* Decorative product-style composition */}
          <div className="absolute left-1/2 top-1/2 h-72 w-44 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-[2rem] bg-[#fffaf5] shadow-2xl">
            <div className="absolute left-1/2 top-0 h-10 w-20 -translate-x-1/2 -translate-y-5 rounded-t-xl bg-[#c7a28f]" />

            <div className="absolute inset-x-5 top-24 border-y border-[#d9cbc1] py-5 text-center">
              <p className="font-serif text-lg text-[#302722]">
                The Skin Room
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#8b776b]">
                Daily Hydration
              </p>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-[#f1d6c5]/70 blur-sm" />
          <div className="absolute left-10 top-12 h-16 w-16 rounded-full bg-[#fff5ed]/60" />
        </div>
      </div>
    </section>
  );
}

export default Hero;