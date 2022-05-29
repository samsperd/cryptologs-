import { DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MinusOutlined, NumberOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCryptoDetails } from '../Services/cryptoApi';
import Loader from './Loader';
import LineChart from '../components/chart/LineChart';
import commaNumber from 'comma-number';
import CryptoOtherStats from '../components/layout/CryptoOtherStats';
import CryptoStats from '../components/layout/CryptoStats';
import CryptoLinks from '../components/layout/CryptoLinks';

const { Title, Text, Paragraph } = Typography;

const CryptoDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getCryptoDetails({ id }))
  
  }, []);



  let information;

  if (loading) {
    information = <Loader />
  } else {

    const stats = [
      { title: 'Price to USD', value: `$ ${details?.market_data?.current_price?.usd && commaNumber(details?.market_data?.current_price?.usd)}`, icon: <DollarCircleOutlined /> },
      { title: 'Fully Diluted Market Cap', value: `$ ${details?.market_data?.fully_diluted_valuation?.usd && commaNumber(details?.market_data?.fully_diluted_valuation?.usd)}`, icon: <DollarCircleOutlined /> },
      { title: 'Market Cap', value: `$ ${details?.market_data?.market_cap?.usd && commaNumber(details?.market_data?.market_cap?.usd)}`, icon: <DollarCircleOutlined /> },
      { title: '24h Volume', value: `$ ${details?.market_data?.total_volume?.usd && commaNumber(details?.market_data?.total_volume?.usd)}`, icon: <ThunderboltOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(details?.market_data?.high_24h?.usd)}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Circulating Supply', value: `$ ${millify(details?.market_data?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: details?.market_data?.total_supply && `$ ${millify(details?.market_data?.total_supply)}`, icon: <NumberOutlined /> },
      { title: 'Genesis Date', value: details.genesis_date, icon: <FundOutlined /> },
      { title: 'CoinGecko Score', value: details.coingecko_score, icon: <FundOutlined /> },
    ];


    information = (
      <>
        <Row gutter={[24, 24]}>
          <Col lg={16} xl={16} md={24} sm={24} className='w-100'>
          <Button type='primary' size='small'>
              <h6 style={{ color: 'white' }}>Rank #{ details.market_cap_rank }</h6>
            </Button>
            <Title level={3} className='coin-details-heading'>
              { details.name } Chart
            </Title>
            <p>
            { details.name } live price in US dollars. View value statistics, market cap and supply.
          </p>
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <div className="linechart">
              <div>
                  <Title level={5}>Active Users</Title>
                  <Paragraph className="lastweek">
                    than last week <span className="bnb2">+30%</span>
                  </Paragraph>
                </div>
                <div className="sales">
                  <ul>
                    <li>{<MinusOutlined />} Traffic</li>
                    <li>{<MinusOutlined />} Sales</li>
                  </ul>
                </div>
              </div>

              <LineChart id={id} name={details.name}></LineChart>
            </Card>
          </Col>
          <Col lg={8} xl={8} md={24} sm={24} className='w-100'>
            <Title level={3} className='coin-details-heading'>
              { details.symbol.toUpperCase() } Price Statistics
            </Title>
            <Card bordered={false}>
              <CryptoStats stats={stats}></CryptoStats>
            </Card>
          </Col>
        </Row>


        <Row gutter={[24, 24]}>
          <Col lg={12} xl={12} md={24} sm={24} className='w-100'>
            <Title level={3} className='coin-details-heading'>
              What is { details.name }
            </Title>
            { HTMLReactParser(details?.description?.en) }
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} className='w-100'>
            <Title level={3} className='coin-details-heading'>
              Other { details.name } Statistics
            </Title>
            <Card bordered={false}>
              <CryptoOtherStats genericStats={genericStats}></CryptoOtherStats>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[24, 24]}>
          <Col lg={12} xl={12} md={24} sm={24} className='w-100'>
                <Title level={3} className='coin-details-heading'>
                  What is { details.name }
                </Title>
                { HTMLReactParser(details?.description?.en) }
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} className='container w-100'>
            <Title level={3} className='coin-details-heading'>
              { details.name } Links
            </Title>
            <Card bordered={false}>
              <CryptoLinks links={details.links}></CryptoLinks>
            </Card>

          </Col>
        </Row>
    </>

    )
  }
  
  return (

    information
  )
}

export default CryptoDetails;