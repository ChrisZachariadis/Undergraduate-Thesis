export const getReportHTML = (fromDate, toDate, filteredEntries, chartImages = {}, selectedMonths = []) => {
    // Format month for display (YYYY-MM to Month YYYY)
    const formatMonthDisplay = (monthStr) => {
        const [year, month] = monthStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, 1);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    // Generate the chart sections for each month
    const generateMonthlyChartSections = () => {
        return selectedMonths.map(month => {
            const formattedMonth = formatMonthDisplay(month);
            return `
            <div class="month-section">
                <h2>${formattedMonth} Charts</h2>
                <div class="chart-container">
                    ${chartImages.hr && chartImages.hr[month] ? `
                    <div class="chart-item">
                        <div class="chart-title">Heart Rate Summary</div>
                        <img src="${chartImages.hr[month]}" alt="Heart Rate Chart for ${formattedMonth}" />
                    </div>` : ''}
                    
                    ${chartImages.steps && chartImages.steps[month] ? `
                    <div class="chart-item">
                        <div class="chart-title">Steps Summary</div>
                        <img src="${chartImages.steps[month]}" alt="Steps Chart for ${formattedMonth}" />
                    </div>` : ''}
                    
                    ${chartImages.floors && chartImages.floors[month] ? `
                    <div class="chart-item">
                        <div class="chart-title">Floors Summary</div>
                        <img src="${chartImages.floors[month]}" alt="Floors Chart for ${formattedMonth}" />
                    </div>` : ''}
                    
                    ${chartImages.stress && chartImages.stress[month] ? `
                    <div class="chart-item">
                        <div class="chart-title">Stress Summary</div>
                        <img src="${chartImages.stress[month]}" alt="Stress Chart for ${formattedMonth}" />
                    </div>` : ''}
                    
                    ${chartImages.intensity && chartImages.intensity[month] ? `
                    <div class="chart-item">
                        <div class="chart-title">Intensity Summary</div>
                        <img src="${chartImages.intensity[month]}" alt="Intensity Chart for ${formattedMonth}" />
                    </div>` : ''}
                    
                    ${chartImages.kcal && chartImages.kcal[month] ? `
                    <div class="chart-item">
                        <div class="chart-title">Kilocalories Summary</div>
                        <img src="${chartImages.kcal[month]}" alt="Kilocalories Chart for ${formattedMonth}" />
                    </div>` : ''}
                </div>
            </div>
            <div class="page-break"></div>
            `;
        }).join('');
    };

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Smartwatch metrics report from ${fromDate} to ${toDate}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          h2 { color: #555; }
          /* Ensure a page break after the first section */
          .first-page { page-break-after: always; }
          .page-break { page-break-after: always; }
          .month-section { 
            margin-top: 30px; 
            page-break-inside: avoid;
          }
          .chart-container { 
            display: flex; 
            flex-wrap: wrap; 
            justify-content: center; 
            gap: 20px;
            margin-top: 20px;
          }
          .chart-item {
            width: 45%;
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .chart-item img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
          }
          .chart-title {
            text-align: center;
            font-weight: bold;
            margin-bottom: 5px;
          }
          table { border-collapse: collapse; width: 100%; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 4px; text-align: left; }
          th { background-color: #f2f2f2; }
          pre { white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <!-- First page: Cover page with title and date period -->
        <div class="first-page">
          <h1>Smartwatch metrics report</h1>
          <h2>from ${fromDate} to ${toDate}</h2>
          <h3>Analyzed Months: ${selectedMonths.map(formatMonthDisplay).join(', ')}</h3>
        </div>

        <!-- Second page: Table with report data -->
        <div class="second-page">
          <h2>Data Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Calendar Date</th>
                <th>Steps</th>
                <th>Floors Climbed</th>
                <th>Max Stress Level</th>
                <th>BMR Kilocalories</th>
                <th>Floors Climbed Goal</th>
                <th>Average Stress Level</th>
                <th>Max HR (bpm)</th>
                <th>Min HR (bpm)</th>
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
                      <td>${d.floorsClimbed}</td>
                      <td>${d.maxStressLevel}</td>
                      <td>${d.bmrKilocalories}</td>
                      <td>${d.floorsClimbedGoal}</td>
                      <td>${d.averageStressLevel}</td>
                      <td>${d.maxHeartRateInBeatsPerMinute}</td>
                      <td>${d.minHeartRateInBeatsPerMinute}</td>
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
        </div>
        
        <!-- Monthly Charts Sections -->
        <div class="page-break"></div>
        ${generateMonthlyChartSections()}
      </body>
    </html>
  `;
};
