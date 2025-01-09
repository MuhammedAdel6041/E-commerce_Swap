import { Input } from "antd";
import { useState } from "react";
import axios from "axios";

export default function SearchBox() {
  const { Search } = Input;

  // State hooks for search results and loading state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle API call on search
  const api = "https://dummyjson.com/products";
  const handleSearch = async (value) => {
    if (!value) return;

    setLoading(true);
    try {
      const response = await axios.get(`${api}/search?q=${value}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("< From Search Bar > Loading -> ", loading);
  console.log("< From Search Bar > Results -> ", results);
  return (
    <>
      <style>
        {`
          .custom-search-button .ant-input-search-button {
            background-color: #e54666 !important;
            border-color: #e54666 !important;
          }

          .custom-search-button .ant-input-search-button:hover {
            background-color: darkred !important;
            border-color: darkred !important;
          }
        `}
      </style>
      <Search
        className="p-4 custom-search-button"
        placeholder="Input search text"
        onSearch={handleSearch}
        enterButton
      />
    </>
  );
}
