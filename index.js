import express from 'express'
import classRoutes from './routes/class.routes.js'
import professorRoutes from './routes/professor.routes.js'
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

app.use('/api/1.0/class', classRoutes)
app.use('/api/1.0/professor', professorRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})