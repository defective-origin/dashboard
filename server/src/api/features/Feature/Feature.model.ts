import mongoose from 'mongoose'
import { ChangeStamps } from '@services/Database'

export const PATHNAME = 'features'


export type FeatureReview = ChangeStamps & {
  id: string
  rate: number
  content: string
}

export const FeatureReviewSchema = new mongoose.Schema<FeatureReview>({
  rate: { type: Number, required: true },
  content: { type: String, default: '', maxlength: 1000 },
}, { ChangeStamps: true })



export type Feature = ChangeStamps & {
  id: string
  name: string
  price: number
  content: string
  public: boolean
  tags: string[] // TODO: add tag schema?
  /**
   * Widget options: setup widget behavior  
   * Board options: value which is passed in each widget and can be changed by widgets  
   * @example
   * {
   *  theme: 'light',
   *  language: 'en',
   *  service: {
   *    url: '{{API}}/api/items',
   *    headers: {
   *      Authorization: 'Bearer {{ACCESS_TOKEN}}',
   *    },
   *  },
   *  // map one data type to another type
   *  mapper: {
   *    'a.b': 'a.c.d',
   *    'b[0]': 'b',
   *  },
   *  styles: {
   *    border: '{{VAR_NAME}}',
   *    background: 'gray',
   *  },
   *  filters: {
   *    from: '2011-10-05T14:48:00.000Z',
   *    to: '2011-10-05T14:48:00.000Z',
   *  },
   * }
   */
  options: object
  reviews: FeatureReview[]
  // attach
  // support?: []
  // income: object
  // usage: number
}

export const FeatureSchema = new mongoose.Schema<Feature>({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  content: { type: String, default: '', maxlength: 4000 },
  public: { type: Boolean, default: true },
  tags: { type: [String], default: [] },
  options: { type: Object, default: {} },
  reviews: { type: [FeatureReviewSchema], default: [] },
}, { ChangeStamps: true })

FeatureSchema.virtual('rate').get(function() {
  return this.reviews.reduce((sum, review) => sum + review.rate, 0) / this.reviews.length
})

