import React from 'react'
import { Avatar, Card, Col, List, Skeleton, Typography } from 'antd';
import { useGetCryptoTrendsQuery } from '../../Services/cryptoTrendsApi';
import fromExponential from 'from-exponential';

const { Title } = Typography;

const Trending = () => {
      const { data, isFetching } = useGetCryptoTrendsQuery();
      const trendingList =  data?.coins ? (data?.coins).slice(0, 5) : [];


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
                title={<>{item.item.name} <span style={{ color: 'gray' }} >({item.item.symbol})</span> </>}
                description= {<> {fromExponential(item.item.price_btc)}</>}
              />
              <div className="amount">
                {/* <span className='amountcolor}'>{ item.item.price_btc }</span> */}
              </div>
            </List.Item>
          )}
        />

        )
      }


 return (
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
                  Trending <small className='text-gray' >(24H)</small>
              </Title>
            }
          >
          { information }
          </Card>
        </Col>
  )
}

export default Trending