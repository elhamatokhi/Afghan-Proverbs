import { Router } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { getProverbs, saveProverbs } from '../utils/filehelper.js'
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
router.get('/proverbs/:id', (req, res) => {})

// Add a new proverb
router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', (req, res) => {
  const proverbsJSON = readFileSync(
    path.join(__dirname, '../proverbs.json'),
    'utf-8'
  )
  let proverbs = JSON.parse(proverbsJSON)

  const newProverb = {
    textDari: req.body.textDari,
    textPashto: req.body.textPashto,
    translation: req.body.translation,
    meaning: req.body.meaning,
    category: req.body.category
  }

  proverbs.push(newProverb)

  fs.writeFile(
    path.join(__dirname, '../proverbs.json'),
    JSON.stringify(proverbs, null, 2),
    err => {
      if (err) {
        return res.status(500).send('Error saving data')
      }
      res.redirect('/proverbs')
    }
  )
  console.log(newProverb)
})

// Edit

router.get('/edit/:id', (req, res) => {
  const proverbsJSON = readFileSync(
    path.join(__dirname, '../proverbs.json'),
    'utf-8'
  )
  let proverbs = JSON.parse(proverbsJSON)

  const ID = req.params.id
  const proverb = proverbs[ID]

  res.render('edit', { id: ID, proverb })
})

router.post('/edit/:id', (req, res) => {
  const proverbsJSON = readFileSync(
    path.join(__dirname, '../proverbs.json'),
    'utf-8'
  )
  let proverbs = JSON.parse(proverbsJSON)

  const ID = req.params.id
  const proverb = proverbs[ID]

  proverb.textDari = req.body.textDari
  proverb.textPashto = req.body.textPashto
  proverb.translation = req.body.translation
  proverb.meaning = req.body.meaning
  proverb.category = req.body.category

  fs.writeFile(
    path.join(__dirname, '../proverbs.json'),
    JSON.stringify(proverbs, null, 2),
    err => {
      if (err) {
        return res.status(500).send('Error saving data')
      }
      res.redirect('/proverbs')
    }
  )
})

//Delete a proverb
router.post('/proverbs/:id', (req, res) => {
  const proverbsJSON = readFileSync(
    path.join(__dirname, '../proverbs.json'),
    'utf-8'
  )
  let proverbs = JSON.parse(proverbsJSON)

  const ID = req.params.id
  proverbs.splice(ID, 1)

  fs.writeFile(
    path.join(__dirname, '../proverbs.json'),
    JSON.stringify(proverbs, null, 2),
    err => {
      if (err) {
        return res.status(500).send('Error saving data')
      }
      res.redirect('/proverbs')
    }
  )
  console.log(`A proverb was just deleted. 😒`)
})
// Endpoint Random Proverb

// Search by keyword in any of the three language

// Add support for multiple categories

export default router
