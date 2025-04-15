import mongoose from 'mongoose'
import { ref, Ref } from '@services/Database'
import { Feature, FeatureReview, FeatureReviewSchema, FeatureSchema } from '../Feature'
import { Translate } from '../Translate/Translate.model'
import { Config } from '../Config/Config.model'

export const PATHNAME = 'widgets'


export type Widget = Feature & {
  price: number
  reviews: FeatureReview[]
  config?: Ref<Config>
  translate?: Ref<Translate>
  // support?: []
  // income: object
  // usage: number
}

export const WidgetSchema = new mongoose.Schema<Widget>({
  price: { type: Number, default: 0 },
  reviews: { type: [FeatureReviewSchema], default: [] },
  config: ref('configs'),
  translate: ref('translates'),
}).add(FeatureSchema)


WidgetSchema.virtual('rate').get(function() {
  return this.reviews.reduce((sum, review) => sum + review.rate, 0) / this.reviews.length
})

WidgetSchema.virtual('snapshot').get(function() {
  return `images/snapshots/${this.id}`
})

export const WidgetModel = mongoose.model(PATHNAME, WidgetSchema)

export default WidgetModel
