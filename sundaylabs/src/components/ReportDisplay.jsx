import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';



const ReportDisplay = ({ report }) => {

  const generatePDF = () => {
    if (!report) {
      console.error('No data to generate PDF');
      return;
    }
  
    const doc = new jsPDF();
    doc.text('Data:', 10, 10);
    doc.text(`Quality Seeds: ${report.qualitySeeds}`, 10, 20);
    doc.text(`Soil Management: ${report.soilManage}`, 10, 30);
    doc.text(`Irrigation Management: ${report.irrigationManage}`, 10, 40);
    doc.text(`Disease Control: ${report.diseaseControl}`, 10, 50);
  
    // Add image to PDF
    const img = new Image();
    img.src = report.imageData;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURI = canvas.toDataURL('image/jpeg');
      doc.addImage(dataURI, 'JPEG', 150, 10, 50, 50); // Adjust the position and size as needed
      doc.save('data.pdf');
    };
  };
  
  useEffect(()=>{
   generatePDF();
  },[])


  return (
    <div>
      <h2>Report:</h2>
    </div>
  );
};

export default ReportDisplay;
