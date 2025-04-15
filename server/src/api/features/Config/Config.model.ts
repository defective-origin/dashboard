import mongoose from 'mongoose'
import { Feature, FeatureSchema } from '../Feature'

export const PATHNAME = 'configs'


export type Config = Feature & {}

export const ConfigSchema = new mongoose.Schema<Config>({}).add(FeatureSchema)

export const ConfigModel = mongoose.model(PATHNAME, ConfigSchema)

export default ConfigModel
