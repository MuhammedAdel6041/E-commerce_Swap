
import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Rate, Button, Tag } from "antd";
// import { ShoppingCart, Heart } from "lucide-react";
import PropTypes from "prop-types";
import { useCart } from "../../app/CartContext";

export default function ProductInfo({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="space-y-6">
      {/* Title, Description, and Rating */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{product.title}</h1>
        <p className="text-gray-500 text-sm">{product.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <Rate disabled defaultValue={product.rating} className="text-sm" />
          <span className="text-gray-500">({product.rating} average rating)</span>
        </div>
      </div>

      {/* Pricing Information */}
      <div>
        <span className="text-3xl font-bold text-gray-900">
          ₹{product.price.toFixed(2)}
        </span>
        <span className="ml-2 text-gray-500 line-through">
          ₹{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
        </span>
        <span className="ml-2 text-green-500">
          Save {product.discountPercentage.toFixed(2)}%
        </span>
      </div>

      {/* Stock and Warranty */}
      <div>
        <Tag color={product.stock < 10 ? "red" : "green"}>{product.availabilityStatus}</Tag>
        <p className="text-gray-500 text-sm">
          Warranty: {product.warrantyInformation}
        </p>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
        <Tag color="blue">{product.category}</Tag>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          type="primary"
          size="large"
          className="bg-red-500"
          icon={<ShoppingCartOutlined className="w-4 h-4" />}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
        <Button size="large" icon={<HeartFilled className="w-4 h-4" />}>
          Wishlist
        </Button>
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        {product.returnPolicy && <Tag color="orange">{product.returnPolicy}</Tag>}
        {product.shippingInformation && (
          <Tag color="blue">{product.shippingInformation}</Tag>
        )}
      </div>
    </div>
  );
}
ProductInfo.propTypes = {
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      warrantyInformation: PropTypes.string,
      availabilityStatus: PropTypes.string,
      returnPolicy: PropTypes.string,
      shippingInformation: PropTypes.string,
    }).isRequired,
  };