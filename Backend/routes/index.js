import { Router } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let proverbs = JSON.parse(fs.readFileSync('proverbs.json'))

// Get all proverbs -  Add support for multiple categories
router.get('/', (req, res) => {
  res.json(proverbs)
})

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
  const proverb = req.body
  const newProverbID = Date.now().toString() // get the time -> to string
  proverb.taskID = newProverbID
  proverbs.push(proverb)
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.send(`Task created successfully! 🎉`)
})
// Get a single proverb by ID

// Edit

router.get('/edit/:id', (req, res) => {
  const ID = req.params.id
  const proverb = proverbs[ID]
  res.json(proverb)
})

router.post('/edit/:id', (req, res) => {
  const ID = req.params.id
  const proverb = proverbs[ID]

  if (!proverb) {
    return res.status(404).json({ error: 'Proverb not found' })
  }

  proverb.textDari = req.body.textDari
  proverb.textPashto = req.body.textPashto
  proverb.translation = req.body.translation
  proverb.meaning = req.body.meaning
  proverb.category = req.body.category

  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.json({ message: 'Proverb updated successfully', proverb })
})

//Delete a proverb
router.post('/proverbs/:id', (req, res) => {
  const ID = req.params.id
  proverbs.splice(ID, 1)
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
  res.json(proverbs)
})

// Endpoint Random Proverb
router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * proverbs.length)
  const randomProverb = proverbs[randomIndex]
  res.json(randomProverb)
})

// Search by keyword in any of the three language

export default router
