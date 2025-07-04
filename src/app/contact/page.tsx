// src/app/contact/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import LoadingSkeleton, {
  PageSkeleton,
  ContactFormSkeleton,
} from '@/components/ui/LoadingSkeleton';
import Button from '@/components/ui/Button';

const ContactPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('contact');
  const searchParams = useSearchParams();

  // Load page data
  useEffect(() => {
    const loadContactData = async () => {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check for inquiry type from URL params
      const inquiryType = searchParams?.get('inquiry');
      if (inquiryType) {
        setActiveSection('contact');
      }

      setIsLoading(false);
    };

    loadContactData();
  }, [searchParams]);

  const handleFormSubmit = async (data: any) => {
    // In real app, this would submit to backend
    console.log('Contact form submitted:', data);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Could redirect to thank you page or show success message
    alert("Thank you for your message! We'll get back to you within 24 hours.");
  };

  // Icons
  const PhoneIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-primary-600"
    >
      <path
        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59344 1.99522 8.06544 2.16708 8.43999 2.48C8.81454 2.79292 9.06902 3.23038 9.15999 3.71C9.33073 4.66573 9.61644 5.59871 10.01 6.49C10.2 6.96 10.08 7.49 9.71999 7.85L8.38999 9.18C9.93024 11.6765 12.3236 14.0699 14.82 15.61L16.15 14.28C16.51 13.92 17.04 13.8 17.51 13.99C18.4013 14.3836 19.3343 14.6693 20.29 14.84C20.7741 14.9311 21.215 15.1888 21.5257 15.5689C21.8365 15.9489 22.0003 16.4249 21.99 16.91L22 16.92Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-primary-600"
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

  const LocationIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-primary-600"
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

  const ClockIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-primary-600"
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

  const MessageIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-primary-600"
    >
      <path
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const QuestionIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-primary-600"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17H12.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageSkeleton variant="contact" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Patricia Hotel
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're here to assist you with reservations, inquiries, and any
            special requests. Our dedicated team is available 24/7 to ensure
            your experience exceeds expectations.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Call Us</h3>
            <p className="text-sm text-gray-600 mb-3">24/7 Available</p>
            <a
              href="tel:+1234567890"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              +234 201 330 9330
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EmailIcon />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Email Us</h3>
            <p className="text-sm text-gray-600 mb-3">
              Response within 4 hours
            </p>
            <a
              href="mailto:info@machi-kunzult.com"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              info@machi-kunzult.com
            </a>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LocationIcon />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Visit Us</h3>
            <p className="text-sm text-gray-600">
              35, Olowu Street
              <br />
              Ikeja Lagos
              <br />
              Nigeria
            </p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Front Desk</h3>
            <p className="text-sm text-gray-600">
              Open 24/7
              <br />
              Concierge Available
              <br />
              Always Ready to Help
            </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'contact', label: 'Send Message', icon: <MessageIcon /> },
              {
                id: 'location',
                label: 'Location & Directions',
                icon: <LocationIcon />,
              },
              { id: 'faq', label: 'FAQ', icon: <QuestionIcon /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeSection === tab.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        {activeSection === 'contact' && (
          <div className="mb-16">
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {/* Location Section */}
        {activeSection === 'location' && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Map Placeholder */}
              <div className="h-96 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <LocationIcon />
                  <p className="text-gray-600 mt-2">
                    Interactive Map Coming Soon
                  </p>
                  <p className="text-sm text-gray-500">
                    35, Olowu Street Ikeja Lagos
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Address & Contact */}
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                      Hotel Address
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <LocationIcon />
                        <div>
                          <p className="font-medium text-gray-900">
                            Patricia Hotel
                          </p>
                          <p className="text-gray-600">33 Olowu Strret</p>
                          <p className="text-gray-600">Ikeja Lagos</p>
                          <p className="text-gray-600">Nigeria</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <PhoneIcon />
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600">+234 201 330 9330</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <EmailIcon />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-gray-600">
                            info@machi-kunzult.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Directions */}
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                      Getting Here
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          From Airport
                        </h4>
                        <p className="text-sm text-gray-600">
                          Take the express train to Downtown Station (15
                          minutes), then a 5-minute taxi ride to the hotel.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          By Car
                        </h4>
                        <p className="text-sm text-gray-600">
                          Valet parking available ($35/night). Self-parking
                          garage across the street ($25/night).
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Public Transport
                        </h4>
                        <p className="text-sm text-gray-600">
                          Metro Blue Line to City Center Station (2 blocks
                          away). Bus routes 15, 22, 45 stop directly in front of
                          hotel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    question: 'What time is check-in and check-out?',
                    answer:
                      'Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability.',
                  },
                  {
                    question: 'Do you offer airport transportation?',
                    answer:
                      'Yes, we provide luxury airport transportation service. Please contact our concierge at least 24 hours in advance to arrange pickup.',
                  },
                  {
                    question: 'What is your cancellation policy?',
                    answer:
                      'Free cancellation up to 24 hours before your check-in date. Cancellations within 24 hours are subject to a one-night penalty.',
                  },
                  {
                    question: 'Do you allow pets?',
                    answer:
                      'Yes, we welcome pets with an additional fee of $75 per night. Please inform us when booking so we can prepare a pet-friendly room.',
                  },
                  {
                    question: 'Is WiFi available throughout the hotel?',
                    answer:
                      'Complimentary high-speed WiFi is available in all guest rooms and public areas throughout the hotel.',
                  },
                  {
                    question: 'Do you have a fitness center and spa?',
                    answer:
                      'Yes, our 24-hour fitness center and full-service spa are available to all guests. Spa treatments require advance booking.',
                  },
                  {
                    question: 'What dining options are available?',
                    answer:
                      'Patricia Hotel features a fine dining restaurant (6 AM - 11 PM), bar & lounge (4 PM - 2 AM), and exclusive nightclub (Thu-Sun, 9 PM - 3 AM).',
                  },
                  {
                    question: 'Is parking available?',
                    answer:
                      "Yes, we offer valet parking ($35/night) and there's a self-parking garage across the street ($25/night). Reservations recommended.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Department Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Reservations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Reservations
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon />
                <span className="text-gray-600">+234 201 330 9330</span>
              </div>
              <div className="flex items-center space-x-3">
                <EmailIcon />
                <span className="text-gray-600">
                  reservations@patriciahotel.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ClockIcon />
                <span className="text-gray-600">24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Events & Catering */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Events & Catering
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon />
                <span className="text-gray-600">+234 201 330 9330</span>
              </div>
              <div className="flex items-center space-x-3">
                <EmailIcon />
                <span className="text-gray-600">events@patriciahotel.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <ClockIcon />
                <span className="text-gray-600">Mon-Fri: 9 AM - 6 PM</span>
              </div>
            </div>
          </div>

          {/* Concierge */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Concierge Services
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon />
                <span className="text-gray-600">+234 201 330 9330</span>
              </div>
              <div className="flex items-center space-x-3">
                <EmailIcon />
                <span className="text-gray-600">contact@machtrip.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <ClockIcon />
                <span className="text-gray-600">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h3 className="font-medium text-red-900 mb-2">Emergency Contact</h3>
          <p className="text-red-800 mb-4">
            For urgent matters or emergencies, please contact our 24/7 front
            desk immediately.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 text-red-700 hover:text-red-800 font-medium"
            >
              <PhoneIcon />
              <span>+234 201 330 9330</span>
            </a>
            <span className="text-red-600">•</span>
            <span className="text-red-700">Available 24/7</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ContactPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PageSkeleton variant="contact" />
          </div>
          <Footer />
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
};

export default ContactPage;
