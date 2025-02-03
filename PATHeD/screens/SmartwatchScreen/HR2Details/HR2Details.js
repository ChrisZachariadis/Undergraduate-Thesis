// HR2Details.js
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import Frame from '../components/Frame';
import {styles} from './styles';

const HR2Details = () => {
    const [summary, setSummary] = useState(null);

    return (
        <View style={{flex: 1}}>
            <ChartDetails
                title="Heart Rate Summary"
                dataType="hr"
                segments={['Day', 'Week', 'Month']}
                chartColor="#FF6347"
                onSummaryUpdate={(value) => setSummary(value)}
            />
            <Frame>
                {summary && typeof summary === 'object' ? (
                    <>
                        <Text>
                            Average HR: {summary.averageHeartRateInBeatsPerMinute} bpm
                        </Text>
                        <Text>
                            Resting HR: {summary.restingHeartRateInBeatsPerMinute} bpm
                        </Text>
                        <Text>
                            Min HR: {summary.minHeartRateInBeatsPerMinute} bpm
                        </Text>
                        <Text>
                            Max HR: {summary.maxHeartRateInBeatsPerMinute} bpm
                        </Text>
                    </>
                ) : (
                    <Text>
                        Average HR: {summary} bpm
                    </Text>
                )}
            </Frame>
        </View>
    );
};

export default HR2Details;
