import fs from 'fs'
import { json } from 'stream/consumers'

export const getProverbs = () => {
  JSON.parse(fs.readFileSync('proverbs.json', 'utf-8'))
}

export const saveProverbs = proverbs => {
  fs.writeFileSync('proverbs.json', JSON.stringify(proverbs, null, 2))
}
