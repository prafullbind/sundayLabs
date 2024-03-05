
-- Table structure for table `croImage`
--Database name: sundaylabs

CREATE TABLE cropImage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    qualitySeeds VARCHAR(200),
    soilManage VARCHAR(255),
    irrigationManage VARCHAR(255),
    diseaseControl VARCHAR(255),
    imageData TEXT
);
