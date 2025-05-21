import fs from 'fs'

const loadProverbs = () => {
  return JSON.parse(fs.readFileSync('proverbs.json', 'utf-8'))
}

export const getAllProverbs = (req, res) => {
  const proverbs = loadProverbs()
  res.json(proverbs)
}

export const saveProverbs = proverbs => {
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
}

export const getRandomProverb = (req, res) => {
  const proverbs = loadProverbs()
  const randomIndex = Math.floor(Math.random() * proverbs.length)
  const randomProverb = proverbs[randomIndex]
  res.json(randomProverb)
}
