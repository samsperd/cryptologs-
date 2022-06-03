import React from 'react'
import { Avatar, Card, Col, List, Skeleton, Typography } from 'antd';
import { useGetCryptoTrendsQuery } from '../../Services/cryptoTrendsApi';

const { Title } = Typography;

const Trending = () => {
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