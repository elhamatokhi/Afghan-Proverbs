import { Router } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get all proverbs -  Add support for multiple categories

// Bonus - list proverbs by Categories

// Get a single proverb by ID

// Add a new proverb

// Edit

//Delete a proverb

// Endpoint Random Proverb
router.get('/random', (req, res) => {
  const proverbs = JSON.parse(fs.readFileSync('proverbs.json'))
  const randomIndex = Math.floor(Math.random() * proverbs.length)
  const randomProverb = proverbs[randomIndex]
  res.json()
  res.render('index', { proverb: randomProverb })
})

// Search by keyword in any of the three language

export default router
