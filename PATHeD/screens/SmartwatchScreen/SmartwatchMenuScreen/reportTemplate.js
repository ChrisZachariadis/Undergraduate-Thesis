export const getReportHTML = (fromDate, toDate, filteredEntries, chartImages = {}, selectedMonths = []) => {
    // Format month for display (YYYY-MM to Month YYYY)
    const formatMonthDisplay = (monthStr) => {
        const [year, month] = monthStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, 1);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    // Generate the chart sections for each month - one chart per page
    const generateMonthlyChartSections = () => {
        let chartsHTML = '';

        selectedMonths.forEach(month => {
            const formattedMonth = formatMonthDisplay(month);

            // Heart Rate Chart
            if (chartImages.hr && chartImages.hr[month]) {
                chartsHTML += `
                <div class="chart-container">
                    <h2>${formattedMonth}</h2>
                    <div class="chart-item">
                        <div class="chart-title">Heart Rate Summary</div>
                        <div class="chart-wrapper">
                            <img src="${chartImages.hr[month]}" alt="Heart Rate Chart for ${formattedMonth}" />
                        </div>
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            // Steps Chart
            if (chartImages.steps && chartImages.steps[month]) {
                chartsHTML += `
                <div class="chart-container">
                    <h2>${formattedMonth}</h2>
                    <div class="chart-item">
                        <div class="chart-title">Steps Summary</div>
                        <div class="chart-wrapper">
                            <img src="${chartImages.steps[month]}" alt="Steps Chart for ${formattedMonth}" />
                        </div>
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            // Floors Chart
            if (chartImages.floors && chartImages.floors[month]) {
                chartsHTML += `
                <div class="chart-container">
                    <h2>${formattedMonth}</h2>
                    <div class="chart-item">
                        <div class="chart-title">Floors Summary</div>
                        <div class="chart-wrapper">
                            <img src="${chartImages.floors[month]}" alt="Floors Chart for ${formattedMonth}" />
                        </div>
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            // Stress Chart
            if (chartImages.stress && chartImages.stress[month]) {
                chartsHTML += `
                <div class="chart-container">
                    <h2>${formattedMonth}</h2>
                    <div class="chart-item">
                        <div class="chart-title">Stress Summary</div>
                        <div class="chart-wrapper">
                            <img src="${chartImages.stress[month]}" alt="Stress Chart for ${formattedMonth}" />
                        </div>
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            // Intensity Chart
            if (chartImages.intensity && chartImages.intensity[month]) {
                chartsHTML += `
                <div class="chart-container">
                    <h2>${formattedMonth}</h2>
                    <div class="chart-item">
                        <div class="chart-title">Intensity Summary</div>
                        <div class="chart-wrapper">
                            <img src="${chartImages.intensity[month]}" alt="Intensity Chart for ${formattedMonth}" />
                        </div>
                    </div>
                </div>
                <div class="page-break"></div>`;
            }

            // Kcal Chart
            if (chartImages.kcal && chartImages.kcal[month]) {
                chartsHTML += `
                <div class="chart-container">
                    <h2>${formattedMonth}</h2>
                    <div class="chart-item">
                        <div class="chart-title">Kilocalories Summary</div>
                        <div class="chart-wrapper">
                            <img src="${chartImages.kcal[month]}" alt="Kilocalories Chart for ${formattedMonth}" />
                        </div>
                    </div>
                </div>
                ${month !== selectedMonths[selectedMonths.length - 1] || Object.keys(chartImages).some(type =>
                    chartImages[type] && chartImages[type][month]) ? '<div class="page-break"></div>' : ''}`;
            }
        });

        return chartsHTML;
    };

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Smartwatch metrics report from ${fromDate} to ${toDate}</title>
        <style>
          /* Global Styles (Google Fonts and CSS Variables removed) */
          
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0;
            color: #333;
            line-height: 1.6;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Header */
          .report-header {
            text-align: center;
            padding: 40px 20px;
            color: #333;
            margin-bottom: 30px;
          }
          
          h1 { 
            font-size: 36px; 
            margin: 0;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: #2c3e50;
          }
          
          h2 { 
            font-size: 24px; 
            color: #154360;
            border-bottom: 2px solid #154360;
            padding-bottom: 8px;
            margin-top: 20px;
            text-align: center;
          }
          
          h3 {
            font-size: 20px;
            color: #7f8c8d;
            margin-top: 15px;
          }
          
          /* Page breaks */
          .first-page { 
            page-break-after: always; 
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 80vh;
            text-align: center;
            border: 2px solid #154360;
            border-radius: 10px;
            margin: 20px auto;
            padding: 40px;
            max-width: 800px;
            background-color: #f9f9f9;
          }
          .page-break { page-break-after: always; height: 0; }
          
          /* Second page with data */
          .data-section {
            margin-bottom: 40px;
            padding: 25px;
          }
          
          /* Tables */
          table { 
            border-collapse: collapse; 
            width: 100%;
            font-size: 13px;
            margin: 20px 0;
            background-color: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 6px;
            overflow: hidden;
          }
          
          th, td { 
            padding: 12px 8px; 
            text-align: left;
            border: 1px solid #ddd;
          }
          
          th { 
            background-color: #154360;
            color: white;
            font-weight: 500;
            position: sticky;
            top: 0;
          }
          
          tr:nth-child(even) {
            background-color: #f5f5f5;
          }
          
          /* Charts */
          .chart-container {
            display: flex;
            flex-direction: column;
            align-items: center; 
            height: 85vh;
            justify-content: center;
            padding: 20px;
            page-break-inside: avoid;
            margin-bottom: 30px;
          }
          
          /* More compact month header within chart container */
          .chart-container h2 {
            font-size: 20px;
            margin: 5px 0;
            border: none;
          }
          
          .chart-item {
            width: 90%;
            height: 85vh;
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
          }
          
          .chart-title {
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            margin: 5px 0;
            color: #154360;
          }
          
          .chart-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            padding: 5px;
            height: 100%;
          }
          
          .chart-wrapper img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
          }
          
          /* Footer */
          .report-footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 40px;
            padding: 15px;
            border-top: 1px solid #ddd;
          }
          
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .chart-container {
              box-shadow: none;
              border: 1px solid #eee;
            }
            
            .chart-wrapper {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <!-- First page: Cover page with title and date period -->
        <div class="first-page">
          <h1>Smartwatch Metrics Report</h1>
          <h2 style="border-bottom: none;">From ${fromDate} to ${toDate}</h2>
          <h3>Analyzed Months: ${selectedMonths.map(formatMonthDisplay).join(', ')}</h3>
        </div>

        <!-- Second page: Table with report data -->
        <div class="data-section">
          <h2>Data Summary</h2>
          <div style="overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th>Calendar Date</th>
                  <th>Steps</th>
                  <th>Floors Climbed</th>
                  <th>Max Stress Level</th>
                  <th>BMR Kilocalories</th>
                  <th>Average Stress Level</th>
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
                        <td>${d.averageStressLevel}</td>
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
        </div>
        
        <!-- Page break before charts -->
        <div class="page-break"></div>
        
        <!-- Monthly Charts Sections - One chart per page -->
        ${generateMonthlyChartSections()}
        
        <!-- Footer -->
        <div class="report-footer">
          Report generated on ${new Date().toLocaleDateString()} • PATHeD
        </div>
      </body>
    </html>
  `;
};
