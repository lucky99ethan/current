const express = require('express');
const mysql = require('mysql2'); // Replace 'mysql' with 'mysql2'
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});


//This acts as the front end**********//************ */


// Data to be sent

//this is the req.body sent to the db
const Data = {
  username: "ally",
  email: "123@gmail.com",
  password: "kombe",
};



// function for testing the post data
const axios = require('axios');

axios.post("http://localhost:5000/api/Post", Data)
  .then((response) => {
    console.log("Data sent:", response.data);
  })
  .catch((error) => {
    if (error) {
      console.log("error:", error);
    }
  });


  //*************************************************************** */




  //**************************** *///backend
app.post('/api/Post', (req, res) => {


  const { username, email, password } = req.body; // Extract data from the request body


  const sqlTestData = "INSERT INTO login(username, email, password) VALUES (?, ?, ?)"

  // excecuting the query and passing the data  nad passing the extracted data
  db.query(sqlTestData, [username, email, password], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred", details: error.message });
    } else {
      res.json(result);
      console.log("Data inserted");
    }
  });
});



///App is listening at this port
app.listen(5000, () => {
  console.log('server is running');
});
