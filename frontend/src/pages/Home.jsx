import AnnouncementBar from "../components/ecommerce/AnnouncementBar";
import Navbar from "../components/ecommerce/Navbar";
import Hero from "../components/ecommerce/Hero";
import ProductGrid from "../components/ecommerce/ProductGrid";
import RecommendationSection from "../components/ecommerce/RecommendationSection";
import Footer from "../components/ecommerce/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      <main>
        <Hero />

        <RecommendationSection />

        <ProductGrid />
      </main>

      <Footer />
    </div>
  );
}

export default Home;