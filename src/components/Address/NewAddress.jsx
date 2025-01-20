/* eslint-disable no-unused-vars */
import { Modal, Input, Button, Typography, Form } from 'antd';
import PropTypes from 'prop-types';

const { Text } = Typography;

export default function NewAddress({ isOpen, onClose, onSave }) {
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave(values); // Call the parent handler with form data
        });
    };

    return (
        <Modal
            title="Add New Address"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Close
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Address Name"
                    name="alias"
                    rules={[{ required: true, message: 'Please enter address name' }]}
                >
                    <Input placeholder="Enter Name" />
                </Form.Item>
                <Form.Item
                    label="Details"
                    name="detalis"
                    rules={[{ required: true, message: 'Please enter address details' }]}
                >
                    <Input placeholder="Enter Details" />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                    <Input placeholder="Enter Phone Number" />
                </Form.Item>
                <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please enter city' }]}
                >
                    <Input placeholder="Enter City" />
                </Form.Item>
                <Form.Item
                    label="Post Code"
                    name="postCode"
                    rules={[{ required: true, message: 'Please enter post code' }]}
                >
                    <Input placeholder="Enter Post Code" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

NewAddress.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired, // Add the required onSave prop
};
