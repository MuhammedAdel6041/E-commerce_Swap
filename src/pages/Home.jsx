 
import { Layout } from "antd";
import MainSlider from "../components/MainSlider/MainSlider";

import ProductSPage from "./ProductSPage";
import Growth from "../components/Growth";
import CategorySlider from "../components/CategorySlider/CategorySlider";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout className="overflow-x-hidden"> {/* Prevent side scrolling */}
      <Content>
        <MainSlider />
        <CategorySlider/>
        <Growth />
        <ProductSPage />
      </Content>
    </Layout>
  );
}
