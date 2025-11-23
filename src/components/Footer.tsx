import type { MouseEvent } from "react";

const Footer = () => {
  const handleNavClick = (
    e: MouseEvent<HTMLElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 64; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Alpian</h2>
            <p className="text-gray-400 mb-4">
              Creating innovative solutions for a digital world. We specialize
              in web development, UI/UX design, and digital marketing.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Nova%20Pratama.id"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Facebook in a new tab"
              >
                {/* Facebook SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 2a6 6 0 00-6 6v4H8v4h4v10h4V16h4l2-4h-6V8a2 2 0 012-2h2V2h-2z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/AlpianPPLG"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub in a new tab"
              >
                {/* Github SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2a10 10 0 00-3.16 19.485c.5.093.684-.217.684-.484 0-.237-.008-.868-.013-1.704-2.783.604-3.373-1.343-3.373-1.343-.454-1.152-1.107-1.459-1.107-1.459-.905-.617.069-.605.069-.605 1 .07 1.527 1.031 1.527 1.031.889 1.52 2.334 1.08 2.91.826.092-.644.348-1.08.634-1.327-2.221-.253-4.556-1.11-4.556-4.938 0-1.09.39-1.986 1.029-2.684-.103-.253-.447-1.267.098-2.637 0 0 .84-.27 2.75 1.031A9.573 9.573 0 0112 8.347a9.573 9.573 0 013.16.484c1.91-1.301 2.75-1.031 2.75-1.031.545 1.37.201 2.383.098 2.637.639.698 1.029 1.594 1.029 2.684 0 3.828-2.337 4.684-4.558 4.938.358.308.676.917.676 1.847 0 1.333-.012 2.41-.012 2.743 0 .27.183.578.688.484A10 10 0 0012 2z"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/_nova.pratama/?__pwa=1"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram in a new tab"
              >
                {/* Instagram (brand) SVG — filled, better contrast */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608C4.516 2.495 5.783 2.224 7.149 2.163 8.415 2.105 8.796 2.094 12 2.094V2.163zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/alpian-%E3%85%A4-7a16522bb/"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn in a new tab"
              >
                {/* LinkedIn (brand) SVG — official mark, filled */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.082 20.452H3.56V9h3.522v11.452zM5.321 7.433a2.037 2.037 0 110-4.075 2.037 2.037 0 010 4.075zM20.452 20.452h-3.521v-5.604c0-1.337-.027-3.057-1.865-3.057-1.867 0-2.152 1.458-2.152 2.964v5.697H9.356V9h3.381v1.561h.049c.471-.893 1.624-1.833 3.342-1.833 3.576 0 4.238 2.353 4.238 5.413v6.311z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, "#hero")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, "#services")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, "#portfolio")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Mobile App Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  SEO Optimization
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Alpian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
