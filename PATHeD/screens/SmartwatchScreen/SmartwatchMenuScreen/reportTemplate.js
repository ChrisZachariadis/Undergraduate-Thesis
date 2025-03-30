export const getReportHTML = (fromDate, toDate, filteredEntries, chartImages = {}) => {
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
          .chart-section { margin-top: 30px; }
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
        </div>

        <!-- Second page: Table with report data -->
        <div class="second-page">
          <table>
            <thead>
              <tr>
                <th>Calendar Date (outer)</th>
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
          
          <!-- Charts Section -->
          <div class="chart-section">
            <h2>Charts and Visualizations</h2>
            <div class="chart-container">
              ${chartImages.hr ? `
                <div class="chart-item">
                  <div class="chart-title">Heart Rate Summary</div>
                  <img src="${chartImages.hr}" alt="Heart Rate Chart" />
                </div>` : ''}
              
              ${chartImages.steps ? `
                <div class="chart-item">
                  <div class="chart-title">Steps Summary</div>
                  <img src="${chartImages.steps}" alt="Steps Chart" />
                </div>` : ''}
              
              ${chartImages.floors ? `
                <div class="chart-item">
                  <div class="chart-title">Floors Summary</div>
                  <img src="${chartImages.floors}" alt="Floors Chart" />
                </div>` : ''}
              
              ${chartImages.stress ? `
                <div class="chart-item">
                  <div class="chart-title">Stress Summary</div>
                  <img src="${chartImages.stress}" alt="Stress Chart" />
                </div>` : ''}
              
              ${chartImages.intensity ? `
                <div class="chart-item">
                  <div class="chart-title">Intensity Summary</div>
                  <img src="${chartImages.intensity}" alt="Intensity Chart" />
                </div>` : ''}
              
              ${chartImages.kcal ? `
                <div class="chart-item">
                  <div class="chart-title">Kilocalories Summary</div>
                  <img src="${chartImages.kcal}" alt="Kilocalories Chart" />
                </div>` : ''}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
