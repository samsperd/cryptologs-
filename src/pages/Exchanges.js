import { Col, Collapse, Row, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExchanges } from '../Services/cryptoApi';
import Loader from './Loader';
import ConnectionProblem from '../components/extras/ConnectionProblem';


const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {

  const dispatch = useDispatch();
  const { exchanges, loading, connection } = useSelector((state) => state.exchanges);

  useEffect(() => {
    dispatch(getExchanges());
  
  }, [dispatch])

  
  let information;

  if (loading) {
    if (connection) {
      information = <Loader />
    } else {
      information = <ConnectionProblem></ConnectionProblem>
    }
  } else {
    information = (
      <>
      <Row>
        <Col style={{ padding: '6px 16px' }} span={2}>#</Col>
        <Col style={{ padding: '6px 16px' }} span={6}>Exchanges</Col>
        <Col style={{ padding: '6px 9px' }} span={6}>Trust Score </Col>
        <Col style={{ padding: '6px 16px' }} span={5}>24h Trade Volume</Col>
        <Col style={{ padding: '6px 16px' }} span={3}>Year Origin</Col>
      </Row>
      { exchanges.map((exchange) => (
              <Row key={exchange.id}>
                <Collapse bordered={false} style={{ width: '100%' }}>
                  <Panel
                    key={exchange.id}
                    showArrow={false}
                    header={(
                      <Row key={exchange.id}>
                        <Col span={2}>
                          <Text> <strong> {exchange.trust_score_rank}. </strong> </Text>
                        </Col>
                        <Col span={6}>
                          <Avatar className='exchange-image' src={exchange.image} />
                          <Text> <strong> {exchange.name} </strong> </Text>
                        </Col>
                        <Col span={7}> { exchange.trust_score } </Col>
                        <Col span={5}> ${millify(exchange.trade_volume_24h_btc)} </Col>
                        <Col span={3}> { exchange.year_established } </Col>
                      </Row>
                    )}
                  >
                    { exchange.description && HTMLReactParser(exchange.description) }
                  </Panel>
                </Collapse>
              </Row>
            ))}
      
      </>
)
  }
  
  
  return (
    <>
      { information }
    </>
  )
}

export default Exchanges