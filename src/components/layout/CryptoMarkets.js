import { Col, Row, Space, Table } from 'antd';
import commaNumber from 'comma-number';
import React from 'react';
import { Link } from 'react-router-dom';

  
  const columns = [
    // {
    //     title: '#',
    //     dataIndex: 'num',
    //     key: 'num',
    //     width: 15,
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 140,
    },
    {
      title: 'Pairs',
      dataIndex: 'pairs',
      key: 'pairs',
      width: 115,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
        title: 'Spread',
        dataIndex: 'spread',
        key: 'spread',
        width: 65,
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      width: 120,
    },
];

const CryptoMarkets = ({ markets }) => {

    let data = [];

    for (let i = 0; i < markets.length; i++) {
        data.push({
            key: i + 1,
            // num: i + 1,
            name: <Row gutter={[ 24, 0 ]}>
            <Col span={6}>
              { i + 1 }
            </Col> 
              <Col span={18}>
                <Link to={markets[i].trade_url}>{ markets[i].market.name} </Link> 
              </Col>
              </Row>,
            pairs: <Space> <Link to={markets[i].trade_url}> { markets[i].base + '/' + markets[i].target} </Link> </Space>,
            price: <Space> {'$' + commaNumber(markets[i]?.converted_last?.usd)} </Space>,
            spread: <Space> { (markets[i]?.bid_ask_spread_percentage).toFixed(2) + '%' } </Space>,
            volume: <Space> {'$' + commaNumber(markets[i]?.converted_volume?.usd)} </Space>,
        })            
    }
  
  return (
    <>
    <Table dataSource={data} columns={columns} scroll={{ y: 300 }} pagination={{ pageSize: 1000, hideOnSinglePage: true } } />
    </>
  )
}

export default CryptoMarkets

