const movimentacaoDAO = require('../model/DAO/movimentacao.js')
const message = require('../modulo/config.js')

const inserirMovimentacao = async function(movimentacao, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                movimentacao.id_movimentacao == '' || movimentacao.id_movimentacao == null || movimentacao.id_movimentacao == undefined ||
                movimentacao.id_usuario == '' || movimentacao.id_usuario == null || movimentacao.id_usuario == undefined ||
                movimentacao.quantidade == '' || movimentacao.quantidade == null || movimentacao.quantidade == undefined ||
                movimentacao.data_movimentacao == '' || movimentacao.data_movimentacao == null || movimentacao.data_movimentacao == undefined ||
                movimentacao.id_livro == '' || movimentacao.id_livro == null || movimentacao.id_livro == undefined
            ){
                return message.ERROR_REQUIRE_FIELDS
            }else{
                let result = await movimentacaoDAO.insertMovimentacao(movimentacao)

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

const atualizarMovimentacao = async function(id, movimentacao, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                id == '' || id == undefined || id == null || isNaN(id) ||
                movimentacao.id_movimentacao == '' || movimentacao.id_movimentacao == null || movimentacao.id_movimentacao == undefined ||
                movimentacao.id_usuario == '' || movimentacao.id_usuario == null || movimentacao.id_usuario == undefined ||
                movimentacao.quantidade == '' || movimentacao.quantidade == null || movimentacao.quantidade == undefined ||
                movimentacao.data_movimentacao == '' || movimentacao.data_movimentacao == null || movimentacao.data_movimentacao == undefined ||
                movimentacao.id_livro == '' || movimentacao.id_livro == null || movimentacao.id_livro == undefined
            ){
                return message.ERROR_REQUIRE_FIELDS
            }else{
                let result = await movimentacaoDAO.selectByIDMovimentacao(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                        movimentacao.id = id

                        let resultMov = await movimentacaoDAO.updateMovimentacao(movimentacao)

                        if(resultMov){
                            return message.SUCESS_UPDATED_ITEM
                        }else{
                            return message.ERROR_NOT_FOUND
                        }
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER
    }
}

const excluirMovimentacao = async function(id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS
        }else{
            let result = await movimentacaoDAO.selectByIDMovimentacao(id)

            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){
                    let resultMov = await movimentacaoDAO.deleteMovimentacao(id)

                    if(resultMov){
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

const listarMovimentacoes = async function(){
    let dadosMovimentacao = {}

    try {
        let result = await movimentacaoDAO.selectAllMovimentacoes()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosMovimentacao.status = true
                dadosMovimentacao.length = result.length
                dadosMovimentacao.status_code = 200
                dadosMovimentacao.movimentacoes = result

                return dadosMovimentacao
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

const buscarMovimentacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS
        }else{
            let dadosMovimentacao = {}
            let result = await movimentacaoDAO.selectByIDMovimentacao(id)

            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){
                    dadosMovimentacao.status = true
                    dadosMovimentacao.status_code = 200
                    dadosMovimentacao.movimentacao = result

                    return dadosMovimentacao
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNET_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirMovimentacao,
    atualizarMovimentacao,
    excluirMovimentacao,
    listarMovimentacoes,
    buscarMovimentacao
}
