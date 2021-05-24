import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';

/**
 * Component responsible for displaying the bar chart
 * for the reviews for a given product starwise.
 * @param reviewBreakdown Starwise distribution of reviews
 */
const ReviewBarChartComponent = ({ reviewBreakdown }) => {

  // State hook to store formatted data distribution
  const [data, setData] = useState([]);

  // Destructuring Theme hook for colours
  const { colors } = useTheme();

  // Theme configuration for the chart.
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

  // UseEffect hook to convert the starwise distribution data
  // into usable format for the chart package to use for every
  // reviewBreakdown changes
  useEffect(() => {
    if (reviewBreakdown) {

      // Temporary array to store formatted data.
      const tempData = [];

      // Looping over the distribution data
      for (let [key, value] of Object.entries(reviewBreakdown)) {

        // Pushing JSON object holding star value
        // and no of reviews for that star.
        tempData.push({
          stars: key,
          reviews: value,
        });
      }

      // Saving into the state hook.
      setData(tempData);
    }
  }, [reviewBreakdown]);

  return (
    <React.Fragment>
      {data.length > 0 && (
        <VictoryChart theme={chartTheme}>
          <VictoryBar
            barWidth={40}
            style={{ data: { fill: colors.primary } }}
            data={data}
            x="stars"
            y="reviews"
            horizontal={true}
          />
          <VictoryAxis
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent', padding: 10 },
            }}
          />
        </VictoryChart>
      )}
    </React.Fragment>
  );
};

export default ReviewBarChartComponent;
