import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoHistory } from "../../Services/cryptoApi";
import { useEffect } from "react";
import Loader from "../../pages/Loader";
import moment from "moment";


const { Title, Paragraph } = Typography;

function LineChart({ id, name }) {

  const dispatch = useDispatch();
  const { cHistory, loading } = useSelector((state) => state.cHistory);

  useEffect(() => {
    dispatch(getCryptoHistory({ id }));
  
  }, []);

  let chart ;

  if (loading) {
    chart = <Loader />
  } else {

    const chartData = cHistory?.prices;
    const coinPrice = [];
    const coinPriceTimestamp = [];
  
  
    for (let i = 0; i < chartData.length; i+= 1) {
        coinPrice.push(chartData[i][1].toFixed());
        coinPriceTimestamp.push(moment(chartData[i][0]).format('hh:mm A'));
        
    }
  
    const lineChart = {
      series: [
        {
          name: name,
          data: coinPrice,
          offsetY: 0,
        },
      ],

      options: {
        chart: {
          width: "100%",
          height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },

        legend: {
          show: false,
        },

        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },

        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: ["#8c8c8c"],
            },
          },
        },

        xaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: [
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
              ],
            },
          },
          categories: coinPriceTimestamp,
        },

        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    };
    
    chart = (
      <>
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

        <ReactApexChart
          className="full-width"
          options={lineChart.options}
          series={lineChart.series}
          type="line"
          height={350}
          width={"100%"}
        />
      </>
    )
  }

  return (
     chart
  );
}

export default LineChart;
