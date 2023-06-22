const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DBPATH = 'database.db';
const app = express();
const port = 9696;
const hostname = 'localhost';
const db = new sqlite3.Database((DBPATH), (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the Database. ');
    }
});

app.use(express.static("../Frontend"));

//endpoint que leva para home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/home.html'));
});
app.use(express.json());
app.listen(port, hostname, () => { // Ligação com o servidor
    console.log(`Server listening on http://${hostname}:${port}/`);
});
app.post('/inserirChoque', (req, res) => { // Inserção de choque
    const insert = 'INSERT INTO choque (id_choque, velocidade, pg, forca_maxima, act, placa, id_ponto, tipo_choque, hora, dia) VALUES (?,?,?,?,?,?,?,?,?,?)';
    db.run(insert, [req.body.id_choque, req.body.velocidade, req.body.pg, req.body.forca_maxima, req.body.act, req.body.placa, req.body.id_ponto, req.body.tipo_choque, req.body.hora, req.body.dia], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({
                error: 'Failed to insert row'
            });
        } else {
            res.status(201).json({
                message: 'Row inserted successfully'
            });
        }
    });
});
app.post('/choqueVagao', (req, res) => { // consulta para obter todos os choques a partir da placa de um vagão (tipo de filtragem)
    const select = 'SELECT * FROM choques WHERE placa = ? LIMIT 100';
    db.all(select, [req.body.placa], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                console.log(rows);
                res.status(200).json({
                    rows
                });
            } else {
                res.status(401).json({
                    message: 'Login failed'
                });
            }
        }
    });
});
app.post('/choqueTipo', (req, res) => { // consulta para obter todos os choques a partir do tipo de choque (tipo de filtragem)
    const select = 'SELECT * FROM choques WHERE tipo_choque = ? LIMIT 100';
    db.all(select, [req.body.tipo_choque], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                console.log(rows);
                res.status(200).json({
                    rows
                });
            } else {
                res.status(401).json({
                    message: 'Não existem choques!'
                });
            }
        }
    });
});
app.post('/choqueEngate', (req, res) => { // consulta para obter todos os choques a partir do tipo de engate (tipo de filtragem)
    const select = 'SELECT * FROM choques WHERE tipo_engate = ? LIMIT 100';
    db.all(select, [req.body.tipo_engate], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                console.log(rows);
                res.status(200).json({
                    rows
                });
            } else {
                res.status(401).json({
                    message: 'Não existem choques!'
                });
            }
        }
    });
});
app.post('/choqueViagem', (req, res) => { // consulta para obter todos os choques a partir do tipo de viagem (tipo de filtragem)
    const select = 'SELECT * FROM choques WHERE viagem = ? LIMIT 100';
    db.all(select, [req.body.viagem], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                console.log(rows);
                res.status(200).json({
                    rows
                });
            } else {
                res.status(401).json({
                    message: 'Não existem choques!'
                });
            }
        }
    });
});
app.get('/picos', (req, res) => { // consulta para obter todos os picos
    const get2 = 'SELECT * FROM picos LIMIT 100';
    db.all(get2, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.json(rows);

    });
});
app.post('/picoVagao', (req, res) => { // consulta para obter todos os picos a partir da placa de um vagão (tipo de filtragem)
    const select = 'SELECT * FROM picos WHERE placa = ? LIMIT 100';
    db.all(select, [req.body.placa], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                console.log(rows);
                res.status(200).json({
                    rows
                });
            } else {
                res.status(401).json({
                    message: 'Login failed'
                });
            }
        }
    });
});
app.post('/picoEngate', (req, res) => { // consulta para obter todos os picos a partir do tipo de engate (tipo de filtragem)
    const select = 'SELECT * FROM picos WHERE tipo_engate = ? LIMIT 100';
    db.all(select, [req.body.tipo_engate], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                console.log(rows);
                res.status(200).json({
                    rows
                });
            } else {
                res.status(401).json({
                    message: 'Não existem choques!'
                });
            }
        }
    });
});
app.post('/picoViagem', (req, res) => { // consulta para obter todos os picos a partir do tipo de viagem (tipo de filtragem)
    const select = 'SELECT * FROM picos WHERE viagem = ? LIMIT 100';
    db.all(select, [req.body.viagem], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                console.log(rows);
                res.status(200).json({
                    rows
                });
            } else {
                res.status(401).json({
                    message: 'Não existem choques!'
                });
            }
        }
    });
});