import { Router } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import {
  getAllProverbs,
  saveProverbs,
  getRandomProverb,
  loadProverbs
} from '../Controllers/proverbControllers.js'
const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let proverbs = JSON.parse(fs.readFileSync('proverbs.json'))

// Get all proverbs
router.get('/', getAllProverbs)

// Add support for multiple categories
router.get('/proverbs', (req, res) => {
  // Bonus - list proverbs by Categories
  const selectedCategory = req.query.category || ''
  if (selectedCategory) {
    proverbs = proverbs.filter(p => p.category === selectedCategory)
  }
  res.json(proverbs)
})

// Add a new proverb
router.post('/addProverb', (req, res) => {
  loadProverbs()
  const proverb = req.body
  const newProverbID = Date.now().toString() // get the time -> to string
  proverb.taskID = newProverbID
  proverbs.push(proverb)
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.send(`Task created successfully! 🎉`)
})

// Get a single proverb by ID

// Edit

router.get('/edit/:taskID', (req, res) => {
  const taskID = req.params.taskID
  const proverb = proverbs.find(p => p.taskID === taskID)
  if (!proverb) {
    return res.status(404).json({ message: 'Proverb not found' })
  }
  res.json(proverb)
})

router.post('/edit/:taskID', (req, res) => {
  const taskID = req.params.taskID
  const proverbIndex = proverbs.findIndex(p => p.taskID === taskID)
  if (proverbIndex === -1) {
    return res.status(404).json({ message: 'Proverb not found' })
  }
  const updatedProverb = {
    textDari: req.body.textDari,
    textPashto: req.body.textPashto,
    translation: req.body.translation,
    meaning: req.body.meaning,
    category: req.body.category
  }

  proverbs[proverbIndex] = updatedProverb

  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.json({ message: 'Proverb updated successfully', updatedProverb })
})

//Delete a proverb
router.post('/proverbs/:id', (req, res) => {
  const ID = req.params.id
  proverbs.splice(ID, 1)
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.json(proverbs)
})

// Endpoint Random Proverb
router.get('/random', getRandomProverb)

// Search by keyword in any of the three language

export default router
