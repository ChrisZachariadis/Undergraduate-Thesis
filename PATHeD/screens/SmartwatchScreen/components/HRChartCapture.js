// HRChartCapture.js
import React, { useRef, useEffect } from 'react';
import ViewShot from 'react-native-view-shot';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import RNFS from 'react-native-fs';
import { View } from 'react-native';

const HRChartCapture = React.forwardRef(({ selectedDate, segmentType = 'Month', onDone }, ref) => {
    const chartRef = useRef();

    useEffect(() => {
        const capture = async () => {
            try {
                const uri = await chartRef.current.capture();
                const dirPath = '/storage/emulated/0/Android/data/com.pathed/files/Documents';
                const destPath = `${dirPath}/monthly_segment.jpg`;

                const exists = await RNFS.exists(dirPath);
                if (!exists) await RNFS.mkdir(dirPath);

                await RNFS.copyFile(uri, destPath);
                console.log('Saved to:', destPath);
                onDone && onDone(true);
            } catch (err) {
                console.error('HR Chart capture failed:', err);
                onDone && onDone(false);
            }
        };

        // Add slight delay for rendering before capture
        setTimeout(capture, 200);
    }, []);

    return (
        <View style={{ position: 'absolute', opacity: 0 }}>
            <ViewShot ref={chartRef} options={{ format: 'jpg', quality: 0.9 }}>
                <ChartDetails
                    title="Heart Rate Summary"
                    dataType="hr"
                    segments={['Month']}
                    chartColor="#FF6347"
                    initialDate={selectedDate}
                />
            </ViewShot>
        </View>
    );
});

export default HRChartCapture;
