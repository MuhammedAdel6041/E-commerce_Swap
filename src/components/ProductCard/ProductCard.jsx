import { HeartOutlined } from "@ant-design/icons";
import propTypes from "prop-types";
// import products from "../../assets/images/Product.jpg";
import CButton from "../shared/CustomButton";

export default function ProductCard({ product }) {
  const { title, price, thumbnail, category } = product;
  // console.log(product);
  return (
    <>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white flex flex-col justify-between">
        <div className="relative">
          <div className="box-border border flex justify-center">
            <img
              src={thumbnail}
              alt="Nike Air Force 1 Shadow sneakers"
              className="h-60 object-cover"
            />
          </div>
          <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md">
            <HeartOutlined className="text-gray-600 text-lg" />
          </button>
        </div>
        <div className="px-4 py-4 flex flex-col gap-2">
          <div className="text-sm text-gray-500">{category}</div>
          <h2 className="font-bold text-xl text-gray-800">{title}</h2>
          <p className="text-3xl font-bold text-pink-500">
            {price} <span className="text-sm font-normal">EGP</span>
          </p>
          <div className="flex items-center text-sm text-blue-600">
            {/* <Zap className="w-4 h-4 mr-1" /> */}
            <span className="font-medium">Fast Shipping</span>
            <span className="ml-1 text-gray-500">Get it by 11 sep</span>
          </div>
          <div className="cartbtn">
            <CButton clasName="">Add To Cart</CButton>
          </div>
        </div>
      </div>
    </>
  );
}

ProductCard.propTypes = {
  product: propTypes.object.isRequired,
};
