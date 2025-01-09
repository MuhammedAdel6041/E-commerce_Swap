import { Radio, Typography } from "antd";
import PropTypes from "prop-types";

export default function ProductStatus({ SetProductStatus }) {
  const handleChange = (e) => {
    if (e.target.checked) {
      SetProductStatus(e.target.value);
    } else {
      SetProductStatus("new");
    }
  };

  return (
    <div>
      <Typography.Title level={5}>Condition</Typography.Title>

      <Radio.Group className="flex flex-col gap-2">
        <Radio value={"new"} onChange={handleChange}>
          New
        </Radio>
        <Radio value={"used"} onChange={handleChange}>
          Used
        </Radio>
      </Radio.Group>
    </div>
  );
}

ProductStatus.propTypes = {
  SetProductStatus: PropTypes.func,
};
