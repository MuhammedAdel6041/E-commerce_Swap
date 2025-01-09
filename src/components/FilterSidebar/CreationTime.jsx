import { Radio, Typography } from "antd";
import PropTypes from "prop-types";

export default function CreationTime({ setTimeRange }) {
  const handleChange = (e) => {
    if (e.target.checked) {
      setTimeRange(e.target.value);
    } else {
      // لما يكون الـ`Checkbox` غير محدد، يمكن إرسال `null` أو قيمة مختلفة للإشارة إلى إلغاء التحديد.
      setTimeRange("all_time");
    }
  };

  return (
    <div>
      <Typography.Title level={5}>Addition Time</Typography.Title>

      <Radio.Group className="flex flex-col gap-2">
        <Radio value={7} onChange={handleChange}>
          Last 7 Days
        </Radio>
        <Radio value={30} onChange={handleChange}>
          Last 30 Days
        </Radio>
        <Radio value={90} onChange={handleChange}>
          Last 90 Days
        </Radio>
        <Radio value={"all_time"} onChange={handleChange}>
          All Time
        </Radio>
      </Radio.Group>
    </div>
  );
}

CreationTime.propTypes = {
  setTimeRange: PropTypes.func,
};
