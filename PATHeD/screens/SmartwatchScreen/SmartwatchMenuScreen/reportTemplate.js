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
            let chartSections = `<h2>${formattedMonth} Charts</h2>`;

            // Add each chart in its own section with page break
            if (chartImages.hr && chartImages.hr[month]) {
                chartSections += `
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title">Heart Rate Summary</div>
                        <img src="${chartImages.hr[month]}" alt="Heart Rate Chart for ${formattedMonth}" />
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            if (chartImages.steps && chartImages.steps[month]) {
                chartSections += `
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title">Steps Summary</div>
                        <img src="${chartImages.steps[month]}" alt="Steps Chart for ${formattedMonth}" />
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            if (chartImages.floors && chartImages.floors[month]) {
                chartSections += `
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title">Floors Summary</div>
                        <img src="${chartImages.floors[month]}" alt="Floors Chart for ${formattedMonth}" />
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            if (chartImages.stress && chartImages.stress[month]) {
                chartSections += `
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title">Stress Summary</div>
                        <img src="${chartImages.stress[month]}" alt="Stress Chart for ${formattedMonth}" />
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            if (chartImages.intensity && chartImages.intensity[month]) {
                chartSections += `
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title">Intensity Summary</div>
                        <img src="${chartImages.intensity[month]}" alt="Intensity Chart for ${formattedMonth}" />
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            if (chartImages.kcal && chartImages.kcal[month]) {
                chartSections += `
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title">Kilocalories Summary</div>
                        <img src="${chartImages.kcal[month]}" alt="Kilocalories Chart for ${formattedMonth}" />
                    </div>
                </div>
                ${month !== selectedMonths[selectedMonths.length-1] ? '<div class="page-break"></div>' : ''}`;
            }

            return chartSections;
        }).join('');
    };

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Smartwatch metrics report from ${fromDate} to ${toDate}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          h1 { color: #2c3e50; }
          h2 { color: #154360; }
          h3 { color: #555; }
          
          /* Cover page styling */
          .first-page { 
            page-break-after: always; 
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 90vh;
            border: 2px solid #154360;
            border-radius: 10px;
            margin: 20px auto;
            padding: 40px;
            max-width: 800px;
            background-color: #f9f9f9;
          }
          
          .first-page h1 {
            font-size: 36px;
            margin-bottom: 20px;
            color: #2c3e50;
          }
          
          .first-page h2 {
            font-size: 24px;
            margin-bottom: 30px;
            color: #154360;
          }
          
          .first-page h3 {
            font-size: 20px;
            color: #7f8c8d;
          }
          
          .page-break { page-break-after: always; }
          
          .second-page {
            margin-top: 40px;
            margin-bottom: 40px;
          }
          
          .month-section { 
            margin-top: 40px; 
            page-break-inside: avoid;
          }
          
          .chart-container { 
            display: flex; 
            flex-direction: column;
            align-items: center; 
            height: 90vh;
            min-height: 800px;
            justify-content: center;
            margin: 0;
            padding: 0;
          }
          
          .chart-item {
            width: 90%;
            height: 85vh;
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 10px;
            border-radius: 8px;
            background-color: white;
          }
          
          .chart-item img {
            max-width: 100%;
            width: 100%;
            height: 100%;
            object-fit: contain;
            border: 1px solid #ddd;
            border-radius: 5px;
            flex-grow: 1;
          }
          
          .chart-title {
            text-align: center;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;
            color: #2c3e50;
            padding: 5px;
          }
          
          table { 
            border-collapse: collapse; 
            width: 100%; 
            font-size: 12px; 
            margin-top: 20px;
          }
          
          th, td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: left; 
          }
          
          th { 
            background-color: #154360; 
            color: white;
          }
          
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          
          pre { white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <!-- First page: Cover page with title and date period -->
        <div class="first-page">
          <h1>Smartwatch Metrics Report</h1>
          <h2>From ${fromDate} to ${toDate}</h2>
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

