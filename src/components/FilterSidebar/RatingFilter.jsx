import { Rate } from "antd";
import PropTypes from "prop-types";

function RatingFilter({ rating, setRating }) {
  return (
    <div className="px-2">
      <style>
        {`
          .custom-stars .ant-rate-star {
            border: 1px solid #ccc;
            padding: 2px;
            border-radius: 4px;
          }
        `}
      </style>
      <Rate value={rating} onChange={setRating} className="custom-stars" />
      {/* <div className="text-sm text-gray-600 mt-2">Min. {rating} stars</div> */}
    </div>
  );
}

export default RatingFilter;

RatingFilter.propTypes = {
  setRating: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired, // عدلتها من array لـ number
};
