import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('index')
})

// Get all proverbs
router.get('/proverbs', (req, res) => {
  res.render('proverbs')
})

// Get a single proverb by ID
router.get('/proverbs/:id', (req, res) => {})

// Add a new proverb
router.post('/proverbs', (req, res) => {
  console.log('A new proverb added!')
})

// Update an existing proverb
router.put('/proverbs/:id', (req, res) => {
  console.log(`Updated`)
})

//Delete a proverb
router.delete('/proverbs/:id', (req, res) => {
  console.log(`A proverb was just deleted. 😒`)
})

// Bonus Features
router.get('/proverbs/:categori', (req, res) => {
  console.log(`Filter proverbs by categori using query parameters`)
})

// Endpoint Random Proverb

// Search by keyword in any of the three language

// Add support for multiple categories

export default router
