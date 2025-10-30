//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')


//Cria um objeto para o Body do tipo JSON
const bodyparserJSON = bodyparser.json()

//Cria um objeto do app para criar a API
const app = express()

//Controller importadas
const controllerLivro = require('./controller/controllerLivro.js')
const controllerUsuario = require('./controller/controllerUsuario.js')
const controllerTipoMovimentacao = require('./controller/controllerTipoMovimentacao.js')


app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    

    next()
})


/***************************************************************
 * ROTAS - LIVRO
 ***************************************************************/
// Listar todos os livros
app.get('/v1/sga-2025/livros', async function (request, response) {
    let busca = request.query

    let result = await controllerLivro.buscaRapida(busca)
    response.status(result.status_code)
    response.json(result)
})
// Listar todos os livros
app.get('/v1/sga-2025/livros', async function (request, response) {
    let result = await controllerLivro.listarLivros()
    response.status(result.status_code)
    response.json(result)
})

// Livro por ID
app.get('/v1/sga-2025/livros/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerLivro.buscarLivro(id)

    response.status(result.status_code)
    response.json(result)
})

// Inserir livro
app.post('/v1/sga-2025/livros', async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerLivro.inserirLivro(dadosBody, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

// Atualizar livro
app.put('/v1/sga-2025/livros/:id', async function (request, response) {
    let id = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerLivro.atualizarLivro(id, dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Deletar livro
app.delete('/v1/sga-2025/livros/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerLivro.excluirLivro(id)

    response.status(result.status_code)
    response.json(result)
})

/***************************************************************
 * ROTAS - TIPO
 ***************************************************************/
app.get('/v1/sga-2025/tipos', async function (request, response) {
    let result = await controllerTipoMovimentacao.listarTipos()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/sga-2025/tipos/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerTipoMovimentacao.buscarTipo(id)
    response.status(result.status_code)
    response.json(result)
})

app.post('/v1/sga-2025/tipos', async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerTipoMovimentacao.inserirTipo(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/sga-2025/tipos/:id', async function (request, response) {
    let id = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerTipoMovimentacao.atualizarTipo(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/sga-2025/tipos/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerTipoMovimentacao.excluirTipo(id)
    response.status(result.status_code)
    response.json(result)
})

/***************************************************************
 * ROTAS - USUARIO
 ***************************************************************/
app.post('/v1/sga-2025/usuarios/login', async function (request, response) {
    let body = request.body

    let result = await controllerUsuario.loginUsuario(body)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/sga-2025/usuarios', async function (request, response) {
    let result = await controllerUsuario.listarUsuarios()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/sga-2025/usuarios/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerUsuario.buscarUsuario(id)
    response.status(result.status_code)
    response.json(result)
})

app.post('/v1/sga-2025/usuarios', async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/sga-2025/usuarios/:id', async function (request, response) {
    let id = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerUsuario.atualizarUsuario(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/sga-2025/usuarios/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerUsuario.excluirUsuario(id)
    response.status(result.status_code)
    response.json(result)
})


app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições...')
})