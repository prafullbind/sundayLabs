import React from 'react';

const PastReports = ({ reports, onSelectReport }) => {
  return (
    <div>
      <h2>Past Reports:</h2>
      <table className='border border-collapse'>
        {reports.length > 0 && reports.map((report) => (
          <tr className='border text-center' key={report.id} onClick={() => onSelectReport(report)}>
            <td>{report.id}</td>
            <td>{report.qualitySeeds}</td>
            <td>{report.soilManage}</td>
            <td>{report.irrigationManage}</td>
            <td>{report.diseaseControl}</td>
          </tr>
        ))}
     </table>
    </div>
  );
};

export default PastReports;
