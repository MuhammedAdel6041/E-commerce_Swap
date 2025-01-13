import logo from "../../assets/images/Base-long-Logo.png";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="border-b border-gray-200 py-10">
          <div className="flex flex-wrap gap-10 justify-between">
            {/* Links Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-auto">
              {[
                {
                  title: "Company",
                  links: ["About", "Premium", "Blog", "Affiliate Program", "Get Coupon"],
                },
                {
                  title: "Order & Purchases",
                  links: [
                    "Order Status",
                    "Track Your Order",
                    "Purchase History",
                    "Returns & Refunds",
                    "Payment Methods",
                  ],
                },
                {
                  title: "Support & Services",
                  links: [
                    "Contact Support",
                    "FAQs",
                    "Service Centers",
                    "Warranty Information",
                    "Product Manuals",
                  ],
                },
              ].map((section, idx) => (
                <div key={idx}>
                  <h6 className="mb-4 text-lg font-bold text-gray-900">
                    {section.title}
                  </h6>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="flex-1 max-w-lg">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h6 className="text-lg font-bold text-gray-900 mb-4">
                  Stay Updated
                </h6>
                <p className="text-sm text-gray-600 mb-6">
                  Subscribe to our newsletter and get the latest deals and updates.
                </p>
                <form className="flex items-center space-x-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-gray-800 text-white px-5 py-3 text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* App Links */}
              <div className="mt-6 flex flex-col space-y-4">
                <p className="text-sm text-gray-600">
                  Trade on the go with our mobile app:
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700"
                  >
                    Google Play
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700"
                  >
                    App Store
                  </a>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="mt-6 flex gap-4">
                {["facebook", "twitter", "instagram", "github"].map((icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span className="sr-only">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 text-center border-t border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <a href="#">
              <img src={logo} alt="Company Logo" className="h-10" />
            </a>
            <ul className="flex flex-wrap justify-center gap-4 text-sm mt-4 lg:mt-0">
              {["Legal Notice", "Terms of Use"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 lg:mt-0 text-gray-600 text-sm">
              © 2024 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

