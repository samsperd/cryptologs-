import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoHistory } from "../../Services/cryptoApi";
import { useEffect } from "react";
import Loader from "../../pages/Loader";
import millify from "millify";


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

    const chartPricesData = cHistory?.prices;
    const chartData = [];
  
  
    for (let i = 0; i < chartPricesData.length; i++ ) {
        chartData.push([chartPricesData[i][0], chartPricesData[i][1] < 1 ? (+chartPricesData[i][1].toFixed(4)) : chartPricesData[i][1].toFixed()]);
        
    }
  
    const lineChart = {
      series: [
        {
          name: name,
          data: chartData,
          offsetY: 0,
        },
      ],

      options: {
        chart: {
          width: "100%",
          height: 350,
          type: "area",
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
          title: {
            text: 'USD'
          }
        },

        xaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
            },
          },
          type: 'datetime'
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
        <ReactApexChart
          className="full-width"
          options={lineChart.options}
          series={lineChart.series}
          type="area"
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
