import { Router } from 'express'
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

// Add support for multiple categories
router.get('/proverbs', (req, res) => {
  let proverbs = loadProverbs()
  const selectedCategory = req.query.category || ''
  if (selectedCategory) {
    proverbs = proverbs.filter(p => p.category === selectedCategory)
  }
  res.json(proverbs)
})

router.post('/addProverb', (req, res) => {
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

// Get a single proverb by ID
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
router.get('/edit/:id', (req, res) => {
  const taskID = req.params.id
  let proverbs = loadProverbs()
  const proverb = proverbs.find(p => p.taskID === taskID)
  if (!proverb) {
    return res.status(404).json({ message: 'Proverb not found' })
  }
  res.json(proverbs[taskID])
})

router.post('/edit/:id', (req, res) => {
  let proverbs = loadProverbs()
  const taskID = req.params.id
  console.log('From Backend', req.body)
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
