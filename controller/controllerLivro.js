const livroDAO = require('../model/DAO/livro.js')

const message = require('../modulo/config.js')


const inserirLivro = async function (livro, contentType) {
    try {
        if(String(contentType).toLowerCase == 'application/json'){
            if( 
                livro.titulo == '' || livro.titulo == null || livro.titulo == undefined || livro.titulo == livro.titulo.length > 100 ||
                livro.data_publicacao == ''|| livro.data_publicacao == null || livro.data_publicacao == undefined ||
                livro.quantidade == '' || livro.quantidade == null || livro.quantidade == undefined || livro.quantidade > 0  ||
                livro.isbn == '' || livro.isbn == null || livro.isbn == undefined || livro.isbn.length > 45
            ){
                
                    return message.ERROR_REQUIRE_FIELDS
            }else{
                    let result = await livroDAO.insertNovoLivro(livro)

                    if(result){
                        return message.SUCESS_CREATED_ITEM
                    }else{
                        return message.ERROR_INTERNET_SERVER_MODEL
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE
            }
        } catch (error) {
            return message.ERROR_INTERNET_SERVER_MODEL
    }
}

const atualizarLivro = async function (id, livro, contentType) {
    try {
        if(String(contentType).toLowerCase == 'application/json'){
            if( 
                livro.titulo == '' || livro.titulo == null || livro.titulo == undefined || livro.titulo == livro.titulo.length > 100 ||
                livro.data_publicacao == ''|| livro.data_publicacao == null || livro.data_publicacao == undefined ||
                livro.quantidade == '' || livro.quantidade == null || livro.quantidade == undefined || livro.quantidade > 0  ||
                livro.isbn == '' || livro.isbn == null || livro.isbn == undefined || livro.isbn.length > 45 ||
                id == '' || id == undefined || id == null || isNaN(id)
            ){
                
                    return message.ERROR_REQUIRE_FIELDS
            }else{
                    let result = await livroDAO.selectByIDLivro(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                           
                        livro.id = id

                        let resultLivro = await livroDAO.updateNovoLivro(livro)
        
                        if(resultLivro){
                            return message.SUCESS_UPDATED_ITEM
                        }else{
                            return message.ERROR_NOT_FOUND
                        }
                    }
                }
            }
            }else{
                return message.ERROR_CONTENT_TYPE
            }
    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER
    }
    
}

const excluirLivro = async function(id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS
            }else{
                let result = await livroDAO.selectByIDLivro(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                    let resultLivro = await livroDAO.deleteLivro(id)
        
                    if(resultLivro){
                        return message.SUCESS_UPDATED_ITEM
                    }else{
                        return message.ERROR_INTERNET_SERVER_MODEL
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }

    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER
    }
    
}

const listarLivros = async function(){

    let dadosLivro = {}

    try {
        let result = await livroDAO.selectAllLivros()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosLivro.status = true,
                dadosLivro.length = result.length
                dadosLivro.status_code = 200,
                dadosLivro.livros = result
                

                return dadosLivro
            }else{
                return message.ERROR_NOT_FOUND 
            }
        }else{
            return message.ERROR_INTERNET_SERVER_MODEL 
        }

    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER 
    }
}

const buscarLivro = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        let dadosLivro = {}
        let result = await livroDAO.selectByIDLivro(id)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){

                dadosLivro.status = true,
                dadosLivro.status_code = 200,
                dadosLivro.livro = result

                return dadosLivro
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNET_SERVER_MODEL //500
        }
    }
    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirLivro,
    atualizarLivro,
    excluirLivro,
    listarLivros,
    buscarLivro
}