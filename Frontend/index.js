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

// GET route for edit page
app.get('/edit/:id', async (req, res) => {
  try {
    const taskID = req.params.id
    const response = await axios.get(
      `https://afghan-proverbs-1-2i9x.onrender.com/edit/${taskID}`
    )
    const proverb = response.data

    res.render('edit', { proverb, taskID })
  } catch (error) {
    console.log(`Failed to edit the proverb in backend`, error.message)
    res.status(500).send('Failed to edit the proverb.')
  }
})

// app.post('/eidt/:id', async (req, res) => {
//   console.log(req.body)
//   const taskID = req.params.id
//   try {
//     const updatedProverb = {
//       textDari: req.body.textDari,
//       textPashto: req.body.textPashto,
//       translation: req.body.translation,
//       meaning: req.body.meaning,
//       category: req.body.category
//     }
//     await axios.post(
//       `https://afghan-proverbs-1-2i9x.onrender.com/edit/${taskID}`,
//       updatedProverb
//     )
//     res.redirect('/proverbs')
//   } catch (error) {
//     console.log(`Failed to edit the proverb: `, error.message)
//     res.status(500).send(`failed to edit the proverb`)
//   }
// })

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
