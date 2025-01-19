/* eslint-disable react/prop-types */
 

const Reviews = ({ reviews = [] }) => {
  // Static fallback data if there are no reviews
  const fallbackReviews = [
    {
      id: 1,
      rating: 4,
      comment:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro blanditiis sapiente ab dolores, ad dignissimos perspiciatis.",
      author: "John Lester",
      date: "March 01, 2022",
      avatar: "https://example.com/path/to/your/custom-avatar.png", // Replace with your custom avatar URL
    },
  ];

  const reviewData = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <ul className="mt-6">
      {reviewData.map((review) => (
        <li
          key={review.id}
          className="py-8 text-left border px-4 m-2 rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-start">
            <img
              className="block h-10 w-10 max-w-full flex-shrink-0 rounded-full"
              src={review.avatar || "https://example.com/path/to/your/custom-avatar.png"} // Fallback avatar
              alt={review.author || "User"}
            />
            <div className="ml-6">
              {/* Star Rating */}
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`block h-6 w-6 ${
                      index < review.rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Comment */}
              <p className="mt-5 text-base text-gray-900">{review.comment}</p>

              {/* Author and Date */}
              <p className="mt-5 text-sm font-bold text-gray-900">
                {review.author || "Anonymous"}
              </p>
              <p className="mt-1 text-sm text-gray-600">{review.date}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
