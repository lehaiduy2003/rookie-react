import AuthButtons from "../AuthButtons";
import Logo from "../Logo";
import SearchBar from "../SearchBar";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex md:justify-center md:flex-1 md:px-8 max-w-xl mx-auto">
            <div className="w-full max-w-md">
              <SearchBar className="w-full" />
            </div>
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
      </header>
    </>
  );
};

export default Header;
