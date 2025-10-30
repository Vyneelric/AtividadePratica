const usuarioDAO = require('../model/DAO/usuario.js')

const message = require('../modulo/config.js')


const inserirUsuario = async function (usuario, contentType) {
    try {
        if(String(contentType).toLowerCase == 'application/json'){
            if( 
                usuario.login == '' || usuario.login == null || usuario.login == undefined || usuario.login == usuario.login.length > 45 ||
                usuario.senha == ''|| usuario.senha == null || usuario.senha == undefined ||usuario.login == usuario.senha.length > 45
            ){
                return message.ERROR_REQUIRE_FIELDS
            }else{
                    let result = await usuarioDAO.insertNovoUsuario(usuario)

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

const atualizarUsuario = async function (id, usuario, contentType) {
    try {
        if(String(contentType).toLowerCase == 'application/json'){
            if( 
                usuario.login == '' || usuario.login == null || usuario.login == undefined || usuario.login.length > 45 ||
                usuario.senha == ''|| usuario.senha == null || usuario.senha == undefined ||usuario.senha.length > 45  ||
                id == '' || id == undefined || id == null || isNaN(id)
            ){
                
                    return message.ERROR_REQUIRE_FIELDS
            }else{
                    let result = await usuarioDAO.selectByIDUsuario(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                           
                        usuario.id = id

                        let resultUsuario = await usuarioDAO.updateNovoUsuario(usuario)
        
                        if(resultUsuario){
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

const excluirUsuario = async function(id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS
            }else{
                let result = await usuarioDAO.selectByIDUsuario(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                    let resultUsuario = await usuarioDAO.deleteUsuario(id)
        
                    if(resultUsuario){
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

const listarUsuarios = async function(){

    let dadosUsuario = {}

    try {
        let result = await usuarioDAO.selectAllUsuario()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosUsuario.status = true,
                dadosUsuario.length = result.length
                dadosUsuario.status_code = 200,
                dadosUsuario.usuarios = result
                

                return dadosUsuario
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

const buscarUsuario = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        let dadosUsuario = {}
        let result = await usuarioDAO.selectByIDUsuario(id)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){

                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.livro = result

                return dadosUsuario
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

const loginUsuario = async function (login, senha){
    try {
        if(login == '' || login == null || login == undefined ||
           senha == '' || senha == null || senha == undefined){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        let dadosUsuario = {}
        let result = await usuarioDAO.AutenticacaoUsuario(login, senha)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){

                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.login = result

                delete login.senha

                return dadosUsuario
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuarios,
    buscarUsuario,
    loginUsuario
}