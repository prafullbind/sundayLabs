
-- Table structure for table `cropImage`
--Database name: sundaylabs
DROP TABLE IF EXISTS `cropImage`;
CREATE TABLE cropImage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    qualitySeeds VARCHAR(200),
    soilManage VARCHAR(255),
    irrigationManage VARCHAR(255),
    diseaseControl VARCHAR(255),
    imageData TEXT
);
