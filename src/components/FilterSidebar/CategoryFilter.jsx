import { Radio, Typography } from "antd";
import PropTypes from "prop-types";
export default function CategoryFilter({ categories, setCategory }) {
  const handleChange = (e) => {
    if (e.target.checked) {
      setCategory(e.target.value);
      //   console.log(e.target.value);
    } else {
      setCategory("all");
      //   console.log("all");
    }
  };
  //   console.log(categories);
  return (
    <div>
      <Typography.Title level={5}>Addition Time</Typography.Title>

      <Radio.Group className="flex flex-col gap-2">
        {categories.map((category) => {
          return (
            <Radio value={category} onChange={handleChange} key={category}>
              {category}
            </Radio>
          );
        })}

        <Radio value={"all"} onChange={handleChange}>
          All
        </Radio>
      </Radio.Group>
    </div>
  );
}
CategoryFilter.propTypes = {
  categories: PropTypes.array,
  setCategory: PropTypes.func,
};
