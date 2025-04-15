import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'
import { Feature, FeatureSchema } from '../Feature'

export const PATHNAME = 'widget-views'

export type WidgetView = Feature

export const WidgetViewSchema = new mongoose.Schema<WidgetView>({}).add(FeatureSchema)

export const WidgetViewModel = mongoose.model(PATHNAME, WidgetViewSchema)

export default WidgetViewModel
