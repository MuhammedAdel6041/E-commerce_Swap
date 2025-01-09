import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import Filter from "../components/FilterSidebar/Filter";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function Category() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const api = "https://dummyjson.com/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const result = await response.json();
        setData(result.products);
        setFilteredData(result.products);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = (
    [minPrice = 0, maxPrice = 2999],
    minRating = 0,
    inStock = "In Stock",
    timeRange = "all_time",
    category = "all"
  ) => {
    const currentTime = new Date();

    const newFilteredData = data.filter((product) => {
      const productDate = new Date(product.meta.updatedAt);
      const isWithinTimeRange = (() => {
        switch (timeRange) {
          case 7:
            return (currentTime - productDate) / (1000 * 60 * 60 * 24) <= 7;
          case 30:
            return (currentTime - productDate) / (1000 * 60 * 60 * 24) <= 30;
          case 90:
            return (currentTime - productDate) / (1000 * 60 * 60 * 24) <= 90;
          case "all_time":
          default:
            return true;
        }
      })();

      return (
        (minPrice === 0 || product.price >= minPrice) &&
        (maxPrice === 0 || product.price <= maxPrice) &&
        (minRating === 0 || product.rating >= minRating) &&
        (inStock === "" || inStock === "In Stock"
          ? product.availabilityStatus === inStock
          : true) &&
        (category === "all" || product.category === category) &&
        isWithinTimeRange
      );
    });

    setFilteredData(newFilteredData);
  };

  const handleReset = () => {
    setFilteredData(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 justify-center">
      <button
        className="lg:hidden bg-blue-500 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Filter" : "Open Filter"}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block col-span-12 lg:col-span-3 mb-6 lg:mb-0  p-4 shadow rounded-lg`}
      >
        <Filter products={data} onApply={handleApply} onReset={handleReset} />
      </div>

      {/* Product Grid */}
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {isLoading ? (
            <p>Loading ...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <div className="flex flex-col items-center w-full gap-2">
              <ExclamationCircleOutlined
                style={{ fontSize: "90px", color: "#ddd" }}
                className="mb-2"
              />
              <p className="font-bold">No Products Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
