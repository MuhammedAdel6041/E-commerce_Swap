import {
 
    Col,
    Row,
    Breadcrumb,
   
} from 'antd';

import Address from '../components/Address/Address';

export default function CheckOut() {
 

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'News', href: '/news' }
    ];

    return (
        <>
            <Row className="p-4">

                {/* Breadcrumb Section */}
                <Col span={24}>
                    <Breadcrumb className="m-3 p-3" items={breadcrumbItems} />
                </Col>

                {/* Main Content: Cart Items + Order Summary */}
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        {/* Cart Items Section */}
                        <Col xs={24} md={24} className="p-4">
                            <Address />
                        </Col>

                        {/* Order Summary Section */}
                   
                    </Row>
                </Col>
            </Row>
        </>
    );
}



