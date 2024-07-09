import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'
import { Feature, FeatureSchema } from '../Feature'

export const PATHNAME = 'widget-views'


export type Release = TimeStamps & {
  id: string
  /** Release version: `major.minor.patch`  */
  version: string
  /** Description of release changes */
  content: string
  /**
   * Settings of interface, requirements and default values
   * @example
   * {
   *    field: { type: String, default: 0, value: 10, description: "Description" }
   * }
   */
  options: object // TODO: update type
}

export const ReleaseSchema = new mongoose.Schema<Release>({
  version: { type: String, required: true },
  content: { type: String, required: true },
  options: { type: Object, default: {} },
}, { timestamps: true })

export type WidgetView = Feature & {
  releases: Release[]
}

export const WidgetViewSchema = new mongoose.Schema<WidgetView>({
  releases: [ReleaseSchema],
}).add(FeatureSchema)

export const WidgetViewModel = mongoose.model(PATHNAME, WidgetViewSchema)

export default WidgetViewModel
