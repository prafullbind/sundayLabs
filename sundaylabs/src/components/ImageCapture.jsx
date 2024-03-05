import React, { useState, useRef } from 'react';

const ImageCapture = ({ onCapture }) => {
    const [capturedImage, setCapturedImage] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    const videoRef = useRef();

  // Function to start the camera
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
      })
      .catch(error => console.error('Error accessing camera:', error));
  };

   // Function to stop the camera
   const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  };  

  // Function to capture an image
  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL('image/png');
    setCapturedImage(imgData);
    onCapture(imgData)
    stopCamera();
  };

  const handleRetry = () => {
    setCapturedImage(null);
    onCapture(null)
  }

    // Start the camera when the component mounts
    React.useEffect(() => {
        startCamera();
        return () => {
            stopCamera(); // Cleanup: stop the camera when the component unmounts
          };
      }, [capturedImage]);

  return (
    <div className='flex flex-col justify-center items-center m-4'>
      <h2 className='text-xl m-2'>Capture Image:</h2>
      <div>
        {!capturedImage && <video ref={videoRef} autoPlay></video>}
      </div>
      <div>
        {capturedImage && <img src={capturedImage} alt="Captured" />}
        {!capturedImage && <button className='bg-blue-600 text-white px-6 py-2 rounded m-4' onClick={captureImage}>Capture Image</button>}
        {capturedImage && <button className='bg-blue-600 text-white px-6 py-2 rounded m-4' onClick={() => handleRetry()}>Retry again</button>}
      </div>
    </div>
  );
};

export default ImageCapture;
