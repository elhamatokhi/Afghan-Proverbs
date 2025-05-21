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
      'https://afghan-proverbs-1-2i9x.onrender.com/proverbs',
      {
        params: { category: selectedCategory }
      }
    )

    let proverbs = response.data

    res.render('proverbs', { proverbs, selectedCategory })
  } catch (err) {
    console.log(`Failed to make a request`, err.message)
    res.redirect('index', { error: err.message })
  }
})

// Add
app.get('/addProverb', (req, res) => {
  res.render('add')
  console.log(
    'You are able to see because you have a get route in the frontend now!'
  )
})

app.post('/addProverb', async (req, res) => {
  try {
    const proverb = req.body
    const response = await axios.post(
      'https://afghan-proverbs-1-2i9x.onrender.com/addProverb',
      proverb
    )
    // let proverbs = response.data
    if (response.status === 200) {
      res.render('index', { proverb: null })
      console.log('Proverb added successfully!!!!!!!!')
    } else {
      throw new Error('Failed to create a new proverb in the backend🙈')
    }
  } catch (error) {
    console.log('failed to create task in the frontend')
    res.status(500).send('Failed to create a new proverb on frontend')
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
