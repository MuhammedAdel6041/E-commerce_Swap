import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button, Row, Col, Form } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Debit() {
    // Validation Schema
    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .matches(/^[0-9]{16}$/, "Card number must be exactly 16 digits")
            .required("Please enter your card number!"),
        expiryDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
            .required("Please enter expiry date!"),
        cvv: Yup.string()
            .matches(/^[0-9]{3}$/, "CVV must be exactly 3 digits")
            .required("Please enter your CVV!"),
        remember: Yup.bool(),
    });

    // Submit Handler
    const onSubmit = (values) => {
        console.log("Form Values: ", values);
    };

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            remember: false,
        },
        validationSchema,  // Using validation schema
        onSubmit,  // Using the onSubmit function
    });

    return (
        <>
            <Form onFinish={formik.handleSubmit} layout="vertical">
                <Row>
                    <Col span={24}>
                        {/* Card Number */}
                        <Form.Item
                            label="Card Number"
                            name="cardNumber"
                            validateStatus={formik.errors.cardNumber && formik.touched.cardNumber ? 'error' : ''}
                            help={formik.errors.cardNumber && formik.touched.cardNumber ? formik.errors.cardNumber : ''}
                        >
                            <Input
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="•••• •••• •••• ••••"
                                maxLength={16}
                                value={formik.values.cardNumber}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        {/* Expiry Date */}
                        <Form.Item
                            label="Expiry Date"
                            name="expiryDate"
                            validateStatus={formik.errors.expiryDate && formik.touched.expiryDate ? 'error' : ''}
                            help={formik.errors.expiryDate && formik.touched.expiryDate ? formik.errors.expiryDate : ''}
                        >
                            <Input
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="MM / YY"
                                maxLength={5}
                                value={formik.values.expiryDate}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        {/* CVV */}
                        <Form.Item
                            label="CVV"
                            name="cvv"
                            validateStatus={formik.errors.cvv && formik.touched.cvv ? 'error' : ''}
                            help={formik.errors.cvv && formik.touched.cvv ? formik.errors.cvv : ''}
                        >
                            <Input
                                id="cvv"
                                name="cvv"
                                placeholder="Enter Code"
                                suffix={<ExclamationCircleOutlined />}
                                maxLength={3}
                                value={formik.values.cvv}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>
                    </Col>

                    {/* Remember Card */}
                    <Col span={24}>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox
                                name="remember"
                                checked={formik.values.remember}
                                onChange={formik.handleChange}
                            >
                                Remember this card for future payments
                            </Checkbox>
                        </Form.Item>
                    </Col>

                    {/* Submit Button */}
                    <Col span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                disabled={!formik.isValid || formik.isSubmitting}  // Button is disabled initially
                                className="bg-main"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </>

    );
}
