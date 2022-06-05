import React, { useEffect } from 'react';
import { Avatar, Button, Card, Col, Row, Space, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCryptos } from '../Services/cryptoApi';
import Loader from './Loader';
import Statistics from '../components/layout/Statistics';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import ConnectionProblem from '../components/extras/ConnectionProblem';


const commaNumber = require('comma-number');
const { Title } = Typography;

const columns = [
  {
    title: 'Name',
    className: 'bg-white text-wrap px-5',
    key: 'name',
    width: 80,
    dataIndex: 'name',
    fixed: 'left',
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
  const { cryptos, loading, connection } = useSelector((state) => state.cryptos);
  const maxCurrency = simplified ? 10 : 250;

  useEffect(() => {
    // setInterval(() => {
      dispatch(getCryptos({ limit: maxCurrency }));

      
    // }, 10000);
  }, [maxCurrency, dispatch]);

  const handleChange = () => {
    window.scrollTo(0,2);
  }


  const data = [];
  let information;

  if (Object.keys(cryptos).length === 0) {
    if (connection) {
      information = <Loader />
    } else {
      information = <ConnectionProblem></ConnectionProblem>
    }
  } else {
    for (let i = 0; i < maxCurrency; i++) {
       data.push({
        key: i + 1,
        num: cryptos[i]?.market_data?.market_cap_rank,
        name: <Link to={`/crypto/${cryptos[i]?.id}`}>
        <Row gutter={[ 24, 0 ]}>
          <Col span={5}>
          <Avatar size={'small'} src={cryptos[i]?.image?.small}></Avatar>
          </Col>
          <Col span={19}>
            <h5>{ cryptos[i]?.name } <br /> <span className='btn-sm btn-gray' >{ cryptos[i]?.market_data?.market_cap_rank }</span> <span className='text-gray text-uppercase'>{ cryptos[i]?.symbol }</span> </h5>
          </Col>
        </Row>
        </Link>,
        price:  <Link to={`/crypto/${cryptos[i]?.id}`}><h6>${commaNumber(cryptos[i]?.market_data?.current_price?.usd)}</h6></Link>,
        twofourhour: <Link to={`/crypto/${cryptos[i]?.id}`}><h6 className={
                          cryptos[i]?.market_data?.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'
                          }>
                          { cryptos[i]?.market_data?.price_change_percentage_24h.toFixed(2) > 0 ? (<CaretUpOutlined></CaretUpOutlined> ) : (<CaretDownOutlined></CaretDownOutlined> )
                          }
                            
                            { Math.abs(cryptos[i]?.market_data?.price_change_percentage_24h.toFixed(2)) }%
                          </h6></Link>,
        sevendays: <Link to={`/crypto/${cryptos[i]?.id}`}><h6 className={
                      cryptos[i]?.market_data?.price_change_percentage_7d > 0 ? 'text-success' : 'text-danger'
                      }
                    >
                          { cryptos[i]?.market_data?.price_change_percentage_7d.toFixed(2) > 0 ? (<CaretUpOutlined></CaretUpOutlined> ) : (<CaretDownOutlined></CaretDownOutlined> )
                          }
                          { Math.abs(cryptos[i]?.market_data?.price_change_percentage_7d.toFixed(2)) }%
                    </h6></Link>,
        mcap: <Link to={`/crypto/${cryptos[i]?.id}`}><h6>${ commaNumber(cryptos[i]?.market_data?.market_cap?.usd) }</h6></Link>,
        volume24h: <Link to={`/crypto/${cryptos[i]?.id}`}><h6>${ commaNumber(cryptos[i]?.market_data?.total_volume?.usd) }</h6></Link>,
        circulatingsupply:  <Link to={`/crypto/${cryptos[i]?.id}`}><h6>{ commaNumber(parseInt(cryptos[i]?.market_data?.circulating_supply).toFixed()) } <span className='text-uppercase'>{ commaNumber(cryptos[i]?.symbol) }</span> </h6></Link>
      });
    }
    information = (
      <>
        <Table loading={loading} columns={columns} pagination={{ pageSize: 50, hideOnSinglePage: true, total: maxCurrency, onChange: handleChange}} dataSource={data} scroll={{ x: 1500 }} />
        { simplified && (
          <Col flex={'1 1'} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <Button href='/cryptocurrencies' className="btn-gray" style={{ float: 'right' }}>
              {/* <Link to=""> */}
                <Title level={5} style={{ lineHeight: '35px', marginBottom: '0' }} className="font-normal">
                  Show More
                </Title>
              {/* </Link> */}
            </Button>
          </Col>
         
       ) }
      </>
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
            {/* <Title level={5} className="font-normal">
            <Link to="/cryptocurrencies">
              Show More
            </Link>
            </Title> */}
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