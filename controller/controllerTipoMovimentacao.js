const tipoDAO = require('../model/DAO/tipo.js')
const message = require('../modulo/config.js')

const inserirTipo = async function(tipo, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                tipo.tipo == '' || tipo.tipo == null || tipo.tipo == undefined || tipo.tipo.length > 45
            ){
                return message.ERROR_REQUIRE_FIELDS
            }else{
                let result = await tipoDAO.insertNovoTipo(tipo)

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

const atualizarTipo = async function(id, tipo, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                tipo.tipo == '' || tipo.tipo == null || tipo.tipo == undefined || tipo.tipo.length > 45 ||
                id == '' || id == undefined || id == null || isNaN(id)
            ){
                return message.ERROR_REQUIRE_FIELDS
            }else{
                let result = await tipoDAO.selectByIDTipo(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        tipo.id = id

                        let resultTipo = await tipoDAO.updateNovoTipo(tipo)

                        if(resultTipo){
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

const excluirTipo = async function(id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS
        }else{
            let result = await tipoDAO.selectByIDTipo(id)

            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){

                    let resultTipo = await tipoDAO.deleteTipo(id)

                    if(resultTipo){
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

const listarTipos = async function(){

    let dadosTipo = {}

    try {
        let result = await tipoDAO.selectAllTipos()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosTipo.status = true,
                dadosTipo.length = result.length,
                dadosTipo.status_code = 200,
                dadosTipo.tipos = result

                return dadosTipo
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

const buscarTipo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS
        }else{

            let dadosTipo = {}
            let result = await tipoDAO.selectByIDTipo(id)

            if(result != false || typeof(result) == 'object'){
                if(result.length > 0){

                    dadosTipo.status = true,
                    dadosTipo.status_code = 200,
                    dadosTipo.tipo_movimentacao = result

                    return dadosTipo
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
    inserirTipo,
    atualizarTipo,
    excluirTipo,
    listarTipos,
    buscarTipo
}
