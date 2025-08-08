import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Papa from 'papaparse';
import './App.css'; 

interface FuelData {
  Date: string;
  'Petrol RSP': number;
  'Diesel RSP': number;
  City: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<FuelData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedFuel, setSelectedFuel] = useState<string>('Petrol RSP');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/petrol-diesel-prices.csv');
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result?.value);

        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: header => header.trim(),
          complete: (results) => {
            interface RawCsvRow {
              'Calendar Day': string;
              'Products': 'Petrol' | 'Diesel';
              'Metro Cities': string;
              'Retail Selling Price (Rsp) Of Petrol And Diesel (UOM:INR/L(IndianRupeesperLitre)), Scaling Factor:1': number;
            }

            const groupedData: { [key: string]: Partial<FuelData> } = {};
            const rawData = results.data as RawCsvRow[];

            rawData.forEach(row => {
              const price = row['Retail Selling Price (Rsp) Of Petrol And Diesel (UOM:INR/L(IndianRupeesperLitre)), Scaling Factor:1'] || 0;
              
              if (row['Calendar Day'] && row['Metro Cities'] && row['Products']) {
                const date = row['Calendar Day'];
                const city = row['Metro Cities'];
                const key = `${date}_${city}`;

                if (!groupedData[key]) {
                  groupedData[key] = { Date: date, City: city };
                }

                if (row['Products'] === 'Petrol') {
                  groupedData[key]['Petrol RSP'] = price;
                } else if (row['Products'] === 'Diesel') {
                  groupedData[key]['Diesel RSP'] = price;
                }
              }
            });

            const parsedData = Object.values(groupedData).map(item => ({
              Date: item.Date!,
              City: item.City!,
              'Petrol RSP': item['Petrol RSP'] || 0,
              'Diesel RSP': item['Diesel RSP'] || 0,
            }));

            setData(parsedData);

            const uniqueCities = [...new Set(parsedData.map(item => item.City))].filter(Boolean);
            const uniqueYears = [...new Set(parsedData.map(item => {
                try {
                    if (item.Date && !isNaN(new Date(item.Date).getTime())) {
                        return new Date(item.Date).getFullYear().toString();
                    }
                    return null;
                } catch (e) { return null; }
            }))].filter((year): year is string => year !== null);
            
            const sortedYears = uniqueYears.sort((a, b) => parseInt(b) - parseInt(a));
            
            setCities(uniqueCities);
            setYears(sortedYears);

            if (uniqueCities.length > 0) setSelectedCity(uniqueCities[0]);
            if (sortedYears.length > 0) setSelectedYear(sortedYears[0]);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && selectedCity && selectedYear && chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current, 'light');
      }

      const filteredData = data.filter(
        item => {
            try {
                return item.City === selectedCity && new Date(item.Date).getFullYear().toString() === selectedYear;
            } catch (e) {
                return false;
            }
        }
      );

      const monthlyAverage = Array(12).fill(0).map(() => ({ sum: 0, count: 0 }));

      filteredData.forEach(item => {
        const date = new Date(item.Date);
        if (!isNaN(date.getTime())) {
            const month = date.getMonth();
            const price = item[selectedFuel as keyof Omit<FuelData, 'Date' | 'City'>] as number;
            if (price > 0) {
                monthlyAverage[month].sum += price;
                monthlyAverage[month].count++;
            }
        }
      });
      
      const chartData = monthlyAverage.map(month => month.count > 0 ? (month.sum / month.count) : 0);

      const option = {
        title: {
          text: `Monthly Average RSP for ${selectedFuel.split(' ')[0]} in ${selectedCity} (${selectedYear})`,
          left: 'center',
          textStyle: {
            color: '#37474f',
            fontWeight: 'normal',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          valueFormatter: (value: number | string) => typeof value === 'number' ? `₹${value.toFixed(2)}` : value,
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderColor: '#333',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisLine: {
            lineStyle: {
              color: '#90a4ae'
            }
          },
          axisLabel: {
            color: '#546e7a'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Average RSP (₹)',
          nameTextStyle: {
            color: '#546e7a'
          },
          axisLabel: {
            formatter: '{value}',
            color: '#546e7a'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#eceff1'
            }
          }
        },
        series: [
          {
            name: 'Average RSP',
            type: 'bar',
            barWidth: '60%',
            data: chartData,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#80deea' },
                { offset: 1, color: '#0097a7' }
              ]),
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#26c6da' },
                  { offset: 1, color: '#006064' }
                ])
              }
            }
          },
        ],
      };

      chartInstance.current.setOption(option, true);
    }
  }, [data, selectedCity, selectedFuel, selectedYear]);
  
    useEffect(() => {
        const resizeChart = () => chartInstance.current?.resize();
        window.addEventListener('resize', resizeChart);
        return () => {
            window.removeEventListener('resize', resizeChart);
            chartInstance.current?.dispose();
        };
    }, []);


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Fuel Price Dashboard</h1>
      <div className="controls-container">
        <div className="control-group">
          <label htmlFor="city-select">City</label>
          <select id="city-select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="fuel-select">Fuel Type</label>
          <select id="fuel-select" value={selectedFuel} onChange={e => setSelectedFuel(e.target.value)}>
            <option value="Petrol RSP">Petrol</option>
            <option value="Diesel RSP">Diesel</option>
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="year-select">Year</label>
          <select id="year-select" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </div>
      <div ref={chartRef} className="chart-container"></div>
    </div>
  );
};

export default App;
