import mongoose from 'mongoose'
import { Guide } from './Guide.model'

export default Array.from({length: 10}, (_, i): Guide => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: `NAME_${i}`,
  content: `
  <h3>Title ${i}</h3>
  <p>${"content ".repeat(100)}</p>
  <img style="width: 100%; height: 300px;">
  `.repeat(10),
  disabled: i % 2 === 1
}))
