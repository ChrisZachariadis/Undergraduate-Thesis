export const getReportHTML = (fromDate, toDate, filteredEntries) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Report from ${fromDate} to ${toDate}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          table { border-collapse: collapse; width: 100%; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 4px; text-align: left; }
          th { background-color: #f2f2f2; }
          pre { white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <h1>Report from ${fromDate} to ${toDate}</h1>
        <table>
          <thead>
            <tr>
              <th>Calendar Date (outer)</th>
              <th>Steps</th>
<!--              <th>Steps Goal</th>-->
              <th>Floors Climbed</th>
              <th>Max Stress Level</th>
              <th>BMR Kilocalories</th>
              <th>Floors Climbed Goal</th>
              <th>Average Stress Level</th>
<!--              <th>Start Time (s)</th>-->
<!--              <th>Start Time Offset (s)</th>-->
<!--              <th>Low Stress Duration (s)</th>-->
<!--              <th>High Stress Duration (s)</th>-->
<!--              <th>Rest Stress Duration (s)</th>-->
              <th>Max HR (bpm)</th>
              <th>Min HR (bpm)</th>
<!--              <th>Medium Stress Duration (s)</th>-->
              <th>Average HR (bpm)</th>
              <th>Resting HR (bpm)</th>
              <th>Moderate Intensity (s)</th>
              <th>Vigorous Intensity (s)</th>
            </tr>
          </thead>
          <tbody>
            ${filteredEntries
        .map(entry => {
            const d = entry.data;
            return `
                  <tr>
                    <td>${entry.calendarDate}</td>
                    <td>${d.steps}</td>
<!--                    <td>${d.stepsGoal}</td>-->
                    <td>${d.floorsClimbed}</td>
                    <td>${d.maxStressLevel}</td>
                    <td>${d.bmrKilocalories}</td>
                    <td>${d.floorsClimbedGoal}</td>
                    <td>${d.averageStressLevel}</td>
<!--                    <td>${d.startTimeInSeconds}</td>-->
<!--                    <td>${d.startTimeOffsetInSeconds}</td>-->
<!--                     <td>${d.lowStressDurationInSeconds}</td>-->
<!--                     <td>${d.highStressDurationInSeconds}</td>-->
<!--                     <td>${d.restStressDurationInSeconds}</td>-->
                    <td>${d.maxHeartRateInBeatsPerMinute}</td>
                    <td>${d.minHeartRateInBeatsPerMinute}</td>
<!--                    <td>${d.mediumStressDurationInSeconds}</td>-->
                    <td>${d.averageHeartRateInBeatsPerMinute}</td>
                    <td>${d.restingHeartRateInBeatsPerMinute}</td>
                    <td>${d.moderateIntensityDurationInSeconds}</td>
                    <td>${d.vigorousIntensityDurationInSeconds}</td>
                  </tr>
                `;
        })
        .join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;
};
