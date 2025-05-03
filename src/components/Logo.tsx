const Logo = () => {
  return (
    <a id="logo" href="/" className="flex items-center gap-2">
      <img src="/images/logo.jpg" alt="Logo" className="h-12 w-auto" />
      <span className="font-semibold text-xl hidden sm:inline-block">rookie</span>
    </a>
  );
};

export default Logo;
