import mongoose from 'mongoose'
import { Feature, FeatureSchema } from '../Feature'

export const PATHNAME = 'translates'

/** 
 * Top languages.
 * [en] [1.493B] [L1: 372M / L2: 1.121B] English - Global language of business, science, international relations, and the Internet.  
 * [zh] [1.183B] [L1: 988M / L2: 194M] Chinese (Mandarin) - Official language of China, Taiwan, and Singapore, used heavily in global trade.  
 * [hi] [611M] [L1: 347M / L2: 264M] Hindi - Official language of the Indian government, serving as a lingua franca across northern and central India.  
 * [es] [561M] [L1: 487M / L2: 75M] Spanish - Official language of Spain, most Latin American countries, and a significant part of the United States.  
 * [arb] [335M] [L2: 335M] Modern Standard Arabic - Used primarily as an academic, literary, and media language across the Middle East and North Africa.  
 * [fr] [334M] [L1: 75M / L2: 258M] French - Spoken in Europe, Africa, and Canada, widely used as an international administrative language.  
 * [bn] [274M] [L1: 234M / L2: 43M] Bengali - Official language of Bangladesh and the Indian state of West Bengal.  
 * [pt] [269M] [L1: 252M / L2: 18M] Portuguese - Spoken natively in Brazil, Portugal, Angola, Mozambique, and other nations.  
 * [id] [255M] [L1: 78M / L2: 177M] Indonesian - The official language and unifying lingua franca of the Indonesian archipelago.  
 * [ur] [246M] [L1: 78M / L2: 168M] Urdu - Official language of Pakistan, also widely spoken across northern parts of India.  
 * [ru] [210M] [L1: 133M / L2: 77M] Russian - Major language of the Russian Federation, CIS countries, and various global immigrant communities.  
 * [de] [133M] [L1: 75M / L2: 58M] German - Principal language of Germany, Austria, and parts of Switzerland.  
 * [ja] [126M] [L1: 125M / L2: 1M] Japanese - Spoken almost exclusively in Japan and within Japanese diasporas.  
 * [pcm] [121M] [L1: 30M / L2: 91M] Nigerian Pidgin - An English-based creole that acts as the commercial and cultural lingua franca of Nigeria.  
 * [arz] [118M] [L1: 77M / L2: 41M] Egyptian Arabic - The most widely spoken and culturally influential regional dialect of Arabic.  
 * [mr] [99M] [L1: 83M / L2: 16M] Marathi - Official language of the Indian state of Maharashtra, including Mumbai.  
 * [vi] [97M] [L1: 85M / L2: 12M] Vietnamese - The national and official language of Vietnam.  
 * [te] [96M] [L1: 83M / L2: 13M] Telugu - A major Dravidian language spoken in the south Indian states of Andhra Pradesh and Telangana.  
 * [sw] [95M] [L1: 4M / L2: 91M] Swahili - The dominant trade and diplomatic lingua franca of East Africa (Kenya, Tanzania, Uganda).  
 * [ha] [94M] [L1: 54M / L2: 40M] Hausa - Major indigenous language of West Africa, used heavily in trade across Nigeria and Niger.  
 * [tr] [94M] [L1: 82M / L2: 12M] Turkish - The primary language of Turkey, Northern Cyprus, and adjacent areas.  
 * [pnb] [90M] [L1: 89M / L2: 1M] Western Punjabi - Spoken primarily in the Punjab province of Pakistan.  
 * [tl] [87M] [L1: 28M / L2: 59M] Tagalog (Filipino) - The national language of the Philippines, bridging hundreds of islands.  
 * [yue] [86M] [L1: 85M / L2: 1M] Yue (Canton) - A branch of Chinese spoken in Hong Kong, Macau, and the Guangdong province.  
 * [ta] [86M] [L1: 78M / L2: 8M] Tamil - A classical Dravidian language spoken in southern India (Tamil Nadu), Sri Lanka, and Singapore.  
 * [wuu] [83M] [L1: 82M / L2: 1M] Wu (Shanghai) - A branch of Chinese spoken natively in Shanghai and the surrounding regions.  
 * [ko] [82M] [L1: 81M / L2: 1M] Korean - The national language of North and South Korea, and various overseas diasporas.  
 * [fa] [82M] [L1: 57M / L2: 25M] Persian - Official language of Iran, also mutually intelligible with Dari (Afghanistan) and Tajiki.  
 * [am] [78M] [L1: 32M / L2: 46M] Amharic - The official working language of Ethiopia and the second-most spoken Semitic language.  
 * [th] [71M] [L1: 61M / L2: 10M] Thai - The national and official language of Thailand.  
 * [jv] [69M] [L1: 68M / L2: 1M] Javanese - The language of the Javanese people, spoken natively on the island of Java, Indonesia.  
 * [it] [66M] [L1: 65M / L2: 1M] Italian - The official language of Italy and parts of southern Switzerland.  
 * [gu] [62M] [L1: 57M / L2: 5M] Gujarati - Language of the state of Gujarat in western India, home to a large global merchant diaspora.  
 * [kn] [59M] [L1: 44M / L2: 15M] Kannada - A major Dravidian language spoken in the southwestern Indian state of Karnataka.  
 * [apc] [58M] [L1: 44M / L2: 14M] Levantine Arabic - Spoken across the Levant region (Lebanon, Syria, Jordan, Palestine).  
 * [apd] [54M] [L1: 33M / L2: 21M] Sudanese Arabic - The dominant dialect spoken in Sudan and parts of South Sudan.  
 * [yo] [53M] [L1: 44M / L2: 9M] Yoruba - Spoken in southwestern Nigeria and parts of Benin and Togo.  
 * [bho] [53M] [L1: 52M / L2: 1M] Bhojpuri - Spoken in northern-central India (Bihar, UP) and natively in parts of Nepal.  
 * [pl] [45M] [L1: 40M / L2: 5M] Polish - The primary national language of Poland and Polish communities abroad.  
 * [ms] [45M] [L1: 19M / L2: 26M] Malay - The national language of Malaysia and Brunei, closely related to Indonesian.  
 * [uk] [40M] [L1: 33M / L2: 7M] Ukrainian - The official state language of Ukraine, spoken across Eastern Europe.  
 * [ml] [38M] [L1: 37M / L2: 1M] Malayalam - A Dravidian language spoken natively in the southern Indian state of Kerala.  
 * [my] [38M] [L1: 34M / L2: 4M] Burmese - The official language of Myanmar (Burma).  
 * [uz] [34M] [L1: 31M / L2: 3M] Uzbek - The national language of Uzbekistan, a major Turkic language of Central Asia.  
 * [or] [35M] [L1: 34M / L2: 1M] Odia - Official language of the eastern Indian state of Odisha.  
 * [ro] [25M] [L1: 24M / L2: 1M] Romanian - The official language of Romania and Moldova.  
 * [nl] [24M] [L1: 23M / L2: 1M] Dutch - Spoken in the Netherlands, northern Belgium (Flanders), and Suriname.  
 * [az] [24M] [L1: 15M / L2: 9M] Azerbaijani - The official state language of Azerbaijan, also widely spoken in northwestern Iran.  
 * [km] [17M] [L1: 16M / L2: 1M] Khmer - The official language of the Kingdom of Cambodia.  
 * [so] [16M] [L1: 15M / L2: 1M] Somali - Spoken natively in Somalia, Somaliland, Djibouti, and eastern Ethiopia.  
 * [kk] [14M] [L1: 10M / L2: 4M] Kazakh - The official state language of Kazakhstan, written in Cyrillic and Latin.  
 * [el] [13M] [L1: 12M / L2: 1M] Greek - The national language of Greece and Cyprus, with an ancient literary history.  
 * [cs] [12M] [L1: 10M / L2: 2M] Czech - The official state language of the Czech Republic.  
 * [hu] [12M] [L1: 11M / L2: 1M] Hungarian - A Finno-Ugric language spoken primarily in Hungary and parts of neighboring countries.  
 * [sv] [10M] [L1: 9M / L2: 1M] Swedish - The national language of Sweden and an official language in parts of Finland.  
 * [bg] [8M] [L1: 7M / L2: 1M] Bulgarian - The official Slavic language of Bulgaria, written in Cyrillic script.  
 * [sr] [8M] [L1: 7M / L2: 1M] Serbian - Spoken in Serbia, Bosnia and Herzegovina, and Montenegro.  
 * [ca] [7.5M] [L1: 4M / L2: 3.5M] Catalan - Spoken natively in Catalonia, Valencia, and the Balearic Islands (Spain/Andorra).  
 * [hy] [6.5M] [L1: 6M / L2: 0.5M] Armenian - The official national language of Armenia, using its own unique alphabet.  
 * [hr] [5.5M] [L1: 5M / L2: 0.5M] Croatian - The official state language of Croatia.  
 * [fi] [5.5M] [L1: 5M / L2: 0.5M] Finnish - The national language of Finland, member of the Finno-Ugric language family.  
 * [da] [5.5M] [L1: 5M / L2: 0.5M] Danish - The official language of Denmark.  
 * [no] [5.3M] [L1: 5M / L2: 0.3M] Norwegian - The official language of Norway, with two written standards (Bokmål and Nynorsk).  
 * [sk] [5M] [L1: 4.5M / L2: 0.5M] Slovak - The official state language of Slovakia.  
 * [ka] [4.5M] [L1: 4M / L2: 0.5M] Georgian - The official language of Georgia, utilizing its own unique Mkhedruli script.  
 * [tg] [4.5M] [L1: 4.2M / L2: 0.3M] Tajik - A variety of Persian spoken natively in Tajikistan.  
 * [tt] [4.2M] [L1: 4M / L2: 0.2M] Tatar - A Turkic language spoken primarily in the Republic of Tatarstan (Russia).  
 * [lt] [3M] [L1: 2.8M / L2: 0.2M] Lithuanian - An official Baltic language of Lithuania, preserving many archaic Proto-Indo-European features.  
 * [sq] [3M] [L1: 2.9M / L2: 0.1M] Albanian - An independent branch of the Indo-European family, spoken in Albania and Kosovo.  
 * [ky] [3M] [L1: 2.8M / L2: 0.2M] Kyrgyz - A Turkic language, the official state language of Kyrgyzstan.  
 * [tk] [3M] [L1: 2.7M / L2: 0.3M] Turkmen - The official state language of Turkmenistan, spoken in Central Asia.  
 * [lv] [2.2M] [L1: 1.5M / L2: 0.7M] Latvian - An official Baltic language spoken in Latvia.  
 * [sl] [2.1M] [L1: 2M / L2: 0.1M] Slovenian - The official state language of Slovenia.  
 * [mk] [2M] [L1: 1.8M / L2: 0.2M] Macedonian - The official South Slavic language of North Macedonia, using Cyrillic.
*/
export type TranslateLanguage = 'en' | 'zh' | 'hi' | 'es' | 'arb' | 'fr' | 'bn' | 'pt' | 'id' | 'ur' | 'ru' | 'de' | 'ja' | 'pcm' | 'arz' | 'mr' | 'vi' | 'te' | 'sw' | 'ha' | 'tr' | 'pnb' | 'tl' | 'yue' | 'ta' | 'wuu' | 'ko' | 'fa' | 'am' | 'th' | 'jv' | 'it' | 'gu' | 'kn' | 'apc' | 'apd' | 'yo' | 'bho' | 'pl' | 'ms' | 'uk' | 'ml' | 'my' | 'uz' | 'or' | 'ro' | 'nl' | 'az' | 'km' | 'so' | 'kk' | 'el' | 'cs' | 'hu' | 'sv' | 'bg' | 'sr' | 'ca' | 'hy' | 'hr' | 'fi' | 'da' | 'no' | 'sk' | 'ka' | 'tg' | 'tt' | 'lt' | 'sq' | 'ky' | 'tk' | 'lv' | 'sl' | 'mk'
export type TranslateType = 'ACTION' | 'LABEL' | 'MESSAGE'
export type TranslateFormat = 'UPPERCASE' | 'LOWERCASE' | 'CAPITALIZE' | 'TITLE_CASE' | ({} & string) // for regex

const LANGUAGES: TranslateLanguage[] = ['en', 'zh', 'hi', 'es', 'arb', 'fr', 'bn', 'pt', 'id', 'ur', 'ru', 'de', 'ja', 'pcm', 'arz', 'mr', 'vi', 'te', 'sw', 'ha', 'tr', 'pnb', 'tl', 'yue', 'ta', 'wuu', 'ko', 'fa', 'am', 'th', 'jv', 'it', 'gu', 'kn', 'apc', 'apd', 'yo', 'bho', 'pl', 'ms', 'uk', 'ml', 'my', 'uz', 'or', 'ro', 'nl', 'az', 'km', 'so', 'kk', 'el', 'cs', 'hu', 'sv', 'bg', 'sr', 'ca', 'hy', 'hr', 'fi', 'da', 'no', 'sk', 'ka', 'tg', 'tt', 'lt', 'sq', 'ky', 'tk', 'lv', 'sl', 'mk']

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
