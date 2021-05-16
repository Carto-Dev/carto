import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory-native';

const ReviewBarChartComponent = ({reviewBreakdown}) => {
  const [data, setData] = useState([]);
  const {colors} = useTheme();

  const chartTheme = {
    axis: {
      style: {
        tickLabels: {
          fill: 'white',
        },
        grid: {
          stroke: 'transparent',
        },
      },
    },
  };

  useEffect(() => {
    if (reviewBreakdown) {
      const tempData = [];
      for (let [key, value] of Object.entries(reviewBreakdown)) {
        tempData.push({
          stars: key,
          reviews: value,
        });
      }
      setData(tempData);
    }
  }, [reviewBreakdown]);

  return (
    <React.Fragment>
      {data.length > 0 && (
        <VictoryChart theme={chartTheme}>
          <VictoryBar
            barWidth={40}
            style={{data: {fill: colors.primary}}}
            data={data}
            x="stars"
            y="reviews"
            horizontal={true}
          />
          <VictoryAxis
            style={{
              axis: {stroke: 'transparent'},
              ticks: {stroke: 'transparent', padding: 10},
            }}
          />
        </VictoryChart>
      )}
    </React.Fragment>
  );
};

export default ReviewBarChartComponent;
