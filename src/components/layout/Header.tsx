import AuthButtons from "../AuthButtons";
import Logo from "../Logo";
import SearchBar from "../SearchBar";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block md:flex-1 md:max-w-md md:mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Auth Buttons */}
          <div className="flex-shrink-0">
            <AuthButtons />
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
