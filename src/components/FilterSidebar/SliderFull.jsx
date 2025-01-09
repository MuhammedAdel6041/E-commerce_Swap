import PropTypes from "prop-types";
import { Button, Slider, Typography } from "antd";

export default function SliderFull({
  handleReset,
  sliderValue,
  setSliderValue,
  maxPrice,
  title,
}) {
  return (
    <div>
      {/* CSS داخل نفس الملف */}
      <style>{`
        .ant-slider-track {
          background-color: #ec4899 !important; /* لون الـ track */
        }

      `}</style>

      {/* Component Slider */}
      <div className="flex justify-between">
        <Typography.Title level={5}>{title}</Typography.Title>
        <Button type="link" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <Slider
        range
        max={maxPrice}
        value={sliderValue}
        onChange={(value) => setSliderValue(value)}
        tooltip={{
          formatter: (value) => `${value} EGP`,
        }}
        style={{
          trackStyle: { backgroundColor: "#ddd" },
          handleStyle: { backgroundColor: "red" },
        }}
      />

      {/* عرض القيم المختارة بشكل صحيح */}
      <div className="flex justify-between">
        <Typography.Text>Min: {sliderValue[0]} EGP</Typography.Text>
        <Typography.Text>Max: {sliderValue[1]} EGP</Typography.Text>
      </div>

      {/* <Button type="link" className="text-red-700" onClick={handleApply}>
        Apply
      </Button> */}
      {/* Component Slider */}
    </div>
  );
}

// Adding prop types for better validation
SliderFull.propTypes = {
  handleReset: PropTypes.func.isRequired,
  sliderValue: PropTypes.arrayOf(PropTypes.number), // تعديل هنا ليكون مصفوفة من الأرقام
  setSliderValue: PropTypes.func.isRequired,
  maxPrice: PropTypes.number.isRequired,
  title: PropTypes.string,
};
