import { Router } from 'express'
import { copyFileSync, readFileSync } from 'fs'
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

// Get all proverbs

// Add support for multiple categories
router.get('/proverbs', (req, res) => {
  let proverbs = loadProverbs()
  console.log('Proverbs length', proverbs.length)
  const selectedCategory = req.query.category || ''
  if (selectedCategory) {
    proverbs = proverbs.filter(p => p.category === selectedCategory)
  }
  res.json(proverbs)
})

// Add a new proverb
router.post('/addProverb', (req, res) => {
  const proverbs = loadProverbs()
  const proverb = req.body
  const newProverbID = Date.now().toString() // get the time -> to string
  proverb.taskID = newProverbID
  proverbs.push(proverb)
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.send(`Task created successfully! 🎉`)
})

// // Get a single proverb by ID
router.get('/proverbs/:id', (req, res) => {
  const taskID = req.params.id
  const proverbs = loadProverbs()
  const proverb = proverbs.find(p => p.taskID === taskID)
  if (!proverb) {
    return res.status(404).json({ message: 'Proverb not found' })
  }
  res.json(proverb)
})

// Edit a single proverb

router.put('/proverbs/:id', (req, res) => {
  let proverbs = loadProverbs()
  const taskID = req.params.id

  const index = proverbs.findIndex(p => p.taskID === taskID)
  if (index === -1) {
    return res.status(404).json({ message: 'Proverb not found.' })
  }

  console.log('ID received:', req.params.id)
  console.log('Total Proverbs:', proverbs.length)

  const updatedProverb = {
    textDari: req.body.textDari,
    textPashto: req.body.textPashto,
    translation: req.body.translation,
    meaning: req.body.meaning,
    category: req.body.category
  }

  updatedProverb.taskID = taskID

  proverbs[index] = updatedProverb
  console.log(updatedProverb)

  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.json({ message: 'Proverb updated successfully', updatedProverb })
})

//  Delete a single proverb
router.post('/proverbs/delete/:id', (req, res) => {
  let proverbs = loadProverbs()
  const ID = req.params.id

  console.log('ID received:', req.params.id)
  console.log('Total Proverbs:', proverbs.length)

  const initialLength = proverbs.length

  proverbs = proverbs.filter(p => p.taskID !== ID)

  if (proverbs.length === initialLength) {
    return res.status(400).json({ error: 'No proverb found with that taskID' })
  } else console.log('Deleted successfully!')

  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.json(proverbs)
})

// Endpoint Random Proverb
router.get('/random', getRandomProverb)

// Search by keyword in any of the three language

export default router
