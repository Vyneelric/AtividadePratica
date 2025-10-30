//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')
const { async } = require('effect/Stream')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()


const insertNovoLivro = async function(livro) {
   try {
       
    let sql = ` insert into tbl_livro(
        titulo,
        data_publicacao,
        quantidade,
        isbn)
    values
    ('${livro.titulo}',
    '${livro.data_publicacao}',
    '${livro.quantidade}',
    '${livro.isbn}'
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

const updateNovoLivro = async function(livro) {
    try {
        
    let sql = `update tbl_livro set
        titulo =  '${livro.titulo}',
        data_publicacao = '${livro.data_publicacao}',
        quantidade = '${livro.quantidade}',
        isbn =     '${livro.isbn}'
    where id = '${livro.id}' `

    
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
    } catch (error) {
        return false
    }
    
}

const deleteLivro = async function(id) {
    try {
        let sql = `delete from tbl_livro where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
    }
}


const selectAllLivros = async function() {
    try {
        let sql = `select * from tbl_livro order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
        return false
    } catch (error) {
        return false
    }
}

const selectByIDLivro = async function(id) {
    try {
        let sql = `select * from tbl_livro where id = ${id}`


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
    insertNovoLivro,
    updateNovoLivro,
    deleteLivro,
    selectAllLivros,
    selectByIDLivro
}