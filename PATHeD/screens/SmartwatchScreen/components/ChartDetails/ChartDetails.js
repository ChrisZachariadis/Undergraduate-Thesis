import React, {useEffect, useState} from 'react';
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
import {LineChart, BarChart, PieChart} from 'react-native-gifted-charts';
import Frame from '../Frame';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {styles} from './styles';
import {
    processHRDailyData,
    processStressDailyData,
    processWeeklyData,
    processMonthlyData,
    getHRBarColor, processIntensityMonthlyData, processIntensityWeeklyData
} from './ProcessData';

const ChartDetails = ({
                          title,
                          dataType,
                          segments,
                          chartColor,
                          storageKey = '@garminData',
                          onSummaryUpdate,
                          initialDate
                      }) => {
    // State variables
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize with passed initialDate or current date
    const initDate = initialDate ? moment(initialDate) : moment();

    // Period states
    const [currentDay, setCurrentDay] = useState(initDate);
    const [currentWeekStart, setCurrentWeekStart] = useState(initDate.clone().startOf('week'));
    const [currentMonthStart, setCurrentMonthStart] = useState(initDate.clone().startOf('month'));

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
    // For line charts
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
                        "#0B3F6B"
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "steps",
                        "#0B3F6B"
                    );
                }
            } else if (dataType === 'intensity') {
                if (currentSegment === 'Week') {
                    processedData = processIntensityWeeklyData(
                        parsedData.data,
                        currentWeekStart,
                        "#0B3F6B"
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processIntensityMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "#0B3F6B"
                    );
                }
            } else if (dataType === 'floors') {
                if (currentSegment === 'Week') {
                    processedData = processWeeklyData(
                        parsedData.data,
                        currentWeekStart,
                        "floorsClimbed",
                        "#34511e"
                    );
                } else if (currentSegment === 'Month') {
                    processedData = processMonthlyData(
                        parsedData.data,
                        currentMonthStart,
                        "floorsClimbed",
                        "#34511e"
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
            updateSummary(processedData, parsedData.data);
        } catch (err) {
            setError('Failed to load data.');
            Alert.alert('Error', 'An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };

// Compute summary based on processed chartData.
    const updateSummary = (dataArr, rawData) => {
        const dayStr = currentDay.format("YYYY-MM-DD");

        if (dataType === 'hr' && currentSegment === 'Day') {
            const dayEntry = rawData.find(entry => entry.calendarDate === dayStr);
            if (dayEntry) {
                onSummaryUpdate && onSummaryUpdate({
                    averageHeartRateInBeatsPerMinute: dayEntry.data.averageHeartRateInBeatsPerMinute || 0,
                    restingHeartRateInBeatsPerMinute: dayEntry.data.restingHeartRateInBeatsPerMinute || 0,
                    minHeartRateInBeatsPerMinute: dayEntry.data.minHeartRateInBeatsPerMinute || 0,
                    maxHeartRateInBeatsPerMinute: dayEntry.data.maxHeartRateInBeatsPerMinute || 0
                });
            } else {
                // Return 0 for all summary values when there's no day entry.
                onSummaryUpdate && onSummaryUpdate({
                    averageHeartRateInBeatsPerMinute: 0,
                    restingHeartRateInBeatsPerMinute: 0,
                    minHeartRateInBeatsPerMinute: 0,
                    maxHeartRateInBeatsPerMinute: 0
                });
            }
            return;
        }


        if (dataType === 'stress' && currentSegment === 'Day') {
            // For stress daily view, compute the total stress duration and also send individual durations.
            const dayEntry = rawData.find(entry => entry.calendarDate === dayStr);
            if (dayEntry) {
                onSummaryUpdate && onSummaryUpdate({
                    restStressDurationInSeconds: dayEntry.data.restStressDurationInSeconds || 0,
                    lowStressDurationInSeconds: dayEntry.data.lowStressDurationInSeconds || 0,
                    mediumStressDurationInSeconds: dayEntry.data.mediumStressDurationInSeconds || 0,
                    highStressDurationInSeconds: dayEntry.data.highStressDurationInSeconds || 0,
                    maxStressLevel: dayEntry.data.maxStressLevel || 0,
                    averageStressLevel: dayEntry.data.averageStressLevel || 0
                });
            } else {
                // If no data is available for the day, return 0 for each summary field.
                onSummaryUpdate && onSummaryUpdate({
                    restStressDurationInSeconds: 0,
                    lowStressDurationInSeconds: 0,
                    mediumStressDurationInSeconds: 0,
                    highStressDurationInSeconds: 0,
                    maxStressLevel: 0,
                    averageStressLevel: 0
                });
            }
            return;
        }


        if (dataType === 'intensity') {
            // For Week and Month, compute averages over the period.
            let start, end;
            if (currentSegment === 'Week') {
                start = moment(currentWeekStart);
                end = moment(currentWeekStart).add(6, 'days');
            } else if (currentSegment === 'Month') {
                start = moment(currentMonthStart);
                end = moment(currentMonthStart).endOf('month');
            }
            // Filter rawData to only include entries within the current period.
            const filtered = rawData.filter(entry => {
                const entryDate = moment(entry.calendarDate);
                return entryDate.isSameOrAfter(start, 'day') && entryDate.isSameOrBefore(end, 'day');
            });
            // Sum the intensities over the filtered days.
            const totalVigorous = filtered.reduce((sum, entry) => sum + (entry.data.vigorousIntensityDurationInSeconds || 0), 0);
            const totalModerate = filtered.reduce((sum, entry) => sum + (entry.data.moderateIntensityDurationInSeconds || 0), 0);
            const daysCount = filtered.length;
            // Compute average (if there is any data; otherwise 0).
            const avgVigorous = daysCount > 0 ? Math.round(totalVigorous / daysCount) : 0;
            const avgModerate = daysCount > 0 ? Math.round(totalModerate / daysCount) : 0;
            onSummaryUpdate && onSummaryUpdate({
                vigorousIntensityDurationInSeconds: avgVigorous,
                moderateIntensityDurationInSeconds: avgModerate
            });
            return;
        }

        // For other cases, ignore entries with a value of 0.
        const validData = dataArr.filter(item => item.value !== 0);
        let periodValue = 0;
        if (validData.length > 0) {
            periodValue = validData.reduce((acc, cur) => acc + cur.value, 0) / validData.length;
        }
        periodValue = Math.round(periodValue);

        onSummaryUpdate && onSummaryUpdate(periodValue);
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
                Alert.alert('Navigation Error', 'Cannot navigate to future days.');
                return;
            }
            setCurrentDay(nextDay);
        } else if (currentSegment === 'Week') {
            const nextWeek = moment(currentWeekStart).add(1, 'week');
            if (nextWeek.isAfter(moment().startOf('week'))) {
                Alert.alert('Navigation Error', 'Cannot navigate to future weeks.');
                return;
            }
            setCurrentWeekStart(nextWeek);
        } else if (currentSegment === 'Month') {
            const nextMonth = moment(currentMonthStart).add(1, 'month');
            if (nextMonth.isAfter(moment().startOf('month'))) {
                Alert.alert('Navigation Error', 'Cannot navigate to future months.');
                return;
            }
            setCurrentMonthStart(nextMonth);
        }
    };

    const handleSegmentChange = (index) => {
        setSelectedIndex(index);
        setIsLoading(true);
        const seg = segments[index];

        // When changing segments, maintain the selected date context
        if (seg === 'Day') {
            // Keep the currentDay as is since it was initialized with the selected date
        } else if (seg === 'Week') {
            // Set to the week containing the selected day
            setCurrentWeekStart(currentDay.clone().startOf('week'));
        } else if (seg === 'Month') {
            // Set to the month containing the selected day
            setCurrentMonthStart(currentDay.clone().startOf('month'));
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

    // Generate tooltip text based on dataType and currentSegment
    const generateTooltipText = (data, index) => {
        if (!data) return '';

        const getDateLabel = () => {
            if (currentSegment === 'Day') {
                const hourLabel = data.label || index;
                return moment().startOf('day').add(hourLabel, 'hours').format('HH:mm');
            } else if (currentSegment === 'Week') {
                return moment(data.label, 'ddd').format('dddd');
            } else if (currentSegment === 'Month') {
                const dayNum = data.label || index + 1;
                return moment(currentMonthStart).date(dayNum).format('D MMMM');
            }
            return '';
        };

        const dateLabel = getDateLabel();
        let valueLabel = '';

        // Determine value label based on data type
        switch (dataType) {
            case 'hr':
                valueLabel = `Average HR: ${data.value} bpm`;
                break;
            case 'kcal':
                valueLabel = `Kcal: ${data.value}`;
                break;
            case 'steps':
                valueLabel = `Steps: ${data.value}`;
                break;
            case 'floors':
                valueLabel = `Floors: ${data.value}`;
                break;
            case 'stress':
                valueLabel = `Average Stress: ${data.value}`;
                break;
            case 'intensity':
                valueLabel = `Total intensity: ${data.value} s`;
                break;
            default:
                valueLabel = `Value: ${data.value}`;
        }

        return `${dateLabel}\n${valueLabel}`;
    };

    // Render tooltip component with dynamic positioning
    const renderTooltip = () => {
        if (!tooltipVisible || !tooltipData) return null;

        const screenWidth = Dimensions.get('window').width;
        const tooltipWidth = 155;
        let adjustedLeft = tooltipLeft;

        // Adjust tooltip position to stay within screen bounds
        if (adjustedLeft < 0) adjustedLeft = 5;
        if (adjustedLeft + tooltipWidth > screenWidth)
            adjustedLeft = screenWidth - tooltipWidth - 5;

        const tooltipText = generateTooltipText(tooltipData, tooltipIndex);

        return (
            <Modal transparent animationType="fade">
                <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={() => setTooltipVisible(false)}>
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
                        <Text style={{fontWeight: 'bold'}}>{tooltipText}</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    if (isLoading) {
        return (
            <Frame style={styles.loadingFrame}>
                <ActivityIndicator size="large" color={chartColor}/>
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
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000"/>
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} color="#000"/>
                </TouchableOpacity>
            </View>
            <Text style={styles.dateRangeText}>{getDateRange()}</Text>
            <SegmentedControl
                style={styles.segmentedControl}
                values={segments}
                selectedIndex={selectedIndex}
                onChange={(event) => handleSegmentChange(event.nativeEvent.selectedSegmentIndex)}
                tintColor={chartColor}
                backgroundColor="lightgray"
            />
            {dataType === 'stress' && currentSegment === 'Day' ? (
                chartData && chartData.length > 0 ? (
                    // Check if every metric in the chartData has a value of 0.
                    chartData.every(item => item.value === 0) ? (
                        <View style={styles.chartContainer}>
                            <Text style={styles.noDataText}>Not enough data available</Text>
                        </View>
                    ) : (
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
                    )
                ) : (
                    <View style={styles.chartContainer}>
                        <Text style={styles.noDataText}>No stress data available</Text>
                    </View>
                )
            ) : (
                <View style={styles.graphContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {dataType === 'hr' && currentSegment === 'Day' ? (
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
                                minHeight={4}
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
            {!(dataType === 'stress' && currentSegment === 'Day') && renderTooltip()}
        </Frame>
    );
};

export default ChartDetails;

