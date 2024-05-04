import express from 'express'
import classRoutes from './routes/class.routes.js'
import professorRoutes from './routes/professor.routes.js'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import options from './src/swagger.json' assert {type: 'json'}


const app = express()
const PORT = 3000

// swagger API
options.apis = ["index.js"]
const specs = swaggerJSDoc(options)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

app.use('/api/1.0/class', classRoutes)
app.use('/api/1.0/professor', professorRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})