import { ExclamationOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, List, Skeleton, Typography } from 'antd';
import React from 'react'
import { useGetCryptoTrendsQuery } from '../../Services/cryptoTrendsApi';
const btc = require('bitcoin-exchange-rate');

const { Title } = Typography;

const Trending = () => {
        const yesterday = [
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "Stripe",
          description: "26 March 2021, at 12:30 AM",
          amount: "+ $750",
          textclass: "text-fill",
          amountcolor: "text-success",
        },
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "HubSpot",
          description: "26 March 2021, at 11:30 AM",
          amount: "+ $1,050",
          textclass: "text-fill",
          amountcolor: "text-success",
        },
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "Creative Tim",
          description: "26 March 2021, at 07:30 AM",
          amount: "+ $2,400",
          textclass: "text-fill",
          amountcolor: "text-success",
        },
        {
          avatar: <ExclamationOutlined style={{ fontSize: 10 }} />,
          title: "Webflow",
          description: "26 March 2021, at 04:00 AM",
          amount: "Pending",
          textclass: "text-warning",
          amountcolor: "text-warning-b",
        },
      ];
      const currency = 'USD';
      const { data, isFetching } = useGetCryptoTrendsQuery();
      const trendingList = (data?.coins).slice(0, 5);

      console.log(data);

      let information;

      if (isFetching) {
        information = <Skeleton></Skeleton>
      } else {
        information = (
          <List
          className="yestday transactions-list"
          itemLayout="horizontal"
          dataSource={trendingList}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <List.Item.Meta
                avatar={
                  <Avatar size="small" className='textclass' src={item.item.small}>
                    
                  </Avatar>
                }
                title={item.item.name}
                description={item.item.symbol}
              />
              <div className="amount">
                {/* <span className='amountcolor}'>{currency, item.item.price_btc}</span> */}
              </div>
            </List.Item>
          )}
        />

        )
      }


 return (
    <>
        <Col span={24} md={8} className="mb-24 mt-2">
            {/* <Title level={4}>
                Top Gainers
            </Title> */}
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full bg-transparent ant-list-yes tipper"
            title={
              <Title level={4}>
                  Trending
              </Title>
            }
          >
          { information }
          </Card>
        </Col>
    </>
  )
}

export default Trending