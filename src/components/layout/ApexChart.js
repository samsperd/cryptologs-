import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { getCryptoHistory } from '../../Services/cryptoApi';
import Loader from '../../pages/Loader';
import { Radio } from 'antd';



const ApexChart = ({ id }) => {

    const dispatch = useDispatch();
    const { cHistory, loading } = useSelector((state) => state.cHistory);

    // const [history, setHistory] = useState(cHistory);

    const [chartSelection, setChartSelection] = useState('all');

    const chartPricesData = cHistory?.prices || [];


  
    useEffect(() => {
      dispatch(getCryptoHistory({ id }));
    
    }, [dispatch, id]);

    

    let chartPrices = [];
    let lastPrice;



    let priceChart;

    if (loading) {
      priceChart = <Loader />
    } else {
      
      lastPrice = chartPricesData[0][0] || new Date().getTime();

        for (let i = 0; i < chartPricesData.length; i++ ) {
            chartPrices.push([chartPricesData[i][0], chartPricesData[i][1] < 1 ? (+chartPricesData[i][1].toFixed(4)) : chartPricesData[i][1].toFixed()]);
            
        }
        let chartInfo =  {
            series: [{
                data: chartPrices
            }],
            options: {
                chart: {
                id: 'area-datetime',
                type: 'area',
                height: 350,
                zoom: {
                    autoScaleYaxis: true
                }
                },
                dataLabels: {
                enabled: false
                },
                markers: {
                size: 0,
                style: 'hollow',
                },
                xaxis: {
                type: 'datetime',
                tickAmount: 6,
                },
                tooltip: {
                x: {
                    format: 'dd MMM yyyy'
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
        }
            
        priceChart = (
            <div id="price_chart">
                <Radio.Group value={chartSelection} onChange={(e) => updateData(e.target.value)}>
                    <Radio.Button value="one_month">1M</Radio.Button>
                    <Radio.Button value="six_months">6M</Radio.Button>
                    <Radio.Button value="one_year">1Y</Radio.Button>
                    <Radio.Button value="ytd">YTD</Radio.Button>
                    <Radio.Button value="all">ALL</Radio.Button>
                </Radio.Group>

                {/* <div>
                    <button id="one_month"
                        
                        onClick={() => updateData('one_month')} className={ (chartSelection ==='one_month' ? 'active' : '')}>
                    1M
                    </button>
                    &nbsp;
                    <button id="six_months"
                        
                        onClick={()=>updateData('six_months')} className={ (chartSelection ==='six_months' ? 'active' : '')}>
                    6M
                    </button>
                    &nbsp;
                    <button id="one_year"
                        
                        
                        onClick={()=>updateData('one_year')} className={ (chartSelection ==='one_year' ? 'active' : '')}>
                    1Y
                    </button>
                    &nbsp;
                    <button id="ytd"
                        
                        onClick={()=> updateData('ytd')} className={ (chartSelection ==='ytd' ? 'active' : '')}>
                    YTD
                    </button>
                    &nbsp;
                    <button id="all"
                        
                        onClick={()=> updateData('all')} className={ (chartSelection ==='all' ? 'active' : '')}>
                    ALL
                    </button>
                </div> */}

                <div>
                    <ReactApexChart options={chartInfo.options} series={chartInfo.series} type="area" height={350} />
                </div>
            </div>
        )

    }
    const updateData = (timeline) => {
      setChartSelection(timeline)
    
      switch (timeline) {
        case 'one_month':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date().setMonth(new Date().getMonth() - 1),
            new Date().getTime()
          )
          break
        case 'six_months':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date().setMonth(new Date().getMonth() - 6),
            new Date().getTime(),
          )
          break
        case 'one_year':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date().setMonth(new Date().getMonth() - 12),
            new Date().getTime(),
          )
          break
        case 'ytd':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date().setDate(new Date().getDate() -1),
            new Date().getTime(),
          )
          break
        case 'all':
          ApexCharts.exec(
            'area-datetime',
            'zoomX',
            lastPrice,
            new Date().getTime(),
          )
          break
        default:
            ApexCharts.exec(
              'area-datetime',
              'zoomX',
              lastPrice,
              new Date().getTime(),
              )
            break
          }
    }
  

      return (
        <>
        { priceChart }
        </>


      );
    }
export default ApexChart;
