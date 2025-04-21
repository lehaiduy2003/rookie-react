import CategoryNavbar from "./components/CategoryNavbar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Category */}
      <CategoryNavbar />
      <main className="flex-1">{/* Your main content here */}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
