import { Modal, Input, Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const { Text } = Typography;

export default function NewAddress({ isOpen, onClose }) {
    return (
        <Modal
            title="Add New Address"
            open={isOpen}
            onOk={onClose}
            onCancel={onClose}
            footer={null}
            className="rounded-md"
        >
            <div className="space-y-4">
                {/* Address Name */}
                <div>
                    <Text className="block font-medium text-gray-600 mb-1">Address Name</Text>
                    <Input placeholder="Enter Name" className="rounded-md" />
                </div>

                {/* Description */}
                <div>
                    <Text className="block font-medium text-gray-600 mb-1">Description</Text>
                    <Input placeholder="Enter Description" className="rounded-md" />
                </div>

                {/* Map Placeholder */}
                <div className="relative border rounded-md overflow-hidden">
                    <img
                        src="https://via.placeholder.com/400x200.png?text=Map+Placeholder"
                        alt="Map"
                        className="w-full"
                    />
                    <button
                        className="absolute top-3 right-3 bg-white text-gray-600 px-3 py-1 rounded-md flex items-center shadow"
                    >
                        <EditOutlined className="mr-2" />
                        Modify
                    </button>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <Button onClick={onClose} className="rounded-md">
                        Close
                    </Button>
                    <Button type="primary" onClick={onClose} className="rounded-md bg-main">
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// Prop validation
NewAddress.propTypes = {
    isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean and is required
    onClose: PropTypes.func.isRequired, // onClose must be a function and is required
};
