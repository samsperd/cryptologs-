import React from "react";
import {
  Row,
  Typography,
  PageHeader,
} from "antd";
import News from "./News";
// import { Link } from "react-router-dom";
import { TopGainers, TopLosers } from "../components";
import Cryptocurrencies from "./Cryptocurrencies";

const { Title, Text } = Typography;

function Home() {

  return (
    <>
      <PageHeader
        title={<Title level={3} className='white-space-break-spaces'>Today’s Cryptocurrencies by Market Cap</Title>}
        footer={ <Text>The global crypto market cap is $1.30T, a 9.51% increase over the last day.</Text> }
      >
      </PageHeader>
      <PageHeader
        title="Latest Crypto News"
        // tags={
        //     <Link to="/">
        //       Show More
        //     </Link>
        // }
      >
      </PageHeader>
      <News simplified ></News>
      <Row className="mb-24" justify="space-around" gutter={[16, 0]}>
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
