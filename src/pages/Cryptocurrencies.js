import React, { useEffect } from 'react';
import { Avatar, Card, Col, Space, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCryptos } from '../Services/cryptoApi';
// import millify from 'millify';
import Loader from './Loader';
import Statistics from '../components/layout/Statistics';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const commaNumber = require('comma-number');
const { Title } = Typography;

const columns = [
  // {
  //   title: '#',
  //   width: 20,
  //   dataIndex: 'num',
  //   key: 'num',
  //   fixed: 'left',
  // },
  {
    title: 'Name',
    className: 'bg-white',
    children: [
      {
        dataIndex: 'icon',
        key: 'icon',
        fixed: 'left',
        width: 40
      },
      {
        width: 50,
        dataIndex: 'name',
        fixed: 'left',
        key: 'name',
        className: 'text-wrap px-5'
      }
    ]
  },
  {
    title: 'Price',
    width: 45,
    dataIndex: 'price',
    key: 'price',
    className: 'px-5'
  },
  {
    title: '24h %',
    dataIndex: 'twofourhour',
    key: 'twofourhour',
    width: 50,
  },
  {
    title: '7d %',
    dataIndex: 'sevendays',
    key: 'sevendays',
    width: 50,
  },
  {
    title: 'Market Cap',
    dataIndex: 'mcap',
    key: 'mcap',
    width: 75,
  },
  {
    title: '24h Volume',
    dataIndex: 'volume24h',
    key: 'volume24h',
    width: 75,
  },
  {
    title: 'Circulating Supply',
    dataIndex: 'circulatingsupply',
    key: 'circulatingsupply',
    width: 75,
  },
  {
    title: 'Last 7 Days',
    dataIndex: 'last7days',
    key: 'last7days',
    width: 150,
  },
];

const Cryptocurrencies = ({ simplified }) => {
  
  const dispatch = useDispatch();
  const { cryptos, loading } = useSelector((state) => state.cryptos);
  const maxCurrency = simplified ? 10 : 250;

  useEffect(() => {
    // setInterval(() => {
      dispatch(getCryptos({ limit: maxCurrency }));

      
    // }, 10000);
  }, []);

  console.log(cryptos);


  const data = [];
  let information;
  if (Object.keys(cryptos).length === 0) {
    information = <Loader />
  } else {
    for (let i = 0; i < maxCurrency; i++) {
      // console.log(cryptos[i]);
       data.push({
        key: i + 1,
        num: cryptos[i]?.market_data?.market_cap_rank,
        icon: <Avatar size={'small'} src={cryptos[i]?.image?.small}></Avatar>,
        name: <Link to={`/crypto/${cryptos[i]?.id}`}><h5>{ cryptos[i]?.name } <br /> <span className='btn-sm btn-gray' >{ cryptos[i]?.market_data?.market_cap_rank }</span> <span className='text-gray text-uppercase'>{ cryptos[i]?.symbol }</span> </h5></Link>,
        price:  <Link to='/'><h6>${commaNumber(cryptos[i]?.market_data?.current_price?.usd)}</h6></Link>,
        twofourhour: <Link to='/'><h6 className={
                          cryptos[i]?.market_data?.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'
                          }>
                          { cryptos[i]?.market_data?.price_change_percentage_24h.toFixed(2) > 0 ? (<CaretUpOutlined></CaretUpOutlined> ) : (<CaretDownOutlined></CaretDownOutlined> )
                          }
                            
                            { Math.abs(cryptos[i]?.market_data?.price_change_percentage_24h.toFixed(2)) }%
                          </h6></Link>,
        sevendays: <Link to='/'><h6 className={
                      cryptos[i]?.market_data?.price_change_percentage_7d > 0 ? 'text-success' : 'text-danger'
                      }
                    >
                          { cryptos[i]?.market_data?.price_change_percentage_7d.toFixed(2) > 0 ? (<CaretUpOutlined></CaretUpOutlined> ) : (<CaretDownOutlined></CaretDownOutlined> )
                          }
                          { Math.abs(cryptos[i]?.market_data?.price_change_percentage_7d.toFixed(2)) }%
                    </h6></Link>,
        mcap: <Link to='/'><h6>${ commaNumber(cryptos[i]?.market_data?.market_cap?.usd) }</h6></Link>,
        volume24h: <Link to='/'><h6>${ commaNumber(cryptos[i]?.market_data?.total_volume?.usd) }</h6></Link>,
        circulatingsupply:  <Link to='/'><h6>{ commaNumber(parseInt(cryptos[i]?.market_data?.circulating_supply).toFixed()) } <span className='text-uppercase'>{ commaNumber(cryptos[i]?.symbol) }</span> </h6></Link>
      });
    }
    information = (
      <Table loading={loading} columns={columns} pagination={{ pageSize: 50, hideOnSinglePage: true, total: maxCurrency}} dataSource={data} scroll={{ x: 1500 }} />
    )
  }
  return (
    <>
      <Col flex="1 1">
      { !simplified && (
        <Statistics></Statistics>
      ) }
      <Card className='tipper borderless'
        title={
          simplified ? (
            <Space>
            <Title level={4}>
                Top 10 Cryptocurrencies in the world
            </Title>
            <Title level={5} className="font-normal">
            <Link to="/cryptocurrencies">
              Show More
            </Link>
            </Title>
          </Space>
          )
          :
          (
            <>
            <div className='text-center'>
              <Title level={4}>
                  Cryptocurrencies prices live
              </Title>
              <Title level={5}>
                  Top Cryptocurrencies by market cap
              </Title>
            </div>
            </>
          )
        }
      >
       { information }
      </Card>
      </Col>

    </>
  )
}

export default Cryptocurrencies