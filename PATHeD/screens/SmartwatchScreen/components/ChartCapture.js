// ChartCapture.js - Generic component for capturing any chart type
import React, { useRef, useEffect } from 'react';
import ViewShot from 'react-native-view-shot';
import ChartDetails from './ChartDetails/ChartDetails';
import { View } from 'react-native';

const ChartCapture = React.forwardRef(({
    selectedDate,
    selectedMonth, // Add new prop for specific month
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

        // Add slight delay for rendering before capture
        setTimeout(capture, 100);
    }, [dataType, selectedMonth]);

    // Use the specific month date instead of selectedDate if provided
    const dateToUse = selectedMonth ? `${selectedMonth}-01` : selectedDate;

    return (
        <View style={{ position: 'absolute', opacity: 0 }}>
            <ViewShot ref={chartRef} options={{ format: 'jpg', quality: 0.9 }}>
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
