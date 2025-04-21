import CategoryNavbar from "./components/CategoryNavbar";
import FeaturedProductView from "./components/FeaturedProductView";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Category */}
      <CategoryNavbar />
      <main className="flex-1">
        {/* Featured product list view */}
        <FeaturedProductView />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
