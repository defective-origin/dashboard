import mongoose from 'mongoose'
import { ChangeStamps, ref, Ref } from '@services/Database'

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
  content: string
  public: boolean
  tags: string[] // TODO: add tag schema! // TODO: should be merge with  parent feature tags [...a, ...b]
  /**
   * Base configurations which are merged by feature parent key  
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
  options: object // TODO: change on Ref<Config> Ref<Options> can be nested
  parent?: Ref<Feature>
}

export const FeatureSchema = new mongoose.Schema<Feature>({
  name: { type: String, required: true },
  content: { type: String, default: '', maxlength: 4000 },
  public: { type: Boolean, default: true },
  tags: { type: [String], default: [] },
  options: { type: Object, default: {} },
  parent: ref(),
}, { ChangeStamps: true })

