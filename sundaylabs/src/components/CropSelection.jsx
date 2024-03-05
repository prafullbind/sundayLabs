import React from 'react';

const CropSelection = ({ crops, selectedCrop, onSelectCrop }) => {
  return (
    <div className='flex flex-col justify-center items-center m-4'>
      <h2 className='text-2xl font-bold m-3'>Select Crop:</h2>
      <select value={selectedCrop} className='border px-8 py-1 rounded' onChange={(e) => onSelectCrop(e.target.value)}>
        <option value=''>Select Crop</option>
        {crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CropSelection;
