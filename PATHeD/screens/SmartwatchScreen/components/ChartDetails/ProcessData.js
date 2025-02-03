import moment from "moment/moment";

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

export { processHRDailyData };
