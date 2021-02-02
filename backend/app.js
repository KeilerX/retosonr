const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3061;

const app = express();

app.use(bodyParser.json());

//MySQL Configuration

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root12345',
  database: 'retosonr'
});

//Connection to database

connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

//Routes
app.get('/', (req, res) => {
  res.send('Reto SONR API!');
});

//CRUD Vehicles

app.get('/vehicles', (req, res) => {
  const sql = 'SELECT * FROM vehiculo';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('No vehicles');
    }
  })
});

app.post('/add_vehicle', (req, res) => {
  const sql = 'INSERT INTO vehiculo SET ?';
  const vehicleObj = {
    vim: req.body.vim
  };

  connection.query(sql, vehicleObj, error => {
    if (error) throw error;
    res.send('Added new vehicle');
  });
});

app.put('/update_vehicle/:id', (req, res) => {
  const { id } = req.params;
  const { vim } = req.body;
  const sql = `UPDATE vehiculo SET vim = '${vim}' WHERE id = ${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    res.send('Updated vehicle');
  });
});

app.delete('/delete_vehicle/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM vehiculo WHERE id = ${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    res.send('Deleted vehicle');
  });
});

app.get('/vehicles/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM vehiculo where id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('No vehicle with that id');
    }
  })
});