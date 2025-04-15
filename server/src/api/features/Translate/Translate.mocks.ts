import mongoose from 'mongoose'
import { Translate } from './Translate.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): Translate => ({
  ...feature[i],
  
  items: [
    { lang: 'en', type: 'ACTION', key: 'BUTTON_CLOSE', text: 'Close' },
    { lang: 'en', type: 'LABEL', key: 'NAME', text: 'Name' },
    { lang: 'en', type: 'MESSAGE', key: 'NO_ACCESS', text: 'You do not have access.' },
  ],
  options: {}
}))
