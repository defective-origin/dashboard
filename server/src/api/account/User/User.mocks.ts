import mongoose from 'mongoose'
import { User } from './User.model'

export default Array.from({length: 10}, (_, i): User => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: `NAME_${i}`,
  email: `NAME_${i}@mail.com`,
  image: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Photos.png",
  role: 'ADMIN',
  status: 'ACTIVE',
  settings: {
    language: 'en',
    theme: i % 2 ? 'LIGHT' : 'DARK',
  },
  staff: [],
  bookmarks: [],
}))
