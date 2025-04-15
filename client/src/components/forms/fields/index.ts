import TextFormField from './TextField'
import TagsFormField from './TagsField'
import JsonFormField from './JsonField'
import NumberFormField from './NumberField'
import SliderFormField from './SliderField'
import CheckboxFormField from './CheckboxField'
import CheckboxListFormField from './CheckboxListField'
import RadioFormField from './RadioField'
import RadioGroupField from './RadioGroupField'
import SwitchFormField from './SwitchField'
import SelectFormField from './SelectField'
import CssSizeFormField from './CssSizeField'

// TODO: add UrlField, FileField, ColorField, ImageField, DateField, DateRangeField
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
  Tags: TagsFormField,
  CssSize: CssSizeFormField,
}
