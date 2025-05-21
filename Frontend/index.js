import express, { response } from 'express'
import axios from 'axios'
import fs from 'fs'
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { proverb: null })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
