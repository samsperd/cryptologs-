import  React, { useEffect } from "react";
import {
  Typography,
  PageHeader,
  Button,
  Skeleton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../../Services/cryptoApi";
const commaNumber = require('comma-number');

const { Text } = Typography;
const { Input: SkeletonB } = Skeleton;

function TopNav() {

  const dispatch = useDispatch();
  const { statistics } = useSelector((state) => state.statistics);


  useEffect(() => {
    dispatch(getStatistics())
    
  }, []);

  let information;

  if (Object.keys(statistics).length === 0) {
    information = <SkeletonB active block></SkeletonB>
  } else {
    information = (
      <PageHeader
        className="top-nav"
        title={[
          <Text
            className="text-sm"
          >
            Cryptos:
            <Button size="middle" type="link">
            {commaNumber(statistics.active_cryptocurrencies)}
            </Button>
          </Text>,
          <Text
            className="text-sm"
          >
            Total Exchanges:
            <Button size="small" type="link">
              344
            </Button>
          </Text>,
          <Text
            className="text-sm"
          >
            Total Market Cap:
            <Button size="middle" type="link">
              ${ commaNumber(statistics.total_market_cap?.usd.toFixed()) }
            </Button>
          </Text>,
          <Text
            className="text-sm"
          >
            Total Markets:
            <Button size="small" type="link">
              { statistics.markets }
            </Button>
          </Text>,
          <Text
            className="text-sm"
          >
            Total 24h Volume:
            <Button size="middle" type="link">
              ${ commaNumber(statistics.total_volume?.usd.toFixed()) }
            </Button>
          </Text>
        ]}>
      </PageHeader>
    );
  }

  return (
    <>
      { information }
    </>
  );
}

export default TopNav;
