const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()


const insertNovoTipo = async function(tipo) {
   try {
       
    let sql = ` insert into tipo_movimentacao(tipo)
    values
    ('${tipo.tipo}')
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

const updateNovoTipo = async function(tipo) {
    try {
        
    let sql = `update tipo_movimentacao set
        login =  '${tipo.tipo}'
    where id = '${tipo.id}' `

    
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
    } catch (error) {
        return false
    }
    
}

const deleteTipo = async function(id) {
    try {
        let sql = `delete from tipo_movimentacao where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}


const selectAllTipos = async function() {
    try {
        let sql = `select * from tipo_movimentacao order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
        return false
    } catch (error) {
        return false
    }
}

const selectByIDTipo = async function(id) {
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
    insertNovoTipo,
    updateNovoTipo,
    deleteTipo,
    selectAllTipos,
    selectByIDTipo
}