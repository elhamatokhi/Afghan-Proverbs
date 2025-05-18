import express from 'express'
import fs from 'fs'
import router from '../routes/index.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use('/', router)
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
