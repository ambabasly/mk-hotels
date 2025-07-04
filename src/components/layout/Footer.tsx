// src/components/layout/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Location Icon
  const LocationIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-primary-400 flex-shrink-0"
    >
      <path
        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 6.13401 6.13401 3 10 3H14C17.866 3 21 6.13401 21 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  // Phone Icon
  const PhoneIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-primary-400 flex-shrink-0"
    >
      <path
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Email Icon
  const EmailIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-primary-400 flex-shrink-0"
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Clock Icon
  const ClockIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-primary-400 flex-shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="12,6 12,12 16,14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Social Media Icons
  const FacebookIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const InstagramIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        ry="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.957 14.8821 3.284C14.0247 3.61099 13.2884 4.19424 12.773 4.95372C12.2575 5.7132 11.9877 6.61262 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39624C5.36074 6.60667 4.01032 5.43666 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Desktop: 4-column layout, Mobile: stacked layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Hotel Information */}
          <div className="lg:col-span-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
              >
                <rect width="40" height="40" rx="8" fill="#7c3aed" />
                <path
                  d="M8 32V12C8 10.8954 8.89543 10 10 10H30C31.1046 10 32 10.8954 32 12V32"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect x="12" y="14" width="4" height="6" fill="white" />
                <rect x="18" y="14" width="4" height="6" fill="white" />
                <rect x="24" y="14" width="4" height="6" fill="white" />
                <rect x="12" y="22" width="4" height="6" fill="white" />
                <rect x="18" y="22" width="4" height="6" fill="white" />
                <rect x="24" y="22" width="4" height="6" fill="white" />
                <rect x="16" y="28" width="8" height="4" fill="white" />
              </svg>
              <div>
                <h3 className="font-serif font-bold text-2xl text-white">Patricia</h3>
                <span className="text-sm text-gray-400 font-light tracking-wide uppercase">Hotel & Suites</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
              Experience luxury and comfort at Patricia Hotel & Suites. Where exceptional service meets elegant accommodations, fine dining, and vibrant nightlife.
            </p>
            
            {/* Social Media */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold text-xl mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/rooms" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm lg:text-base block py-1">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/dining" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm lg:text-base block py-1">
                  Restaurant & Bar
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm lg:text-base block py-1">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm lg:text-base block py-1">
                  Book Your Stay
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm lg:text-base block py-1">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold text-xl mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <LocationIcon />
                <div className="text-gray-300 text-sm lg:text-base">
                  <p>35 Olowu Street</p>
                  <p>Ikeja Lagos</p>
                  <p>Nigeria</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <PhoneIcon />
                <a
                  href="tel:+2348123456789"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm lg:text-base"
                >
                 +234 201 330 9330
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <EmailIcon />
                <a
                  href="mailto:info@patriciahotel.ng"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm lg:text-base break-all"
                >
                  info@patriciahotel.ng
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold text-xl mb-6 text-white">Operating Hours</h4>
            <div className="space-y-4">
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <ClockIcon />
                <div className="text-gray-300 text-sm lg:text-base">
                  <p className="font-medium text-white mb-1">Front Desk</p>
                  <p>24/7 Available</p>
                </div>
              </div>
              <div className="text-gray-300 text-sm lg:text-base text-center md:text-left">
                <p className="font-medium text-white mb-1">Restaurant</p>
                <p>Mon-Sun: 6:00 AM - 11:00 PM</p>
              </div>
              <div className="text-gray-300 text-sm lg:text-base text-center md:text-left">
                <p className="font-medium text-white mb-1">Nightclub</p>
                <p>Thu-Sun: 9:00 PM - 3:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © {currentYear} Patricia Hotel & Suites. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-center">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 py-1">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 py-1">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 py-1">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;