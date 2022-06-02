import  React, { useEffect } from "react";
import {
  Typography,
  PageHeader,
  Button,
  Skeleton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getExchanges, getStatistics } from "../../Services/cryptoApi";
import { Link } from "react-router-dom";
const commaNumber = require('comma-number');

const { Text } = Typography;
const { Input: SkeletonB } = Skeleton;

function TopNav() {

  const dispatch = useDispatch();
  const { statistics } = useSelector((state) => state.statistics);
  const { exchanges } = useSelector((state) => state.exchanges);


  useEffect(() => {
    dispatch(getStatistics())
    dispatch(getExchanges());
    
  }, [dispatch]);

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
            key={'1'}
          >
            Cryptos:
            <Button size="middle" type="link">
              <Link to={'/cryptocurrencies'}>
                {commaNumber(statistics.active_cryptocurrencies)}
              </Link>
            </Button>
          </Text>,
          <Text
            className="text-sm"
            key={'2'}
          >
            Total Exchanges:
            <Button size="small" type="link">
              <Link to="/exchanges">
              { exchanges.length }
              </Link>
            </Button>
          </Text>,
          <Text
            className="text-sm"
            key={'3'}
          >
            Total Market Cap:
            <Button size="middle" type="link">
              <Link to={'/cryptocurrencies'}>
                ${ commaNumber(statistics.total_market_cap?.usd.toFixed()) }
              </Link>
            </Button>
          </Text>,
          <Text
            className="text-sm"
            key={'4'}
          >
            Total Markets:
            <Button size="small" type="link">
              <Link to={'/cryptocurrencies'}>
                { statistics.markets }
              </Link>
            </Button>
          </Text>,
          <Text
            className="text-sm"
            key={'5'}
          >
            Total 24h Volume:
            <Button size="middle" type="link">
              <Link to={'/cryptocurrencies'}>
                ${ commaNumber(statistics.total_volume?.usd.toFixed()) }
              </Link>
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
