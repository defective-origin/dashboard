import mongoose from 'mongoose'
import { ref, Ref } from '@services/Database'
import { Feature, FeatureSchema } from '../Feature'
import { WidgetView } from '../WidgetView'

export const PATHNAME = 'widgets'


export type Widget = Feature & {
  view: Ref<WidgetView>
  // version: string
}

export const WidgetSchema = new mongoose.Schema<Widget>({
  view: ref('widget-views'),
  // version: { type: String, required: true },
}).add(FeatureSchema)

export const WidgetModel = mongoose.model(PATHNAME, WidgetSchema)

export default WidgetModel
