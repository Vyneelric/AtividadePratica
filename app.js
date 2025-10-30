//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')


//Cria um objeto para o Body do tipo JSON
const bodyparserJSON = bodyparser.json()

//Cria um objeto do app para criar a API
const app = express()

//Controller importadas
const controller = require('./controller.js')


app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    

    next()
})



app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições...')
})