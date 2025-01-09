import { Checkbox } from "antd";
import PropTypes from "prop-types";

export default function InStock({ setInStock }) {
  const handleChange = (e) => {
    setInStock(e.target.checked ? "In Stock" : "Low Stock"); // إذا تم التحقق، اجعل القيمة "In Stock"، وإلا اجعلها فارغة
  };

  return (
    <div>
      {/* <Radio onChange={handleChange}>In Stock</Radio> */}
      <Checkbox onChange={handleChange}>In Stock</Checkbox>
    </div>
  );
}

InStock.propTypes = {
  setInStock: PropTypes.func.isRequired,
};
