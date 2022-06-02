import React, { useEffect } from 'react';
import { Col, Row, Skeleton, Statistic } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getStatistics } from '../../Services/cryptoApi';
import millify from 'millify';

const Statistics = () => {
    const dispatch = useDispatch();
    const { statistics } = useSelector((state) => state.statistics);
  
  
    useEffect(() => {
      dispatch(getStatistics())
      
    }, [dispatch]);
    let information;

    if (Object.keys(statistics).length === 0) {
        information = <Skeleton></Skeleton>;
    } else {
        information = (
            <>
                <Row  className='text-center bg-light'>
                    <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={statistics.active_cryptocurrencies} ></Statistic>
                    </Col>
                    <Col span={12}>
                    <Statistic title="Total Market Cap" value={millify(statistics.total_market_cap?.usd)} ></Statistic>
                    </Col>
                    <Col span={12}>
                    <Statistic title="Total 24h Volume" value={millify(statistics.total_volume?.usd)} ></Statistic>
                    </Col>
                    <Col span={12}>
                    <Statistic title="Total Markets" value={statistics.markets} ></Statistic>
                    </Col>
                </Row>
            </>
        )
    }
      
  return (
    <>
        { information }
    </>
  )
}

export default Statistics