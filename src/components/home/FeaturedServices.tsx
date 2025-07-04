// src/components/home/FeaturedServices.tsx
import Link from 'next/link';

const FeaturedServices = () => {
  const services = [
    {
      id: 1,
      title: 'Luxury Suites',
      description:
        'Spacious and elegantly designed suites with premium amenities and stunning city views.',
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      link: '/rooms',
      features: ['King-size beds', 'City views', 'Premium amenities'],
    },
    {
      id: 2,
      title: 'Fine Dining',
      description:
        'Experience culinary excellence at our award-winning restaurant with international cuisine.',
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      link: '/dining',
      features: [
        'International cuisine',
        'Award-winning chef',
        'Wine selection',
      ],
    },
    {
      id: 3,
      title: '24/7 Concierge',
      description:
        'Round-the-clock personalized service to ensure your every need is met during your stay.',
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      link: '/contact',
      features: ['24/7 availability', 'Personal assistance', 'Local expertise'],
    },
    {
      id: 4,
      title: 'Spa & Wellness',
      description:
        'Rejuvenate your body and mind with our comprehensive spa and wellness facilities.',
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600"
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
      ),
      link: '/spa',
      features: ['Full-service spa', 'Fitness center', 'Wellness programs'],
    },
    {
      id: 5,
      title: 'Business Center',
      description:
        'State-of-the-art business facilities for meetings, conferences, and corporate events.',
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      link: '/business',
      features: ['Meeting rooms', 'Conference facilities', 'Tech support'],
    },
    {
      id: 6,
      title: 'Premium Transport',
      description:
        'Luxury airport transfers and city transportation with our premium vehicle fleet.',
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      link: '/transport',
      features: ['Airport transfers', 'City tours', 'Luxury vehicles'],
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-6">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-primary-700 text-sm sm:text-base font-medium">
              Premium Services
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Exceptional Amenities
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of luxury services designed to make
            your stay unforgettable and exceed your every expectation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-1 sm:space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="pt-2 sm:pt-4">
                  <Link
                    href={service.link}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base transition-colors duration-200"
                  >
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Experience Luxury?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Book your stay today and discover why Patricia Hotel & Suites is
              the preferred choice for discerning travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                href="/booking"
                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 sm:px-10 rounded-lg transition-all duration-200 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book Your Stay
              </Link>
              <Link
                href="/rooms"
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-8 sm:px-10 rounded-lg transition-all duration-200 text-sm sm:text-base lg:text-lg"
              >
                View Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
