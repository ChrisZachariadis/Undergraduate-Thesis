import React, {useEffect, useState} from 'react';

import {View, Text} from 'react-native';
import {BarChart, barDataItem} from 'react-native-gifted-charts';
import Frame from './Frame';

// enum Period {
//     week = 'week',
//     month = 'month',
//     year = 'year',
// }

const SummaryChart = () => {

    // const[charData, setChartData] = useState<barDataItem[]>([]);
    // const[chartPeriod, setChartPeriod] = useState<Period>(Period.week);
    // // Keep track of the current date
    // const[currentDate, setCurrentDate] = useState<Date>(new Date());
    // const[currentEndDate, setCurrentEndDate] = useState<Date>(new Date());
    //
    // useEffect(() => {
    //     if (chartPeriod === Period.week) {
    //         const [endDate, startDate] = getWeekRange(currentDate);
    //         setCurrentEndDate(new Date(endDate));
    //         // Get the start date of the week
    //     }
    //
    // })
    //
    // const getWeekRange = (date: Date) => {
    //     const startOfWeek = new Date(date.getDate() - date.getDay());
    //     const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));
    //
    //     return {
    //         startDate: Math.floor(startOfWeek.getTime()),
    //         endDate: Math.floor(endOfWeek.getTime()),};
    // }

    return (
        <Frame style={{marginTop: 100}}>
            <BarChart
                data={[
                    {value: 100},
                    {value: 200, frontColor: 'red'},
                    {value: 200, frontColor: 'purple'},
                    {value: 0, frontColor: 'red'},
                ]}
                height={200}
                width={290}
                barWidth={18}
                minHeight={3}
                barBorderRadius={3}
                spacing={20}
                noOfSections={4}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisLabelTextStyle={{fontSize: 12, color: 'grey'}}
                yAxisLabelTextStyle={{fontSize: 12, color: 'grey'}}
                isAnimated={true}
                animationDuration={300}
                dashGap={10}

            />
        </Frame>
    );
}
export default SummaryChart;
