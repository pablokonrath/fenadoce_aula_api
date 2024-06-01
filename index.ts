import express from 'express'
const app = express()
//const port = 3000
const port = process.env.PORT ?? 3000

import candidatasRoutes from './routes/candidatas'
import clientesRoutes from './routes/clientes'
import votosRoutes from './routes/votos'

app.use(express.json())
app.use("/candidatas", candidatasRoutes)
app.use("/clientes", clientesRoutes)
app.use("/votos", votosRoutes)

app.get('/', (req, res) => {
  res.send('API: Controle de Votos das Rainhas da Fenadoce')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})