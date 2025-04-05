import TextFormField from './TextField'
import JsonFormField from './JsonField'
import NumberFormField from './NumberField'
import SliderFormField from './SliderField'
import CheckboxFormField from './CheckboxField'
import CheckboxListFormField from './CheckboxListField'
import RadioFormField from './RadioField'
import RadioGroupField from './RadioGroupField'
import SwitchFormField from './SwitchField'
import SelectFormField from './SelectField'

export default {
  Text: TextFormField,
  Json: JsonFormField,
  Number: NumberFormField,
  Slider: SliderFormField,
  Checkbox: CheckboxFormField,
  CheckboxList: CheckboxListFormField,
  Radio: RadioFormField,
  RadioGroup: RadioGroupField,
  Switch: SwitchFormField,
  Select: SelectFormField,
}
