import account from './account'
import system from  './system'
import payment from  './payment'
import features from  './features'

export default [
  ...system,
  ...payment,
  ...account,
  ...features,
]
