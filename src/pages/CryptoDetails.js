import { DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, NumberOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
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

const { Title, Text } = Typography;


function filterArray(item) {
  let links = [];

  if (item) {
    if (item.length > 0) {
      for (let index = 0; index < item.length; index++) {
        if (item[index] !== "") {
          links.push(item[index]);
        }
      }
      return links;
    }
  }
}

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
          <Col lg={16} xl={16} md={24} sm={24}>
            <Title level={3} className='coin-details-heading'>
              { details.name } Chart
            </Title>
            <Button type='primary'>
              <h6 style={{ color: 'white' }}>Rank #{ details.market_cap_rank }</h6>
            </Button>
            <Card bordered={false}>
              <LineChart id={id} name={details.name}></LineChart>
            </Card>
          </Col>
          <Col lg={8} xl={8} md={24} sm={24}>
            <Title level={3} className='coin-details-heading'>
              { details.symbol.toUpperCase() } Price Statistics
            </Title>
            <Card bordered={false}>
            {
              stats.map(({ icon, title, value }, i) => (
              <>
                <Row className='coin-link' key={i}>
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
              </>
              ))
            }
            </Card>
          </Col>
        </Row>


        <Row gutter={[24, 24]}>
          <Col lg={12} xl={12} md={24} sm={24}>
            <Title level={3} className='coin-details-heading'>
              What is { details.name }
            </Title>
            { HTMLReactParser(details?.description?.en) }
          </Col>
          <Col lg={12} xl={12} md={24} sm={24}>
            <Title level={3} className='coin-details-heading'>
              Other { details.name } Statistics
            </Title>
            <Card bordered={false}>
            {
              genericStats.map(({ icon, title, value }, i) => (
              <>
                <Row className='coin-link' key={i}>
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
              </>
              ))
            }
            </Card>
          </Col>
        </Row>
        
        <Row gutter={[24, 24]}>
          <Col lg={12} xl={12} md={24} sm={24}>
                <Title level={3} className='coin-details-heading'>
                  What is { details.name }
                </Title>
                { HTMLReactParser(details?.description?.en) }
          </Col>
          <Col lg={12} xl={12} md={24} sm={24} className='container'>
            <Title level={3} className='coin-details-heading'>
              { details.name } Links
            </Title>
            <Card bordered={false}>
              {
                details.links.homepage &&
                  details.links.homepage.length > 0 &&
                    filterArray(details.links.homepage).length > 0 && 
                      <>
                        <Row className='coin-link'>
                              <Col span={12}>
                                <Title level={5} className='link-name'>
                                  Website:
                                </Title>
                              </Col>
                          {
                            filterArray(details?.links?.homepage).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                <a
                                  href={link}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {link}
                                </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                details.links.announcement_url &&
                  details.links.announcement_url.length > 0 && 
                    filterArray(details?.links?.announcement_url).length > 0 && 
                      <>
                        <Row className='coin-link'>
                              <Col span={12}>
                                <Title level={5} className='link-name'>
                                  Announcement URL:
                                </Title>
                              </Col>
                          {
                            filterArray(details?.links?.announcement_url).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                  <a
                                    href={link}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-ellipsis'
                                  >
                                    {link}
                                  </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                details.links.blockchain_site &&
                  details.links.blockchain_site.length > 0 &&
                    filterArray(details.links.blockchain_site).length > 0 && 
                      <>
                        <Row className='coin-link'>
                            <Col span={12}>
                              <Title level={5} className='link-name'>
                                Blockchain Site:
                              </Title>
                            </Col>
                          {
                            filterArray(details?.links?.blockchain_site).map((link, i) => (
                              <Col span={12} key={i}>
                              <Button type='link' className='width-100 text-justify'>
                                <a
                                    href={link}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-ellipsis'
                                  >
                                    {link}
                                </a>
                              </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                details.links.official_forum_url &&
                  details.links.official_forum_url.length > 0 && 
                    filterArray(details.links.official_forum_url).length > 0 && 
                      <>
                        <Row className='coin-link'>
                            <Col span={12}>
                              <Title level={5} className='link-name'>
                                Forum URL:
                              </Title>
                            </Col>
                          {
                            filterArray(details?.links?.official_forum_url).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                <a
                                  href={link}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='text-ellipsis'
                                >
                                  {link}
                                </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                details.links.bitcointalk_thread_identifier &&
                  details.links.bitcointalk_thread_identifier.length > 0 && 
                    filterArray(details.links.bitcointalk_thread_identifier).length > 0 && 
                      <>
                        <Row className='coin-link'>
                          <Col span={12}>
                            <Title level={5} className='link-name'>
                              Bitcointalk:
                            </Title>
                          </Col>
                          {
                            filterArray(details?.links?.bitcointalk_thread_identifier).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                <a
                                  href={link}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {link}
                                </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                details.links.facebook_username &&
                  <>
                    <Row className='coin-link'>
                      <Col span={12}>
                        <Title level={5} className='link-name'>
                          Facebook:
                        </Title>
                      </Col>
                      <Col span={12}>
                        <Button type='link' className='width-100'>
                          <a
                            href={'https://facebook.com/'+details.links.facebook_username}
                            target='_blank'
                            rel='noreferrer'
                            className='text-ellipsis'
                          >
                            {details.links.facebook_username}
                          </a>
                        </Button>
                      </Col>
                    </Row>
                    <Divider></Divider>
                  </>
              }
              {
                details.links.repos_url?.github &&
                  details.links.repos_url?.github.length > 0 &&
                    filterArray(details?.links?.repos_url?.github).length > 0 && 
                      <>
                        <Row className='coin-link'>
                              <Col span={12}>
                                <Title level={5} className='link-name'>
                                  Github:
                                </Title>
                              </Col>
                          {
                            filterArray(details?.links?.repos_url?.github).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100 text-justify'>
                                  <a
                                    href={link}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-ellipsis'
                                  >
                                    {link}
                                  </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                details.links.subreddit_url &&
                  <>
                    <Row className='coin-link'>
                      <Col span={12}>
                        <Title level={5} className='link-name'>
                          Reddit
                        </Title>
                      </Col>
                      <Col span={12}>
                        <Button type='link' className='width-100'>
                          <a
                            href={details.links.subreddit_url}
                            target='_blank'
                            rel='noreferrer'
                            className='text-ellipsis'
                          >
                            {details.links.subreddit_url}
                          </a>
                        </Button>
                      </Col>
                    </Row>
                    <Divider></Divider>
                  </>
              }
              {
                details.links.twitter_screen_name &&
                  <>
                    <Row className='coin-link'>
                      <Col span={12}>
                        <Title level={5} className='link-name'>
                          Twitter
                        </Title>
                      </Col>
                      <Col span={12}>
                        <Button type='link' className='width-100'>
                          <a
                            href={details.links.twitter_screen_name}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {details.links.twitter_screen_name}
                          </a>
                        </Button>
                      </Col>
                    </Row>
                    <Divider></Divider>
                  </>
              }
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