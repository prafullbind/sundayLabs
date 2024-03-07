import React from 'react';

const PastReports = ({ reports, onSelectReport }) => {
  console.log("Image", reports);
  return (
    <div  className='flex flex-col justify-center items-center m-4'>
      <h2 className='text-2xl font-bold'>Past Reports:</h2>
      <table className='border border-collapse mt-2'>
        <tr className='border text-center font-bold'>
         <td className='border p-1'>Quality Seeds</td>
         <td className='border p-1'>Irrigation Manage</td>
         <td className='border p-1'>Soil Manage</td>
         <td className='border p-1'>Disease Control</td>
         <td className='border p-1'></td>
        </tr>
        {reports.length>0  && reports.map((report) => (
          <tr className='border text-center' key={report.id} onClick={() => onSelectReport(report)}>
            <td className='border p-1'>{report.qualitySeeds}</td>
            <td className='border p-1'>{report.soilManage}</td>
            <td className='border p-1'>{report.irrigationManage}</td>
            <td className='border p-1'>{report.diseaseControl}</td>
            {/* <td><img 
            src={report.imageData}
            alt="image" /></td> */}
          </tr>
        ))}
     </table>
    </div>
  );
};

export default PastReports;
