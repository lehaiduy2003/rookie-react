import CategoryNavbar from "./components/CategoryNavbar";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Category */}
      <CategoryNavbar />
      <main className="flex-1">{/* Your main content here */}</main>
    </div>
  );
}

export default App;
