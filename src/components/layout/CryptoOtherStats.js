import React from 'react';
import { Col, Divider, Row, Typography } from 'antd';


const { Title, Text } = Typography;

const CryptoOtherStats = ({ genericStats }) => {
  return (
    genericStats.map(({ icon, title, value }, i) => (
        <div  key={i}>
          <Row className='coin-link'>
            <Col span={12}>
              <Title level={5} className='link-name'>
              <Text> { icon } </Text>
                { title }
              </Title>
            </Col>
            <Col span={12}>
              <Text>
                { value }
              </Text>
            </Col>
          </Row>
          <Divider></Divider>
        </div>
        ))

  )
}

export default CryptoOtherStats;