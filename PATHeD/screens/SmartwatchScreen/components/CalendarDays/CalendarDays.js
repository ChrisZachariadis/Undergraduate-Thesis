import React, { useMemo } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PropTypes from 'prop-types';
import { styles } from './style';

const CalendarDays = ({ isVisible, onClose, allEntries, currentCalendarDate, onDateSelect }) => {
    // Create an object that marks the valid days for the calendar
    const markedDates = useMemo(() => {
        const dates = {};
        allEntries.forEach(entry => {
            dates[entry.calendarDate] = {
                marked: true,
                dotColor: '#0C6C79',
            };
        });
        if (currentCalendarDate) {
            dates[currentCalendarDate] = {
                ...dates[currentCalendarDate],
                selected: true,
                selectedColor: '#0C6C79',
            };
        }
        return dates;
    }, [allEntries, currentCalendarDate]);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.calendarContainer}>
                    <Calendar
                        markedDates={markedDates}
                        onDayPress={onDateSelect}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#2196F3',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#419bcd',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                        }}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                        accessibilityLabel="Close Calendar"
                        accessible={true}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

CalendarDays.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    allEntries: PropTypes.array.isRequired,
    currentCalendarDate: PropTypes.string,
    onDateSelect: PropTypes.func.isRequired,
};

export default CalendarDays;
