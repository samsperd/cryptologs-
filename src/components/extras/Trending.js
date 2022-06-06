import React, { useEffect, useState } from 'react'
import { Avatar, Card, Col, List, Skeleton, Typography } from 'antd';
import { useGetCryptoTrendsQuery } from '../../Services/cryptoTrendsApi';
import fromExponential from 'from-exponential';
import { useDispatch } from 'react-redux';
import { getCryptoDetails } from '../../Services/cryptoApi';

const { Title } = Typography;



const Trending = () => {

    const dispatch = useDispatch();
      const { data, isFetching } = useGetCryptoTrendsQuery();
      const trendingList =  data?.coins ? (data?.coins).slice(0, 5) : [];
      const [btcPrice, setBtcPrice] = useState(1);


      useEffect(() => {
        
        dispatch(getCryptoDetails({ id: 'bitcoin' }))
          .unwrap()
          .then((response) => {
            setBtcPrice(response?.data?.market_data?.current_price?.usd)
          })
          .catch(console.log('error'))

      }, [btcPrice, dispatch]);
      


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
                description= {<> {'$' + 
                (fromExponential(fromExponential(item.item.price_btc) * btcPrice) 
                < 1 ? 
                (fromExponential(fromExponential(item.item.price_btc)) * btcPrice).toPrecision(3)
                :
                Number(fromExponential(fromExponential(item.item.price_btc) * btcPrice)).toFixed(2))
                }</>}
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