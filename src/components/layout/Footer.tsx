const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Le Hai Duy. All rights reserved.
        </p>
        <p className="text-sm">
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          {" | "}
          <a href="/terms-of-service" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
