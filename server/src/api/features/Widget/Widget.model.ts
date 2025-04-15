import mongoose from 'mongoose'
import { ref, Ref } from '@services/Database'
import { Feature, FeatureSchema } from '../Feature'
import { WidgetView } from '../WidgetView'

export const PATHNAME = 'widgets'


export type Widget = Feature & {
  view: Ref<WidgetView>
}

export const WidgetSchema = new mongoose.Schema<Widget>({
  view: ref('widget-views'),
}).add(FeatureSchema)

export const WidgetModel = mongoose.model(PATHNAME, WidgetSchema)

export default WidgetModel
