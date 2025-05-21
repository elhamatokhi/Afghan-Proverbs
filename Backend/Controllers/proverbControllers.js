import fs from 'fs'
import { json } from 'stream/consumers'

export const getAllProverbs = (req, res) => {
  let proverbs = JSON.parse(fs.readFileSync('proverbs.json', 'utf-8'))
  res.json(proverbs)
}

export const saveProverbs = proverbs => {
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
}
export const getRandomProverb = (req, res) => {
  const randomIndex = Math.floor(Math.random() * proverbs.length)
  const randomProverb = proverbs[randomIndex]
  res.json(randomProverb)
}
