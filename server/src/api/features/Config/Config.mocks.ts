import mongoose from 'mongoose'
import { Config } from './Config.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): Config => ({
  ...feature[i],
  options: {
    domain: 'localhost:3000',
    interval: 1000 * 60 * 5,
    bordered: true,
    css: {
      "--primary": "#444",
      "--secondary": "#222",
    }, 
    theme: {
      light: { border: '1px solid red' },
      dark: { border: '1px solid blue' },
    }
  }
}))
