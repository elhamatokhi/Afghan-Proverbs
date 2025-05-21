import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const loadProverbs = () => {
  const proverbsJSON = readFileSync(
    path.join(__dirname, '../proverbs.json'),
    'utf-8'
  )
  console.log(proverbsJSON)
  let proverbs = JSON.parse(proverbsJSON)
  return proverbs
}

export const getAllProverbs = (req, res) => {
  const proverbs = loadProverbs()
  res.json(proverbs)
}

export const saveProverbs = (proverbs, callback) => {
  fs.writeFile(
    path.join(__dirname, '../proverbs.json'),
    JSON.stringify(proverbs, null, 2),
    err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    }
  )
}
export const getRandomProverb = (req, res) => {
  const proverbs = loadProverbs()
  const randomIndex = Math.floor(Math.random() * proverbs.length)
  const randomProverb = proverbs[randomIndex]
  res.json(randomProverb)
}
