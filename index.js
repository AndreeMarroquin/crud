const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "escuela"
});


app.get("/leerestudiantes", (req, res) => {
    console.log("get lista estudiantes");
    mysqlConnection.query('Select * from estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});



app.get("/leerestudiantes/:id", (req, res) => {
    console.log("get estudiante");
    mysqlConnection.query('Select * from estudiante where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.post("/guardarestudiantes", (req, res) => {
    console.log("crear estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into estudiante (nombre, apellido, edad, grado) values (?,?,?,?)',
        [est.Nombre, est.Apellido, est.Edad, est.Grado], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


app.put("/actualizarestudiantes/:id", (req, res) => {
    console.log("update estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set nombre = ?, apellido = ?, edad = ?, grado=? where id = ?',
        [est.Nombre, est.Apellido, est.Edad, est.Grado, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


app.delete("/borrarestudiantes/:id", (req, res) => {
    console.log("update estudiante ");
    mysqlConnection.query('delete from estudiante where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});



app.listen(3000);