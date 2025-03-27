export const formatTimeFromSeconds = (seconds) => {
    if (!seconds) return { value: 0, unit: 'min' };

    const minutes = Math.round(seconds / 60);

    // If duration is more than 60 minutes (1 hour), convert to hours
    if (minutes >= 60) {
        return {
            value: (minutes / 60).toFixed(1),
            unit: 'hr'
        };
    }

    return {
        value: minutes,
        unit: 'min'
    };
};
