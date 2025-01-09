import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

export default function CategorySlider() {
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api-v1-cdk5.onrender.com/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-6">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-black text-lg font-medium"> </h3>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg transition-colors"
            >
              <LeftOutlined />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg transition-colors"
            >
              <RightOutlined />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth pb-4 justify-between"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex-shrink-0 cursor-pointer group row"
            >
              <div className="bg-[#2A2A2A] h-[200px] w-[200px] rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <h4 className="absolute bottom-3 left-3 text-white text-lg font-medium z-20">
                  {category.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
