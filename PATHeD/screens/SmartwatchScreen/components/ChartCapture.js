// ChartCapture.js - Generic component for capturing any chart type
import React, { useRef, useEffect } from 'react';
import ViewShot from 'react-native-view-shot';
import ChartDetails from './ChartDetails/ChartDetails';
import RNFS from 'react-native-fs';
import { View } from 'react-native';

const ChartCapture = React.forwardRef(({
    selectedDate,
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
                const dirPath = '/storage/emulated/0/Android/data/com.pathed/files/Documents';
                const destPath = `${dirPath}/${dataType}_monthly_segment.jpg`;

                const exists = await RNFS.exists(dirPath);
                if (!exists) await RNFS.mkdir(dirPath);

                await RNFS.copyFile(uri, destPath);
                // console.log(`Saved ${dataType} chart to:`, destPath);
                onDone && onDone(true, dataType);
            } catch (err) {
                console.error(`${dataType} chart capture failed:`, err);
                onDone && onDone(false, dataType);
            }
        };

        // Add slight delay for rendering before capture
        setTimeout(capture, 200);
    }, [dataType]);

    return (
        <View style={{ position: 'absolute', opacity: 0 }}>
            <ViewShot ref={chartRef} options={{ format: 'jpg', quality: 0.9 }}>
                <ChartDetails
                    title={title}
                    dataType={dataType}
                    segments={['Month']}
                    chartColor={chartColor}
                    initialDate={selectedDate}
                />
            </ViewShot>
        </View>
    );
});

export default ChartCapture;
