import React, {useRef, useEffect} from 'react';
import ViewShot from 'react-native-view-shot';
import ChartDetails from './ChartDetails/ChartDetails';
import {View} from 'react-native';

// ChartCapture component captures a chart and returns its URI
const ChartCapture = React.forwardRef(({
                                           selectedDate,
                                           selectedMonth,
                                           segmentType = 'Month',
                                           dataType = 'hr',
                                           title = 'Chart Summary',
                                           chartColor = '#FF6347',
                                           onDone
                                       }, ref) => {
    const chartRef = useRef();

    useEffect(() => {
        const capture = async () => {
            try {
                const uri = await chartRef.current.capture();
                // Return the URI with month information
                onDone && onDone(true, dataType, uri, selectedMonth);
            } catch (err) {
                console.error(`${dataType} chart capture failed for ${selectedMonth}:`, err);
                onDone && onDone(false, dataType, null, selectedMonth);
            }
        };

        // Add slight delay for rendering before capturing
        setTimeout(capture, 150);
    }, [dataType, selectedMonth]);

    // Use the specific month date instead of selectedDate if provided
    const dateToUse = selectedMonth ? `${selectedMonth}-01` : selectedDate;

    return (
        <View style={{position: 'absolute', opacity: 0}}>
            <ViewShot ref={chartRef} options={{format: 'jpg', quality: 0.9}}>
                <ChartDetails
                    title={title}
                    dataType={dataType}
                    segments={['Month']}
                    chartColor={chartColor}
                    initialDate={dateToUse}
                />
            </ViewShot>
        </View>
    );
});

export default ChartCapture;
