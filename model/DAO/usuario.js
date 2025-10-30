//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()


const insertNovoUsuario = async function(usuario) {
   try {
       
    let sql = ` insert into tbl_usuario(
        login,
        senha)
    values
    ('${usuario.login}',
     '${usuario.senha}'
    )
    `

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

   } catch (error) {
        return false
   }

}

const updateNovoUsuario = async function(usuario) {
    try {
        
    let sql = `update tbl_usuario set
        login =  '${usuario.titulo}',
        senha = '${usuario.data_publicacao}'
    where id = '${usuario.id}' `

    
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
    } catch (error) {
        return false
    }
    
}

const deleteUsuario = async function(id) {
    try {
        let sql = `delete from tbl_usuario where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}


const selectAllUsuario = async function() {
    try {
        let sql = `select * from tbl_usuario order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
        return false
    } catch (error) {
        return false
    }
}

const selectByIDUsuario = async function(id) {
    try {
        let sql = `select * from tbl_usuario where id = ${id}`


        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNovoUsuario,
    updateNovoUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIDUsuario
}