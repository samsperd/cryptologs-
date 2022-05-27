import React, { useEffect, useState } from 'react'
import { RightCircleFilled } from '@ant-design/icons';
import { Avatar, Card, Image, Skeleton, Typography, Button, Col, Row, Select, Pagination } from 'antd';
import { useGetCryptoNewsQuery } from '../Services/cryptoNewsApi';
import NewsContainer from '../components/layout/NewsContainer';
import NewsBox from '../components/layout/NewsBox';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptos } from '../Services/cryptoApi';
import Loader from './Loader';


const { Meta } = Card;
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";



const News = ({ simplified }) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const dispatch = useDispatch();
    const { cryptos } = useSelector((state) => state.cryptos);
  
    useEffect(() => {
        dispatch(getCryptos({ limit: 50 }));
    }, []);

    const { data: cryptoNewsList, isFetching} = useGetCryptoNewsQuery({newsCategory: newsCategory, count: simplified ? 4 : 50});
    const cryptoNews = cryptoNewsList?.value;
    const pageSize = 10;
    const [page, setPage] = useState({ minValue: 0, maxValue: pageSize, current: 1});

    const handleChange = value => {
            setPage({
                current: value,
                minValue: (value - 1) * pageSize,
                maxValue: value * pageSize
            })
        window.scrollTo(0,0);
    }

    let information;

    if (isFetching) {
        return <Loader />;
    }
    else if (cryptoNews)  {
        information = (
            <>
          {!simplified && (
              <Col span={24}>
              <Row justify='space-between'>
              <Col span={12} className=' aligin-center'>
              <Title className='ant-page-header bg-transparent' level={4}>Top News</Title>
              </Col>
              <Col span={12} className='d-flex justify-content-flex-end text-right'>
              {
                cryptos.length > 0 && (
                    <Select
                        showSearch
                        className='row-col'
                        placeholder="Search news by crypto"
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={ (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                    >
                        <Option value='Cryptocurrency'>
                            Cryptocurrency
                        </Option>
                        {
                            cryptos.map((coin, i) => (
                            <Option key={i} value={coin.name}>
                                { coin.name }
                            </Option>
                            ))
                        }
                    </Select>
                  )
              }
              </Col>
              </Row>
              </Col>
            )
          }
            { cryptoNews.slice(page.minValue, page.maxValue).map((news, i) => (
                <NewsBox key={i} simplified={simplified}>
                    {
                        !simplified ? (
                            <Card
                                style={simplified ? { width: 250 } : { width: '100%' }}
                                bordered={false}
                                className="criclebox news"
                                hoverable
                            >
                                <a href={news.url} target="_blank" rel="noopener noreferrer">
                                    <Row gutter={24}>
                                        <Col flex={16} xs={16}>
                                            <Meta
                                                avatar={<Avatar size={'small'} src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage } />}
                                                className="text-justify"
                                                title={[
                                                    <small>
                                                        { news.provider[0]?.name }
                                                    </small>
                                                ]}
                                            />
                                            <br />
                                                <Title level={5} className='news-link'>{ news.name }</Title>
                                            <p className='text-dark'>
                                                { news.description.length > 120 ? `${news.description.substring(0, 120)}...` : news.description }
                                            </p>
                                            <Text className='text-muted'>{ moment(news.datePublished).startOf('ss').fromNow() }</Text>
                                        </Col>
                                        <Col flex={8} xs={8}>
                                            <Image
                                                src={news?.image?.thumbnail?.contentUrl || demoImage }
                                            />
                                        </Col>
                                    </Row>
                                </a>
                            </Card>)
                            :
                        (<Card
                            style={simplified ? { width: 250 } : { width: '100%' }}
                            bordered={false}
                            className="criclebox news"
                            cover={
                                <Image
                                    src={news?.image?.thumbnail?.contentUrl || demoImage }
                                    height={150}
                                />
                            }
                        >
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                            <Meta
                                avatar={<Avatar size={'small'} src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage } />}
                                className="text-justify"
                                title={[
                                    <small>
                                        { news.provider[0]?.name }
                                    </small>
                                ]}
                            />
                            <br />
                            <Title level={5} className='news-link'>{ news.name }</Title>
                            <Text className='text-muted'>{ moment(news.datePublished).startOf('ss').fromNow() }</Text>
                            </a>
                        </Card>)
                    }
                </NewsBox>
            ))}
            { simplified && (
                <Card
                    style={{ width: 250 }}
                    bordered={false}
                    className="criclebox news bg-transparent"
                    bodyStyle={{ height: '100%' }}
                >
                    <Button className='d-flex bg-transparent justify-content-center aligin-center' block type='link' href='/news' style={{ height: '100%' }}>

                        <RightCircleFilled style={{ color: 'gray', fontSize: '50px' }} key="arrowright" />,
                    </Button>
                </Card>
            )}
            </>
        )
    } else {
        return <Skeleton className='loading' />;
    }


  return (
    <>  
        <NewsContainer simplified={simplified}>
            { information }
        </NewsContainer>
        {
            !simplified && <Col flex="1 1" className='text-right'><Pagination size='small' defaultCurrent={1} defaultPageSize={pageSize} onChange={handleChange} total={cryptoNews.length}></Pagination></Col>
        }
        
    </>
  )
}

export default News