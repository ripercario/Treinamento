const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;


require("dotenv").config();
const jwt = require('jsonwebtoken');

const mysql_pool = require('mysql2');

var pool = mysql_pool.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "schema1"
});

pool.connect(function(err) {
    if (err) throw err;
    console.log("conectou");
});


app.post("/treinamento", async (req, res) => {
    const cadastro = req.body
    console.log(cadastro)
    pool.connect(function(err) {
        if (err) throw err;
        console.log("conectou");
    });
  
    pool.query(`INSERT INTO Treinamento (codigo, nome_comercial, descricao, carga_horaria, inicio_inscricoes, fim_inscricoes, inicio_treinamento, fim_treinamento, min_inscritos, max_inscritos) VALUES ('${cadastro.codigo}', '${cadastro.nome_comercial}', '${cadastro.descricao}', '${cadastro.carga_horaria}', '${cadastro.inicio_inscricoes}', '${cadastro.fim_inscricoes}', '${cadastro.inicio_treinamento}', '${cadastro.fim_treinamento}', '${cadastro.min_inscritos}', '${cadastro.max_inscritos}');`);

})


app.post("/quiz", async (req, res) => {

    const InfoQuiz = req.body
    pool.query(`INSERT INTO quiz (codigo_quiz, NomeQuiz, PerguntaQuiz, RespostaCorreta, RespostaE1, RespostaE2, RespostaE3) VALUES ('${InfoQuiz.codigo}', '${InfoQuiz.NomeQuiz}', '${InfoQuiz.PerguntaQuiz}', '${InfoQuiz.RespostaCorreta}', '${InfoQuiz.RespostaE1}', '${InfoQuiz.RespostaE2}', '${InfoQuiz.RespostaE3}');`);
    
})

app.post("/select_quiz", async (req, res) => {
    const a = pool.query(`SELECT * FROM quiz WHERE NomeQuiz = '${req.body}'`);

    res.json(a); // enviar como response
})


app.post('/auth', async (req, res) => {
   
    const token = req.headers.authorization;
    const accessToken = token.split(' ')[1];
    
    const verify = jwt.verify(accessToken, process.env.SECRET);
    console.log(verify)
    if(verify === null) return res.status(401).json({status: "Unauthorized"});

    return res.json({status: 'Autenticado'});

});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

