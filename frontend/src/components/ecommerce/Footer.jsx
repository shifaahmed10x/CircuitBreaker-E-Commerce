function Footer() {
  return (
    <footer
      id="about"
      className="bg-[#3b302a] px-5 py-14 text-[#fffaf5] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <h2 className="font-serif text-3xl">
              The Skin Room
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#d5c8c0]">
              Thoughtful skincare for everyday rituals,
              made with simplicity in mind.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em]">
              Explore
            </h3>

            <div className="mt-5 space-y-3 text-sm text-[#d5c8c0]">
              <p>Shop</p>
              <p>Bestsellers</p>
              <p>Skin Concerns</p>
              <p>Our Story</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em]">
              Stay in the room
            </h3>

            <p className="mt-5 text-sm leading-6 text-[#d5c8c0]">
              Sign up for skincare notes, new launches,
              and little rituals.
            </p>

            <div className="mt-5 flex border-b border-[#8c7b71] pb-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#a9978c]"
              />

              <button className="text-xs font-semibold uppercase tracking-wider">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="mt-14 border-t border-[#66564e] pt-6 text-xs text-[#a9978c]">
          © 2026 The Skin Room. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;