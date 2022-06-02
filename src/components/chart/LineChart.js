import { useDispatch, useSelector } from "react-redux";
import { getCryptoHistory } from "../../Services/cryptoApi";
import { useEffect } from "react";
import Loader from "../../pages/Loader";
import commaNumber from "comma-number";
import ApexCharts from "apexcharts";

function LineChart({ id, name }) {

  const dispatch = useDispatch();
  const { cHistory, loading } = useSelector((state) => state.cHistory);

  useEffect(() => {
    dispatch(getCryptoHistory({ id }));
  
  }, [dispatch, id]);

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
          zoom: {
            autoScaleYaxis: true
          },
          toolbar: {
            show: false,
          },
        },
        annotations: {
          yaxis: [{
            y: 40000,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Support',
              style: {
                color: "#fff",
                background: '#00E396'
              }
            }
          }],
          xaxis: [{
            x: new Date('14 Nov 2012').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Rally',
              style: {
                color: "#fff",
                background: '#775DD0'
              }
            }
          }]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: ["#8c8c8c"],
            },
            formatter: function (val) {
              return '$' + commaNumber(val);
            }
            },
          // title: {
          //   text: 'USD'
          // }
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
            },
          },
        },

    
        selection: 'one_year',


        legend: {
          show: false,
        },
        stroke: {
          curve: "smooth",
        },
        
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          },
          y: {
            formatter: function (val) {
              return val;
            },
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },
    

      
    };
    
    chart = (
      <>
        <ApexCharts
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
