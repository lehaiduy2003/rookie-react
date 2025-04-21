import CategoryNavbar from "@/components/CategoryNavbar";
import FeaturedProductView from "@/components/FeaturedProductView";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNavbar />
      <main className="flex-1">
        <FeaturedProductView />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
