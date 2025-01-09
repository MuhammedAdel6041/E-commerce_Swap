 
import logo from "../../assets/images/Base-long-Logo.png";

export default function Footer() {
  return (
    <footer className="bg-white antialiased dark:bg-gray-600">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="border-b border-gray-100 py-6 dark:border-gray-700 md:py-8 lg:py-16">
          <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-24">
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-6 md:gap-8 xl:grid-cols-3">
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
                  <h6 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                    {section.title}
                  </h6>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 w-full md:mt-8 lg:mt-0 lg:max-w-lg">
              <div className="space-y-5 rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                
                <hr className="border-gray-200 dark:border-gray-600" />
                <form>
                  <div className="flex items-end space-x-3">
                    <div className="relative w-full">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Get the latest deals and more.
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-lg bg-primary-700 px-5 py-3 text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                <hr className="border-gray-200 dark:border-gray-600" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Trade on the go with{" "}
                  <a href="#" className="underline hover:no-underline">
                    Flowbite App
                  </a>
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600"
                  >
                    <span>Google Play</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600"
                  >
                    <span>App Store</span>
                  </a>
                </div>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "instagram", "github"].map((icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      <span className="sr-only">{icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 md:py-8">
          <div className="flex flex-col items-center gap-4 text-sm text-gray-900 dark:text-white lg:flex-row lg:justify-between">
            <a href="#">
              <img src={logo} alt="Company Logo" className="h-8" />
            </a>
            <ul className="flex flex-wrap justify-center gap-4">
              {["Legal Notice", "Terms of Use"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="font-medium hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <p>© 2024 Your Company, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
