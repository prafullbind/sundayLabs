import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';



const ReportDisplay = ({ report }) => {

  const [reportData, setReportData] = useState(null);


  const getReport = async() => {
    // if(!report.insertId) return;
    try{
   let response = await axios.get(`http://localhost:2410/getDataById/${report.insertId}`);
   let {data} = response;
   setReportData(data);
   console.log("reportData", data);
    }
    catch(ex){
      console.log(ex);
    }
  }

  const generatePDF = () => {
    if (!reportData) {
      console.error('No data to generate PDF');
      return;
    }
  
    const doc = new jsPDF();
    doc.text('Crop Detail:', 10, 10);
    doc.text(`Quality Seeds : ${reportData.qualitySeeds}`, 10, 20);
    doc.text(`Soil Management : ${reportData.soilManage}`, 10, 30);
    doc.text(`Irrigation Management : ${reportData.irrigationManage}`, 10, 40);
    doc.text(`Disease Control : ${reportData.diseaseControl}`, 10, 50);
    doc.save('report'+'-'+ Date.now()+'.pdf');

  };
  
  useEffect(()=>{
   getReport();
  },[report.insertId])


  return (
    <div>
      <h2 className='text-2xl font-bold text-green-400'>Report:</h2>
      {reportData?.id &&
      <>
      <p className='text-xl'><strong>Quality Seeds: </strong>{reportData.qualitySeeds}</p>
      <p className='text-xl'><strong>Irrigation Manage:</strong> {reportData.irrigationManage}</p>
      <p className='text-xl'><strong>Soil Manage:</strong> {reportData.soilManage}</p>
      <p className='text-xl'><strong>Disease Control:</strong> {reportData.diseaseControl}</p>
      <div className='text-center m-4'><button className='bg-blue-600 p-2 rounded text-white' onClick={() => generatePDF()}>Download Report</button></div>
     </>
}
    </div>
  );
};

export default ReportDisplay;
