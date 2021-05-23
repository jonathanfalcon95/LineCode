export const uniqueUser = async value =>
  value ? value.match(/^[\w.-]+$/i) : true
export const validPassword = async value =>
  value
    ? value.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{0,32}$/)
    : true
export const validSubdomain = async value =>
  value ? value.match(/^[a-zA-Z0-9-]+$/i) : true
export const validEmail = async value =>
  value ? value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/) : true
export const validNumber = async value => (value ? !isNaN(value) : true)

// Helper & Partial Functions
const minLen = l => v => (v && v.length >= l) || `min. ${l} Characters`
const maxLen = l => v => (v && v.length <= l) || `max. ${l} Characters`
const required = msg => v => !!v || msg
const requiredArray = msg => v => (Array.isArray(v) && v.length > 1) || msg
// Rules

export const rules = {
  requiredEmail: required('Correo es requerido'),
  requiredSel: required('Requerido'),
  requiredSelMult: requiredArray('2 Selections are required'),
  max12: maxLen(12),
  min6: minLen(6),
  validEmail: v => /.+@.+\..+/.test(v) || 'Correo no valido',
}
