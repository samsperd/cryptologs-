import React, { useEffect } from "react";
import {
  Row,
  Typography,
  PageHeader,
  Skeleton,
} from "antd";
import News from "./News";
import { TopGainers, TopLosers } from "../components";
import Cryptocurrencies from "./Cryptocurrencies";
import Trending from "../components/extras/Trending";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../Services/cryptoApi";
import millify from "millify";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;


function Home() {
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
      <PageHeader
        title={<Title level={3} className='white-space-break-spaces'>Today’s Cryptocurrencies by Market Cap</Title>}
        footer={ <Text>The global crypto market cap is <b className="text-muted">{'$' + millify(statistics.total_market_cap?.usd) }</b>  { statistics.market_cap_change_percentage_24h_usd > 0 ? (<CaretUpOutlined className="text-success"></CaretUpOutlined> ) : (<CaretDownOutlined className="text-danger"></CaretDownOutlined> ) } ~ a <b className={ statistics.market_cap_change_percentage_24h_usd > 0 ? ('text-success') : ('text-danger') } >{ Math.abs(statistics.market_cap_change_percentage_24h_usd).toFixed(2) + '%' } </b> { statistics.market_cap_change_percentage_24h_usd > 0 ? ('Increase') : ('Decrease') } over the last day.</Text> }
      >
      </PageHeader>
    )
  }


  return (
    <>
      { information }
      <PageHeader
        title="Latest Crypto News"
      >
      </PageHeader>
      <News simplified ></News>
      <Row className="mb-24" justify="space-around" gutter={[16, 0]}>
        <Trending></Trending>
        <TopGainers></TopGainers>
        <TopLosers></TopLosers>
      </Row>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Cryptocurrencies simplified></Cryptocurrencies>
        </Row>
    </>
  );
}

export default Home;
