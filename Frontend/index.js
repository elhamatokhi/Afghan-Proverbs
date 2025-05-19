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

app.get('/proverbs', async (req, res) => {
  try {
    const selectedCategory = req.query.category || ''

    if (selectedCategory) {
      proverbs = proverbs.filter(p => p.category === selectedCategory)
    }
    const response = await axios.get(
      'https://afghan-proverbs-1-2i9x.onrender.com'
    )

    const result = response.data
    res.render('proverbs', { proverbs: result, selectedCategory })
  } catch (err) {
    console.log(`Failed to make a request`, err.message)
    res.redirect('index ', { error: err.message })
  }
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/add', async (req, res) => {
  try {
    const newProverb = req.body
    const response = await axios.post(
      'https://afghan-proverbs-1-2i9x.onrender.com/addProverb',
      newProverb
    )
    if (response.status === 200) {
      res.render('index', { proverb: null })
    } else {
      throw new Error(`Failed to create task on the other server!`)
    }
  } catch (err) {
    console.log('Failed to create task', err.message)
    res.status(500).send('Failed to create task.')
  }
})

app.get('/random', async (req, res) => {
  const response = await axios.get(
    'https://afghan-proverbs-1-2i9x.onrender.com/random'
  )
  const result = response.data
  res.render('index', { proverb: result })
  try {
  } catch (err) {
    console.log('Failed to create task', err.message)
    res.status(500).send('Failed to create task.')
  }
})
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
