import mongoose from 'mongoose'
import { Feature, FeatureSchema } from '../Feature'

export const PATHNAME = 'translates'

/** 
 * 20 top languages.
 *
 * [en] [1.5B] English - It is the global language of business, science, international relations, and the Internet.  
 * [zh] [1.1B] Chinese (Mandarin) - The most widely spoken language by number of native speakers, the main language of China.  
 * [hi] [650M] Hindi - The official language of India, often studied as a second language in the country.  
 * [es] [550M] Spanish - The official language of most Latin American countries, Spain, and a significant part of the United States.  
 * [ar] [400M] Arabic - The official language of many countries in the Middle East and North Africa. Divided into many dialects.  
 * [fr] [300M] French - Present in Europe, Africa, Canada, and is popular as a second/foreign language.  
 * [bn] [270M] Bengali (Bengali) - The main language of Bangladesh and the state of West Bengal in India.  
 * [pt] [260M] Portuguese - Common in Portugal, Brazil, Angola, Mozambique and other countries.  
 * [ru] [260M] Russian - The main language in Russia, the CIS countries and many Russian-speaking communities around the world.  
 * [ur] [230M] Urdu - The official language of Pakistan, also widely used in India.  
 * [id] [215M] Indonesian (Bahasa Indonesia) - The lingua franca of Indonesia.  
 * [de] [130M] German - The main language of Germany, Austria, part of Switzerland and other countries.  
 * [ja] [125M] Japanese - Used almost exclusively in Japan.  
 * [pa] [100M] Punjabi - Common in Indian Punjab and Pakistan.  
 * [ko] [80M] Korean - Used in Korea (North and South) and diasporas.  
 * [tr] [80M] Turkish - The main language of Turkey and adjacent regions.  
 * [vi] [77.5M] Vietnamese - The main language of Vietnam.  
 * [ta] [75M] Tamil - One of the oldest languages ​​in the world, spoken in southern India and Sri Lanka.  
 * [fa] [70M] Persian (Farsi) - The main language of Iran, Afghanistan (Dari) and Tajikistan (Tajik).  
 * [it] [67.5M] Italian - The main language of Italy and parts of Switzerland.  
*/
export type TranslateLanguage =  'en' | 'zh' | 'hi' | 'es' | 'ar' | 'fr' | 'bn' | 'pt' | 'ru' | 'ur' | 'id' | 'de' | 'ja' | 'pa' | 'ko' | 'tr' | 'vi' | 'ta' | 'fa' | 'it'
export type TranslateType = 'ACTION' | 'LABEL' | 'MESSAGE'
export type TranslateFormat = 'UPPERCASE' | 'LOWERCASE' | 'CAPITALIZE' | 'TITLE_CASE' | ({} & string) // for regex

const LANGUAGES: TranslateLanguage[] = ['en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'pt', 'ru', 'ur', 'id', 'de', 'ja', 'pa', 'ko', 'tr', 'vi', 'ta', 'fa', 'it']

export type TranslateItem = {
  type?: TranslateType
  lang?: TranslateLanguage
  format?: TranslateFormat
  text: string
  key?: string
}

export const TranslateItemSchema = new mongoose.Schema<TranslateItem>({
  type: { type: String, default: 'LABEL', enum: ['ACTION', 'LABEL', 'MESSAGE'] },
  lang: { type: String, default: 'en', enum: LANGUAGES },
  format: { type: String, default: 'LABEL', enum: ['UPPERCASE', 'LOWERCASE', 'CAPITALIZE', 'TITLE_CASE'] },
  text: { type: String, required: true },
  key: { type: String },
})

export type Translate = Feature & {
  items: TranslateItem[]
}

export const TranslateSchema = new mongoose.Schema<Translate>({
  items: { type: [TranslateItemSchema], default: [] },
}).add(FeatureSchema)


TranslateSchema.virtual('options').get(function() {
  return this.items.reduce((acc, item) => {
    for (const lang of LANGUAGES) {
      if (!acc[lang]) {
        acc[lang] = {}
      }
      acc[lang][item.key ?? item.text] = item.text
      // TODO: create separated model for all translates to prevent new generations (generates automatically via ChatGPT/google translate)
      // TODO: generate translate for all languages on create, update
    }

    return acc
  }, {} as Record<TranslateLanguage, Record<string, string>>)
})

export const TranslateModel = mongoose.model(PATHNAME, TranslateSchema)

export default TranslateModel
