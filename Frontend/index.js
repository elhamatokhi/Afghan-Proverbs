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

// Get all proverbs -  Add support for multiple categories

app.get('/proverbs', async (req, res) => {
  try {
    const selectedCategory = req.query.category || ''
    const response = await axios.get(
      'https://afghan-proverbs-1-2i9x.onrender.com'
    )

    let proverbs = response.data

    if (selectedCategory) {
      proverbs = proverbs.filter(p => p.category === selectedCategory)
    }

    res.render('proverbs', { proverbs, selectedCategory })
  } catch (err) {
    console.log(`Failed to make a request`, err.message)
    res.redirect('index ', { error: err.message })
  }
})

// Add a new proverb

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

// Edit
app.get('/edit/:id', async (req, res) => {
  try {
    const ID = req.params.id
    const response = await axios.get(
      `https://afghan-proverbs-1-2i9x.onrender.com/edit/${ID}`
    )
    const proverb = response.data

    res.render('edit', { proverb, id: ID })
  } catch (error) {
    console.log(`Failed to edit the proverb in backend`, error.message)
    res.status(500).send('Failed to edit the proverb.')
  }
})

app.post('/edit/:id', async (req, res) => {
  try {
    const ID = req.params.id
    const updatedProverb = {
      textDari: req.body.textDari,
      textPashto: req.body.textPashto,
      translation: req.body.translation,
      meaning: req.body.meaning,
      category: req.body.category
    }

    await axios.post(
      `https://afghan-proverbs-1-2i9x.onrender.com/edit/${ID}`,
      updatedProverb
    )
    res.redirect('/proverbs')
  } catch (error) {
    console.log(`Failed to edit the proverb`, error.message)
    res.status(500).send(`failed to edit the proverb`)
  }
})

// Delete
app.post('/proverbs/:id', async (req, res) => {
  try {
    const ID = req.params.id
    await axios.post(
      `https://afghan-proverbs-1-2i9x.onrender.com/proverbs/${ID}`
    )
    res.redirect('/proverbs')
  } catch (error) {
    console.log(`Failed to delete from backend`, error.message)
    res.status(500).send(`Faild to delete the proverb`)
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
