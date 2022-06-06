import React, { useEffect } from 'react';
import { Avatar, Card, Col, List, Skeleton, Typography } from 'antd';
import commaNumber from 'comma-number';
import fromExponential from 'from-exponential';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptosStatsLoser } from '../../Services/cryptoApi';

const { Title } = Typography;

const TopLosers = () => {

  const dispatch = useDispatch();
  const { cryptosStatsLoser, loading } = useSelector((state) => state.cryptosStatsLoser);

  useEffect(() => {
      dispatch(getCryptosStatsLoser({ limit: 5 }));
  }, [ dispatch]);


  let information;

  if (loading) {
    information = <Skeleton></Skeleton>
  } else {
    information = (
      <List
      className="yestday transactions-list"
      itemLayout="horizontal"
      dataSource={cryptosStatsLoser}
      renderItem={(item, i) => (
        <List.Item key={i}>
          <List.Item.Meta
            avatar={
              <Avatar size="small" className='textclass' src={item?.image?.small}>
                
              </Avatar>
            }
            title={<>{item.name} <span style={{ color: 'gray', textTransform: 'uppercase' }} >({item.symbol})</span> </>}
            description= {<> { item?.market_data?.current_price?.usd < 1 ? '$' + (fromExponential(item?.market_data?.current_price?.usd)) : '$' + commaNumber((item?.market_data?.current_price?.usd).toFixed())}</>}
          />
          <div className="amount">
            <span className='amountcolor text-danger'>{ (item?.market_data?.price_change_percentage_24h).toFixed(2) + '%' }</span>
          </div>
        </List.Item>
      )}
    />

    )

  }  
  return (
    <>
        <Col span={24} md={8} className="mb-24 mt-2">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full bg-transparent ant-list-yes tipper"
            title={
              <Title level={4}>
                  Top Losers <small className='text-gray' >(24H)</small>
              </Title>
            }
          >
            { information }

          </Card>
        </Col>
    </>
  )
}

export default TopLosers