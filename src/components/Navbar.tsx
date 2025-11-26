import { useState, useEffect, type MouseEvent } from "react";
import { Menu, X, ChevronDown, Phone, Sun, Moon, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useLocation } from "react-router-dom";

// Define types for our navigation items and search suggestions
interface NavItem {
  title: string;
  href: string;
  dropdownItems?: {
    title: string;
    href: string;
  }[];
}

interface SearchSuggestion {
  title: string;
  href: string;
}

// Move sections to module scope so effects don't need to include it as a dependency
const SECTIONS: SearchSuggestion[] = [
  { title: "Hero Section", href: "#hero" },
  { title: "About Section", href: "#about" },
  { title: "Services Section", href: "#services" },
  { title: "Portfolio Section", href: "#portfolio" },
  { title: "Pricing Section", href: "#pricing" },
  { title: "FAQ Section", href: "#faq" },
  { title: "Testimony Section", href: "#testimony" },
  { title: "Contact Section", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Normalize path to handle double slashes and trailing slashes
  const normalizedPath = location.pathname.replace(/\/+/, "/").replace(/\/$/, "");
  // Check if we're on resume page or other pages without hero
  const isResumePage = normalizedPath === '/resume';
  const shouldHaveBackground = isScrolled || isResumePage;
  // Update scroll spy order to match the navbar order (About before Services)
  const activeSection = useScrollSpy(['hero', 'about', 'services', 'portfolio', 'pricing', 'faq', 'testimony', 'contact']);

  // text classes depend on whether the navbar has a background (scrolled/resume page) or is transparent (over hero)
  const navTextClasses = shouldHaveBackground ? "text-black dark:text-white" : "text-white";
  const navHoverClasses = shouldHaveBackground
    ? "hover:text-gray-700 dark:hover:text-gray-300"
    : "hover:text-gray-200";
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchSuggestion[]
  >([]);


  // Update search suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchSuggestions([]);
      return;
    }

    const filteredSuggestions = SECTIONS.filter((section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchSuggestions(filteredSuggestions);
  }, [searchTerm]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (e: MouseEvent<HTMLElement>, title: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering the parent button's onClick
    setActiveDropdown(activeDropdown === title ? null : title);
  };


  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm(""); // Clear search term when closing
    setSearchSuggestions([]); // Clear suggestions when closing
  };
  const handleSearchSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchSuggestions.length > 0) {
      handleNavClick(e, searchSuggestions[0].href);
    }
  };

  const handleSuggestionClick = (
    e: MouseEvent<HTMLButtonElement>,
    href: string
  ) => {
    handleNavClick(e, href);
  };

  const handleNavClick = (
    e: MouseEvent<HTMLElement>,
    href: string,
    shouldCloseMenu = true
  ) => {
    e.preventDefault();
    if (shouldCloseMenu) {
      setIsOpen(false); // Close mobile menu after navigation
    }
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Initialize isScrolled on mount as well
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavItem[] = [
    { title: "About", href: "#about" },
    {
      title: "Services",
      href: "#services",
      dropdownItems: [
        { title: "Web Development", href: "#services" },
        { title: "Mobile App Development", href: "#services" },
        { title: "UI/UX Design", href: "#services" },
      ],
    },
    { title: "Portfolio", href: "#portfolio" },
    { title: "Pricing", href: "#pricing" },
    { title: "FAQ", href: "#faq" },
    { title: "Testimony", href: "#testimony" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        shouldHaveBackground 
          ? "bg-white dark:bg-gray-900 shadow-lg" 
          : "bg-transparent backdrop-blur-sm"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              type="button"
              aria-label="Go to top"
              onClick={(e) => handleNavClick(e as unknown as MouseEvent<HTMLElement>, "#hero")}
              className={`${navTextClasses} font-bold text-xl ${navHoverClasses}`}
            >
              ALPIAN<span className="text-blue-300">*</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-grow space-x-8">
            {navLinks.map((link) => (
              <div key={link.title} className="relative group">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`transition-colors duration-300 text-sm font-medium ${navTextClasses} ${navHoverClasses} ${
                      activeSection === link.href.slice(1) 
                        ? 'border-b-2 border-blue-500' 
                        : ''
                    }`}
                  >
                    {link.title}
                  </button>
                  {link.dropdownItems && (
                    <button
                      onClick={(e) => toggleDropdown(e, link.title)}
                      className={`transition-colors duration-300 ${navTextClasses} ${navHoverClasses}`}
                      aria-label={`Toggle ${link.title} dropdown`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === link.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {link.dropdownItems && (
                  <AnimatePresence>
                    {activeDropdown === link.title && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          {link.dropdownItems.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className={`transition-colors duration-300 ${navTextClasses} ${navHoverClasses}`}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className={`transition-colors duration-300 ${navTextClasses} ${navHoverClasses}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <a
              href={`https://wa.me/${encodeURIComponent("+628125844194")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center"
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className={`transition-colors duration-300 ${navTextClasses} ${navHoverClasses}`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className={`transition-colors duration-300 ${navTextClasses} ${navHoverClasses}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className={`${navTextClasses} focus:outline-none`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 py-4"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Search sections..."
                    className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
                {searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute w-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50"
                  >
                    {searchSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.href}
                        onClick={(e) =>
                          handleSuggestionClick(e, suggestion.href)
                        }
                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {suggestion.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.title}>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => handleNavClick(e, link.href, false)}
                      className={`flex-grow text-left px-3 py-2 text-base font-medium ${navTextClasses} ${navHoverClasses} rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
                    >
                      {link.title}
                    </button>
                    {link.dropdownItems && (
                      <button
                        onClick={(e) => toggleDropdown(e, link.title)}
                        className={`px-3 py-2 ${navTextClasses} ${navHoverClasses} hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === link.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {link.dropdownItems && activeDropdown === link.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4"
                    >
                      {link.dropdownItems.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, false)}
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {item.title}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <a
                href="https://wa.me/+628125844194"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
