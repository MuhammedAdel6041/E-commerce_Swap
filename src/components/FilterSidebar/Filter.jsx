import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Typography, Button, Divider } from "antd";
// import SliderFull from "./SliderFull";
import RatingFilter from "./RatingFilter";
import InStock from "./InStock";
import SliderFull from "./SliderFull";
import CreationTime from "./CreationTime";
import ProductStatus from "./ProductStatus";
import CategoryFilter from "./CategoryFilter";

function Filter({ products, onApply, onReset }) {
  const maxPrice = Math.max(...products.map((product) => product.price));
  const categ = Array.from(
    new Set(products.map((product) => product.category))
  );
  const [sliderValue, setSliderValue] = useState([0, maxPrice]);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [timeRange, setTimeRange] = useState("all_time");
  const [productStatus, setProductStatus] = useState("new");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setSliderValue([0, maxPrice]);
  }, [maxPrice]);
  // console.log(categ);
  const handleApply = () => {
    onApply(sliderValue, rating, inStock, timeRange, category);
  };

  const handleReset = () => {
    onReset();
    setSliderValue([0, maxPrice]);
    setRating(0);
    setCategory("all");
  };

  return (
    <div className="p-6  rounded-lg flex flex-col gap-9">
      <div className="FilterTitle">
        <div className="flex justify-between">
          <Typography.Title level={5}>Search Filter</Typography.Title>
          <Button type="link" className="text-gray-600" onClick={handleReset}>
            Reset All
          </Button>
        </div>
        <Divider />
      </div>

      {/* Slider Component */}
      <div className="prcieSlider">
        <SliderFull
          handleReset={handleReset}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          maxPrice={maxPrice}
          title={"Price"}
        />
      </div>

      <div className="rating space-y-4">
        <Typography.Title level={5}>Rating</Typography.Title>

        <RatingFilter rating={rating} setRating={setRating} />
      </div>
      <div className="instock">
        <Typography.Title level={5}>In Stock</Typography.Title>

        <InStock setInStock={setInStock} />
      </div>
      <div className="time">
        <CreationTime setTimeRange={setTimeRange} />
      </div>
      <div className="product_status">
        <ProductStatus SetProductStatus={setProductStatus} />
      </div>
      <div className="categories">
        <CategoryFilter categories={categ} setCategory={setCategory} />
      </div>
      <div className="aplly flex justify-end">
        <Button type="link" className="text-red-700 " onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}

Filter.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onApply: PropTypes.func,
  onReset: PropTypes.func,
};

export default Filter;
