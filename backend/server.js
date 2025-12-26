import pg from 'pg'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const { Pool } = pg
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());



const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})
console.log(process.env.DB_USER)

app.get('/lancamentos', async (req, res) => {
    try {
        const resultado = await pool.query(`SELECT * FROM lancamentos ORDER BY id`)
        res.json(resultado.rows)
    } catch (err) {
        console.error('Erro ao conectar', err.message)
        res.status(500).json({
            error: 'Erro ao realizar a consulta no banco'
        })
    }
})

app.post('/cadastro', async (req, res) => {
    const { descricao, datavenc, valor, tipo } = req.body
    try {
        const query = `
        INSERT INTO lancamentos (descricao, datavenc, valor, tipo)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `

        const valores = [descricao, datavenc, valor, tipo]
        const resultado = await pool.query(query, valores)

        res.status(201).json(resultado.rows[0])
    } catch (err) {
        console.error('Erro ao inserir dados', err.message)
        res.status(500).json({
            error: 'Erro ao inserir dados no banco'
        })
    }
})
app.listen(port, () => {
    console.log(`🚀 SERVIDOR RODANDO EM http://localhost:${port}`)
})