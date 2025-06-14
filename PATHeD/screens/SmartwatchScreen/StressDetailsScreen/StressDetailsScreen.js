import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {faBrain, faPersonRunning, faFaceMeh, faFaceAngry} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import {formatTimeFromSeconds} from '../utils/timeUtils';
import MetricCard from '../components/MetricCard';
import smartwatchStyle from "../assets/styles/smartwatchStyle";

const StressDetailsChart = ({route}) => {
    const selectedDate = route.params?.selectedDate;
    const [summary, setSummary] = useState(null);

    const createTitleContainer = (title, color) => (
        <View style={styles.titleContainer}>
            <View style={[styles.colorIndicator, {backgroundColor: color}]}/>
            <Text style={styles.label}>{title}</Text>
        </View>
    );

    return (
        <ScrollView style={smartwatchStyle.container}>
            <ChartDetails
                title="Stress Summary"
                dataType="stress"
                segments={['Day', 'Week', 'Month']}
                chartColor="#673AB7"
                onSummaryUpdate={(value) => setSummary(value)}
                initialDate={selectedDate}
            />

            <View style={styles.metricsContainer}>
                {summary && typeof summary === 'object' ? (
                    <>
                        <View style={smartwatchStyle.row}>
                            {/* Rest Stress */}
                            {(() => {
                                const {value, unit} = formatTimeFromSeconds(summary.restStressDurationInSeconds);
                                return (
                                    <MetricCard
                                        title="Rest"
                                        value={value}
                                        unit={unit}
                                        icon={faBrain}
                                        color="#1976D2"
                                        titleContainer={createTitleContainer("Rest", "#1976D2")}
                                    />
                                );
                            })()}
                            {/* Low Stress */}
                            {(() => {
                                const {value, unit} = formatTimeFromSeconds(summary.lowStressDurationInSeconds);
                                return (
                                    <MetricCard
                                        title="Low"
                                        value={value}
                                        unit={unit}
                                        icon={faPersonRunning}
                                        color="#FFB74D"
                                        titleContainer={createTitleContainer("Low", "#FFB74D")}
                                    />
                                );
                            })()}
                        </View>
                        <View style={smartwatchStyle.row}>
                            {/* Medium Stress */}
                            {(() => {
                                const {value, unit} = formatTimeFromSeconds(summary.mediumStressDurationInSeconds);
                                return (
                                    <MetricCard
                                        title="Medium"
                                        value={value}
                                        unit={unit}
                                        icon={faFaceMeh}
                                        color="#FB8C00"
                                        titleContainer={createTitleContainer("Medium", "#FB8C00")}
                                    />
                                );
                            })()}
                            {/* High Stress */}
                            {(() => {
                                const {value, unit} = formatTimeFromSeconds(summary.highStressDurationInSeconds);
                                return (
                                    <MetricCard
                                        title="High"
                                        value={value}
                                        unit={unit}
                                        icon={faFaceAngry}
                                        color="#E65100"
                                        titleContainer={createTitleContainer("High", "#E65100")}
                                    />
                                );
                            })()}
                        </View>
                        <View style={smartwatchStyle.row}>
                            <MetricCard
                                title="Max Level"
                                value={summary.maxStressLevel}
                                unit=""
                                icon={faFaceAngry}
                                color="#673AB7"
                            />
                            <MetricCard
                                title="Average Level"
                                value={summary.averageStressLevel < 0 ? 0 : summary.averageStressLevel}
                                unit=""
                                icon={faFaceMeh}
                                color="#673AB7"
                            />
                        </View>
                    </>
                ) : (
                    <View style={smartwatchStyle.row}>
                        <MetricCard
                            title="Average Stress"
                            value={summary}
                            unit=""
                            icon={faBrain}
                            color="#673AB7"
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    colorIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
});

export default StressDetailsChart;
