import { Router } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// To store the proverbs
let data

router.get('/', (req, res) => {
  res.render('index')
})

// Get all proverbs
router.get('/proverbs', (req, res) => {
  const proverbsJSON = readFileSync(
    path.join(__dirname, '../proverbs.json'),
    'utf-8'
  )
  let proverbs = JSON.parse(proverbsJSON)

  // Bonus - list proverbs by Categories
  const selectedCategory = req.query.category || ''

  if (selectedCategory) {
    proverbs = proverbs.filter(p => p.category === selectedCategory)
  }

  res.render('proverbs', { proverbs, selectedCategory })
})

// Get a single proverb by ID
router.get('/proverbs/:id', (req, res) => {

})

// Add a new proverb

router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', (req, res) => {
  const newProverb = {
    textDari : req.body.textDari,
    textPashto : req.body.textPashto,
    translation: req.body.translationEn,
    meaning: req.body.meaning,
    category: req.body.category

  }
  console.log(newProverb)

  res.redirect('/',{proberb})
})

// Update an existing proverb
router.put('/proverbs/:id', (req, res) => {
  console.log(`Updated`)
})

//Delete a proverb
router.delete('/proverbs/:id', (req, res) => {
  console.log(`A proverb was just deleted. 😒`)
})

// Endpoint Random Proverb

// Search by keyword in any of the three language

// Add support for multiple categories

export default router
