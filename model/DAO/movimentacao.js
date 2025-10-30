// Import da biblioteca do Prisma Client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

// Instância da classe do Prisma Client
const prisma = new PrismaClient()

// Inserir nova movimentação
const insertMovimentacao = async function(mov) {
    try {
        let sql = `INSERT INTO tbl_movimentacao(
            id_movimentacao,
            id_usuario,
            quantidade,
            data_movimentacao,
            id_livro
        ) VALUES (
            ${mov.id_movimentacao},
            ${mov.id_usuario},
            ${mov.quantidade},
            ${mov.data_movimentacao},
            ${mov.id_livro}
        )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Atualizar movimentação
const updateMovimentacao = async function(mov) {
    try {
        let sql = `UPDATE tbl_movimentacao SET
            id_movimentacao = ${mov.id_movimentacao},
            id_usuario = ${mov.id_usuario},
            quantidade = ${mov.quantidade},
            data_movimentacao = ${mov.data_movimentacao},
            id_livro = ${mov.id_livro}
        WHERE id = ${mov.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Deletar movimentação
const deleteMovimentacao = async function(id) {
    try {
        let sql = `DELETE FROM tbl_movimentacao WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Selecionar todas movimentações
const selectAllMovimentacoes = async function() {
    try {
        let sql = `SELECT * FROM tbl_movimentacao ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Selecionar movimentação por ID
const selectByIDMovimentacao = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_movimentacao WHERE id = ${id}`

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
    insertMovimentacao,
    updateMovimentacao,
    deleteMovimentacao,
    selectAllMovimentacoes,
    selectByIDMovimentacao
}
