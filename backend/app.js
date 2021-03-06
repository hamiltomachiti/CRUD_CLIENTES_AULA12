const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Cliente = require('./models/cliente')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hamilton:161810@cluster0.dweok.mongodb.net/Cliente?retryWrites=true&w=majority').then(() => {
    console.log("Conexão OK")
}).catch(() => {
    console.log("Conexão NOK")
});

app.use(express.json());

const clientes = [{
        id: '1',
        nome: 'Jose',
        fone: '11223344',
        email: 'jose@email.com'
    },
    {
        id: '2',
        nome: 'Maria',
        fone: '2119992233',
        email: 'maria@email.com'
    },
    {
        id: '3',
        nome: 'Afonso',
        fone: '11998877',
        email: 'afonso@email.com'
    }
];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next()
});


//http://localhost:3000/api/clientes
app.get('/api/clientes', (req, res, next) => {
    Cliente.find().then(documents => {
            res.status(200).json({
                mensagem: "Tudo ok",
                clientes: documents
            });
        })
        /* res.status(200).json({
             mensagem: "Tudo ok",
             clientes: clientes
         })*/
})

app.post('/api/clientes', (req, res, next) => {
    const cliente = new Cliente({
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    })
    cliente.save();
    console.log(cliente);
    res.status(201).json({ mensagem: "Cliente inserido" })
})

module.exports = app