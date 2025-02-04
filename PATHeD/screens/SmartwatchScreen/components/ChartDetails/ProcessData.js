import moment from "moment/moment";

// HR Daily: Groups 15-sec HR samples into hourly averages.
const processHRDailyData = (data, dayMoment) => {
    const dayStr = dayMoment.format("YYYY-MM-DD");
    const dayEntry = data.find((entry) => entry.calendarDate === dayStr);
    if (!dayEntry) {
        let emptyData = [];
        for (let h = 0; h < 24; h++) {
            emptyData.push({
                value: 0,
                label: (h % 3 === 0 || h === 23) ? h.toString() : '',
                frontColor: 'lightgrey'
            });
        }
        return emptyData;
    }
    const hrSamples = dayEntry.data.timeOffsetHeartRateSamples;
    const startTime = dayEntry.data.startTimeInSeconds;
    const startOffset = dayEntry.data.startTimeOffsetInSeconds;
    let hourlySamples = {};
    for (const offsetStr in hrSamples) {
        if (hrSamples.hasOwnProperty(offsetStr)) {
            const sampleValue = hrSamples[offsetStr];
            const sampleOffset = parseInt(offsetStr, 10);
            const totalSeconds = startTime + startOffset + sampleOffset;
            const sampleHour = moment.unix(totalSeconds).utc().hour();
            if (!hourlySamples[sampleHour]) {
                hourlySamples[sampleHour] = [];
            }
            hourlySamples[sampleHour].push({ offset: sampleOffset, hr: sampleValue });
        }
    }
    let hourData = [];
    for (let h = 0; h < 24; h++) {
        const samples = hourlySamples[h] || [];
        let avg = 0;
        if (samples.length > 0) {
            const sum = samples.reduce((acc, cur) => acc + cur.hr, 0);
            avg = Math.round(sum / samples.length);
        }
        hourData.push({
            value: avg,
            label: (h % 3 === 0 || h === 23) ? h.toString() : '',
            frontColor: getHRBarColor(avg)
        });
    }
    return hourData;
};

// If getHRBarColor is defined elsewhere in the file, ensure it's available.
const getHRBarColor = (hr) => {
    return hr <= 20 ? 'grey' : '#FF6347';
};


// Stress Daily: Process stress durations into pie chart data.
const processStressDailyData = (data, dayMoment) => {
    const dayStr = dayMoment.format("YYYY-MM-DD");
    const dayEntry = data.find((entry) => entry.calendarDate === dayStr);
    if (!dayEntry) return [];
    const d = dayEntry.data;
    const rest = Math.round(d.restStressDurationInSeconds / 60);
    const low = Math.round(d.lowStressDurationInSeconds / 60);
    const medium = Math.round(d.mediumStressDurationInSeconds / 60);
    const high = Math.round(d.highStressDurationInSeconds / 60);
    return [
        { value: rest, label: 'Rest', color: '#1976D2' },
        { value: low, label: 'Low', color: '#FFB74D' },
        { value: medium, label: 'Medium', color: '#FB8C00' },
        { value: high, label: 'High', color: '#E65100' }
    ];
};


// Combined weekly processing for hr, kcal, steps, floors, and stress (average).
const processWeeklyData = (data, weekStart, field, colorOption) => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = moment(weekStart).add(i, 'days');
        const dayName = day.format('ddd');
        const dayData = data.find((entry) => entry.calendarDate === day.format('YYYY-MM-DD'));
        let value = dayData ? dayData.data[field] : 0;
        let frontColor = 'lightgrey';
        if (dayData) {
            frontColor =
                typeof colorOption === 'function'
                    ? colorOption(dayData.data[field])
                    : colorOption;
        }
        weekDays.push({
            value,
            label: dayName,
            frontColor
        });
    }
    return weekDays;
};

// Combined monthly processing for hr, kcal, steps, floors, and stress (average).
const processMonthlyData = (data, monthStart, field, colorOption) => {
    const daysInMonth = monthStart.daysInMonth();
    const monthData = [];
    for (let i = 1; i <= daysInMonth; i++) {
        const day = moment(monthStart).date(i);
        const dayData = data.find((entry) => entry.calendarDate === day.format('YYYY-MM-DD'));
        let value = dayData ? dayData.data[field] : 0;
        let frontColor = 'lightgrey';
        if (dayData) {
            frontColor =
                typeof colorOption === 'function'
                    ? colorOption(dayData.data[field])
                    : colorOption;
        }
        monthData.push({
            value,
            label: (i === 1 || (i - 1) % 3 === 0 || i === daysInMonth) ? day.format('D') : '',
            frontColor
        });
    }
    return monthData;
};

const processIntensityWeeklyData = (data, weekStart, colorOption) => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = moment(weekStart).add(i, 'days');
        const dayName = day.format('ddd');
        const dayData = data.find(entry => entry.calendarDate === day.format('YYYY-MM-DD'));
        // Sum the two intensity durations. If no data exists, default to 0.
        const vigorous = dayData ? (dayData.data.vigorousIntensityDurationInSeconds || 0) : 0;
        const moderate = dayData ? (dayData.data.moderateIntensityDurationInSeconds || 0) : 0;
        const total = vigorous + moderate;
        let frontColor = 'lightgrey';
        if (dayData) {
            frontColor =
                typeof colorOption === 'function'
                    ? colorOption(total)
                    : colorOption;
        }
        weekDays.push({
            value: total,
            label: dayName,
            frontColor
        });
    }
    return weekDays;
};

// New function: Process intensity data for a month by summing vigorous and moderate durations.
const processIntensityMonthlyData = (data, monthStart, colorOption) => {
    const daysInMonth = monthStart.daysInMonth();
    const monthData = [];
    for (let i = 1; i <= daysInMonth; i++) {
        const day = moment(monthStart).date(i);
        const dayData = data.find(entry => entry.calendarDate === day.format('YYYY-MM-DD'));
        const vigorous = dayData ? (dayData.data.vigorousIntensityDurationInSeconds || 0) : 0;
        const moderate = dayData ? (dayData.data.moderateIntensityDurationInSeconds || 0) : 0;
        const total = vigorous + moderate;
        let frontColor = 'lightgrey';
        if (dayData) {
            frontColor =
                typeof colorOption === 'function'
                    ? colorOption(total)
                    : colorOption;
        }
        monthData.push({
            value: total,
            label: (i === 1 || (i - 1) % 3 === 0 || i === daysInMonth) ? day.format('D') : '',
            frontColor
        });
    }
    return monthData;
};

export {
    processHRDailyData,
    processStressDailyData,
    processWeeklyData,
    processMonthlyData,
    getHRBarColor,
    processIntensityWeeklyData,
    processIntensityMonthlyData
};
