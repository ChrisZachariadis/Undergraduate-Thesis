// ChartDetails.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
import Frame from '../Frame';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { styles } from './styles';
import { processHRDailyData, processStressDailyData, processWeeklyData, processMonthlyData, getHRBarColor } from './ProcessData';

const ChartDetails = ({
                          title,
                          dataType,   // "hr", "kcal", "steps", "floors", "stress"
                          segments,   // For hr: ['Day','Week','Month']; for kcal/steps/floors: ['Week','Month'];
                                      // For stress: ['Day','Week','Month'] (with Day showing a PieChart)
                          chartColor,
                          storageKey = '@garminData'
                      }) => {
    // State variables
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Period states
    const [currentDay, setCurrentDay] = useState(moment());
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));
    const [currentMonthStart, setCurrentMonthStart] = useState(moment().startOf('month'));

    // Tooltip state (used for bar/line charts)
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipLeft, setTooltipLeft] = useState(0);
    const [tooltipIndex, setTooltipIndex] = useState(null);

    // Chart layout settings (adjusted per view)
    let dynamicBarWidth = 18;
    let dynamicSpacing = 20;
    let initialSpacing = 1;
    let chartWidth = 355;
    // For line charts (typically used in the daily view for HR)
    const lineSpacing = 14;
    const lineInitialSpacing = 6;

    // Determine current segment label based on provided segments array.
    let currentSegment = segments[selectedIndex];
    if (currentSegment === 'Week') {
        dynamicBarWidth = 28;
        dynamicSpacing = 20;
        chartWidth = 350;
        initialSpacing = 10;
    } else if (currentSegment === 'Month') {
        dynamicBarWidth = 10;
        dynamicSpacing = 1;
        chartWidth = 380;
    }

    // Fetch data when the segment or period changes.
    useEffect(() => {
        fetchData();
    }, [selectedIndex, currentDay, currentWeekStart, currentMonthStart]);

    const fetchData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(storageKey);
            const parsedData = JSON.parse(storedData);
            let processedData = [];

            if (dataType === 'hr') {
                if (currentSegment === 'Day') {
                    processedData = processHRDailyData(parsedData.data, currentDay);
                } else if (currentSegment === 'Week') {
                    processedData = processWeeklyData(
                        parsedData.data,
                        currentWeekStart,
                        "averageHeartRateInBeatsPerMinute",
                        getHRBarColor
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "averageHeartRateInBeatsPerMinute",
                        getHRBarColor
                    );
                }
            } else if (dataType === 'kcal') {
                if (currentSegment === 'Week') {
                    processedData = processWeeklyData(
                        parsedData.data,
                        currentWeekStart,
                        "bmrKilocalories",
                        "#FFA500"
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "bmrKilocalories",
                        "#FFA500"
                    );
                }
            } else if (dataType === 'steps') {
                if (currentSegment === 'Week') {
                    processedData = processWeeklyData(
                        parsedData.data,
                        currentWeekStart,
                        "steps",
                        "#00BFFF"
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "steps",
                        "#00BFFF"
                    );
                }
            } else if (dataType === 'floors') {
                if (currentSegment === 'Week') {
                    processedData = processWeeklyData(
                        parsedData.data,
                        currentWeekStart,
                        "floorsClimbed",
                        "#8BC34A"
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "floorsClimbed",
                        "#8BC34A"
                    );
                }
            } else if (dataType === 'stress') {
                // For stress, if the day view is selected, use a pie chart.
                if (currentSegment === 'Day') {
                    processedData = processStressDailyData(parsedData.data, currentDay);
                } else if (currentSegment === 'Week') {
                    processedData = processWeeklyData(
                        parsedData.data,
                        currentWeekStart,
                        "averageStressLevel",
                        "#673AB7"
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "averageStressLevel",
                        "#673AB7"
                    );
                }
            }
            setChartData(processedData);
        } catch (err) {
            setError('Failed to load data.');
            Alert.alert('Error', 'An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };



    // ─── NAVIGATION HANDLERS ─────────────────────────────────────────────
    const handlePrevious = () => {
        if (currentSegment === 'Day') {
            setCurrentDay(moment(currentDay).subtract(1, 'day'));
        } else if (currentSegment === 'Week') {
            setCurrentWeekStart(moment(currentWeekStart).subtract(1, 'week'));
        } else if (currentSegment === 'Month') {
            setCurrentMonthStart(moment(currentMonthStart).subtract(1, 'month'));
        }
    };

    const handleNext = () => {
        if (currentSegment === 'Day') {
            const nextDay = moment(currentDay).add(1, 'day');
            if (nextDay.isAfter(moment())) {
                Alert.alert('Invalid Action', 'Cannot navigate to future days.');
                return;
            }
            setCurrentDay(nextDay);
        } else if (currentSegment === 'Week') {
            const nextWeek = moment(currentWeekStart).add(1, 'week');
            if (nextWeek.isAfter(moment().startOf('week'))) {
                Alert.alert('Invalid Action', 'Cannot navigate to future weeks.');
                return;
            }
            setCurrentWeekStart(nextWeek);
        } else if (currentSegment === 'Month') {
            const nextMonth = moment(currentMonthStart).add(1, 'month');
            if (nextMonth.isAfter(moment().startOf('month'))) {
                Alert.alert('Invalid Action', 'Cannot navigate to future months.');
                return;
            }
            setCurrentMonthStart(nextMonth);
        }
    };

    const handleSegmentChange = (index) => {
        setSelectedIndex(index);
        setIsLoading(true);
        const seg = segments[index];
        if (seg === 'Day') {
            setCurrentDay(moment());
        } else if (seg === 'Week') {
            setCurrentWeekStart(moment().startOf('week'));
        } else if (seg === 'Month') {
            setCurrentMonthStart(moment().startOf('month'));
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const getDateRange = () => {
        if (currentSegment === 'Day') {
            return moment(currentDay).format('MMMM D, YYYY');
        } else if (currentSegment === 'Week') {
            const start = moment(currentWeekStart).format('MMM D');
            const end = moment(currentWeekStart).add(6, 'days').format('MMM D, YYYY');
            return `${start} - ${end}`;
        } else if (currentSegment === 'Month') {
            return moment(currentMonthStart).format('MMMM YYYY');
        }
        return '';
    };

    if (isLoading) {
        return (
            <Frame style={styles.loadingFrame}>
                <ActivityIndicator size="large" color={chartColor} />
                <Text style={styles.loadingText}>Loading...</Text>
            </Frame>
        );
    }

    if (error) {
        return (
            <Frame style={styles.errorFrame}>
                <Text style={styles.errorText}>{error}</Text>
            </Frame>
        );
    }

    return (
        <Frame padding={1} marginHorizontal={3} style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handlePrevious} style={styles.arrowButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <Text style={styles.dateRangeText}>{getDateRange()}</Text>
            <SegmentedControl
                style={styles.segmentedControl}
                values={segments}
                selectedIndex={selectedIndex}
                onChange={(event) => handleSegmentChange(event.nativeEvent.selectedSegmentIndex)}
                tintColor={chartColor}
                activeTextColor="#fff"
                inactiveTextColor="#000"
            />
            {dataType === 'stress' && currentSegment === 'Day' ? (
                // For stress daily view, render a PieChart.
                <View style={styles.chartContainer}>
                    <PieChart
                        donut
                        innerRadius={60}
                        radius={80}
                        data={chartData}
                        showText
                        textColor="white"
                        textSize={14}
                        width={Dimensions.get('window').width - 40}
                    />
                </View>
            ) : (
                <View style={styles.graphContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {currentSegment === 'Day' ? (
                            <LineChart
                                data={chartData}
                                width={chartWidth}
                                height={250}
                                spacing={lineSpacing}
                                initialSpacing={lineInitialSpacing}
                                thickness={2}
                                color={chartColor}
                                disableScroll={true}
                                hideDataPoints={false}
                                dataPointsRadius={4}
                                dataPointsColor={chartColor}
                                xAxisLabelTextStyle={styles.axisLabel}
                                noOfSections={6}
                                onPress={(item, index) => {
                                    const left = lineInitialSpacing + index * lineSpacing - 20;
                                    setTooltipLeft(left);
                                    setTooltipData(item);
                                    setTooltipIndex(index);
                                    setTooltipVisible(true);
                                }}
                            />
                        ) : (
                            <BarChart
                                data={chartData}
                                width={chartWidth}
                                height={250}
                                disableScroll={true}
                                barWidth={dynamicBarWidth}
                                spacing={dynamicSpacing}
                                initialSpacing={initialSpacing}
                                minHeight={3}
                                barBorderRadius={3}
                                noOfSections={4}
                                yAxisThickness={0}
                                xAxisThickness={0}
                                xAxisLabelTextStyle={styles.axisLabel}
                                yAxisTextStyle={styles.yaxisLabel}
                                isAnimated={false}
                                dashGap={35}
                                onPress={(item, index) => {
                                    const left = initialSpacing + index * (dynamicBarWidth + dynamicSpacing) - 20;
                                    setTooltipLeft(left);
                                    setTooltipData(item);
                                    setTooltipIndex(index);
                                    setTooltipVisible(true);
                                }}
                            />
                        )}
                    </ScrollView>
                </View>
            )}
            {!(dataType === 'stress' && currentSegment === 'Day') && tooltipVisible && tooltipData && (
                <Modal transparent animationType="fade">
                    <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setTooltipVisible(false)}>
                        {(() => {
                            const screenWidth = Dimensions.get('window').width;
                            const tooltipWidth = 155;
                            let adjustedLeft = tooltipLeft;
                            if (adjustedLeft < 0) adjustedLeft = 5;
                            if (adjustedLeft + tooltipWidth > screenWidth)
                                adjustedLeft = screenWidth - tooltipWidth - 5;
                            let tooltipText = '';
                            if (dataType === 'hr') {
                                if (currentSegment === 'Day') {
                                    tooltipText = `Hour ${tooltipData.label || tooltipIndex}\nAvg HR: ${tooltipData.value} bpm`;
                                } else if (currentSegment === 'Week') {
                                    tooltipText = `${tooltipData.label}\nAvg HR: ${tooltipData.value} bpm`;
                                } else if (currentSegment === 'Month') {
                                    tooltipText = `Day ${tooltipData.label || tooltipIndex + 1}\nAvg HR: ${tooltipData.value} bpm`;
                                }
                            } else if (dataType === 'kcal') {
                                if (currentSegment === 'Week') {
                                    tooltipText = `${tooltipData.label}\nKcal: ${tooltipData.value}`;
                                } else if (currentSegment === 'Month') {
                                    tooltipText = `Day ${tooltipData.label || tooltipIndex + 1}\nKcal: ${tooltipData.value}`;
                                }
                            } else if (dataType === 'steps') {
                                if (currentSegment === 'Week') {
                                    tooltipText = `${tooltipData.label}\nSteps: ${tooltipData.value}`;
                                } else if (currentSegment === 'Month') {
                                    tooltipText = `Day ${tooltipData.label || tooltipIndex + 1}\nSteps: ${tooltipData.value}`;
                                }
                            } else if (dataType === 'floors') {
                                if (currentSegment === 'Week') {
                                    tooltipText = `${tooltipData.label}\nFloors: ${tooltipData.value}`;
                                } else if (currentSegment === 'Month') {
                                    tooltipText = `Day ${tooltipData.label || tooltipIndex + 1}\nFloors: ${tooltipData.value}`;
                                }
                            } else if (dataType === 'stress') {
                                if (currentSegment === 'Week') {
                                    tooltipText = `${tooltipData.label}\nAvg Stress: ${tooltipData.value}`;
                                } else if (currentSegment === 'Month') {
                                    tooltipText = `Day ${tooltipData.label || tooltipIndex + 1}\nAvg Stress: ${tooltipData.value}`;
                                }
                            }
                            return (
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: adjustedLeft,
                                        bottom: 350,
                                        backgroundColor: 'white',
                                        padding: 8,
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        borderColor: '#e0e0e0',
                                        shadowColor: '#000',
                                        shadowOpacity: 0.2,
                                        shadowRadius: 4,
                                        elevation: 4,
                                        width: tooltipWidth
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold' }}>{tooltipText}</Text>
                                </View>
                            );
                        })()}
                    </TouchableOpacity>
                </Modal>
            )}
        </Frame>
    );
};

export default ChartDetails;
