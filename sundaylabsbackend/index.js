const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET, OPTIONS, PATCH, HEAD");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var cors = require('cors')
app.use(cors())


// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sundaylabs",
});

const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));


// Multer configuration to handle image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
  }
  console.log('Connected to MySQL database');
});

// Route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  const { image } = req.body;
  // Get the image data from req.file.buffer
  const imageData = Buffer.from(image, 'base64');
  //here taking static data
  let qualitySeeds = "Choosing seeds that are disease-resistant and well-suited to the climate will help to ensure a healthy crop.";
  let soilManage = "This includes testing the soil for nutrients and pH levels, and adding amendments as needed to create a healthy environment for plant growth.";
  let irrigationManage = "Providing the right amount of water at the right time is essential for crop quality.";
  let diseaseControl = "This can be done through a variety of methods, including biological control, cultural practices, and the use of pesticides.";

  const insertQuery = `INSERT INTO cropImage (qualitySeeds, soilManage, irrigationManage, diseaseControl, imageData) VALUES (?, ?, ?, ?, ?)`;
  const values = [qualitySeeds, soilManage, irrigationManage, diseaseControl, imageData];

  // Execute the query
  connection.query(insertQuery, values, (error, results, fields) => {
      if (error) {
          console.error('Error inserting data:', error);
          res.status(500).json({ error: 'Error saving image to database' });
          return;
      }
      res.status(200).json(results);
  });
});

// Route to get all data from the cropImage table
app.get('/getData', (req, res) => {
  const selectQuery = `SELECT * FROM cropImage`;

  connection.query(selectQuery, (error, results, fields) => {
      if (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Error fetching data from database' });
          return;
      }

      const processedResults = results.map(result => ({
          ...result,
          imageData: `data:image/png;base64,${result.imageData}`
      }));
      res.status(200).json(processedResults);
  });
});

// Route to get data by ID from the cropImage table
app.get('/getDataById/:id', (req, res) => {
  const id = req.params.id;
  const selectQuery = `SELECT * FROM cropImage WHERE id = ?`;

  connection.query(selectQuery, [id], (error, results, fields) => {
      if (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Error fetching data from database' });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ error: 'Data not found' });
          return;
      }
      const processedResult = {
          ...results[0],
          imageData: `data:image/png;base64,${results[0].imageData}`
      };

      res.status(200).json(processedResult);
  });
});


