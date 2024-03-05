import React, { useEffect, useState } from 'react';
import CropSelection from './CropSelection';
import ImageCapture from './ImageCapture';
import LoadingAnimation from './LoadingAnimation';
import ReportDisplay from './ReportDisplay';
import PastReports from './PastReports';
import axios from 'axios';

const crops = [
  { id: 1, name: 'Crop 1' },
  { id: 2, name: 'Crop 2' },
  { id: 3, name: 'Crop 3' },
];

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');
  const [pastReports, setPastReports] = useState([]);

  const handleSelectCrop = (cropId) => {
    setSelectedCrop(cropId);
  };

  const handleCapture = (image) => {
    setCapturedImage(image);
  };

  const handleSubmit = async () => {
    // Implement submission logic
    setLoading(true);
    try{
    let response = await axios.post("http://localhost:2410/upload", {image:capturedImage});
    let {data} = response;

    console.log("data", data);

    setTimeout(() => {
      setLoading(false);
      alert("Report generated");
      setReport(data);
    }, 60000);
}
catch(ex){
    console.log(ex);
    setLoading(false);
}
  };


  const getAllReports = async() => {
     try{
      let response = await axios.get("/getData");
      let {data} = response;
      setPastReports(data);
     }
     catch(ex){
      console.log(ex);
     }
  }

  const handleSelectReport = (selectedReport) => {
    // Implement logic to display details of selected report
  };

  useEffect(() => {
    getAllReports();
  },[])
  return (
    <div className='flex flex-col justify-center items-center m-4'>
      <CropSelection crops={crops} selectedCrop={selectedCrop} onSelectCrop={handleSelectCrop} />
      {selectedCrop && <ImageCapture onCapture={handleCapture} />}
      {loading && <LoadingAnimation />}
      {capturedImage && <button className='bg-green-600 text-white px-6 py-2 rounded m-4' onClick={handleSubmit}>Submit</button>}
      {report && <ReportDisplay report={report} />}
      <PastReports reports={pastReports} onSelectReport={handleSelectReport} />
    </div>
  );
};

export default Index;
