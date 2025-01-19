import { Layout, Spin } from "antd";
import { useState, useEffect } from "react"; // Import useState and useEffect
import MainSlider from "../components/MainSlider/MainSlider";
import ProductSPage from "./ProductSPage";
import Growth from "../components/Growth";
import CategorySlider from "../components/CategorySlider/CategorySlider";

const { Content } = Layout;

export default function Home() {
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate data loading (replace this with your actual data-fetching logic)
    const loadData = async () => {
      try {
        // Simulate data fetch for all components
        await Promise.all([
          new Promise((resolve) => setTimeout(resolve, 2000)), // Simulate loading for MainSlider
          new Promise((resolve) => setTimeout(resolve, 1500)), // Simulate loading for CategorySlider
          new Promise((resolve) => setTimeout(resolve, 3000)), // Simulate loading for ProductSPage
          new Promise((resolve) => setTimeout(resolve, 2500)), // Simulate loading for Growth
        ]);
        setLoading(false); // Set loading to false after all data is fetched
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Layout className="overflow-x-hidden"> {/* Prevent side scrolling */}
        <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spin size="large" tip="Loading data..." />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="overflow-x-hidden">
      <Content>
        <MainSlider />
        <CategorySlider />
        <Growth />
        <ProductSPage />
      </Content>
    </Layout>
  );
}
