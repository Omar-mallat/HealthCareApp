import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 text-white py-8 border-t border-blue-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo and Company Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Labes Solutions</h3>
              <p className="text-blue-200 text-sm">
                Healthcare Innovation Platform
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6 text-sm">
            <a
              href="#"
              className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Ethics</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Contact</span>
            </a>

            <div className="flex items-center space-x-2 text-blue-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="font-medium">
                © {new Date().getFullYear()} Tous droits réservés
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-6 pt-4 border-t border-blue-800/30 text-center">
          <p className="text-blue-300 text-xs">
            Empowering healthcare professionals with advanced voice recognition
            technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
