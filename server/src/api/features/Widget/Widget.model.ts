import mongoose from 'mongoose'
import { ref, Ref } from '@services/Database'
import { Feature, FeatureSchema } from '../Feature'

export const PATHNAME = 'widgets'


export type Widget = Feature & {
  parent?: Ref<Widget>
}

export const WidgetSchema = new mongoose.Schema<Widget>({
  parent: ref('widgets', { required: false }),
}).add(FeatureSchema)

export const WidgetModel = mongoose.model(PATHNAME, WidgetSchema)

export default WidgetModel
