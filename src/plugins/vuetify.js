import Vue from 'vue'
import Vuetify, {
  VRow,
  VCol,
  VTextField,
  VTooltip,
  VCheckbox,
  VSelect } from 'vuetify/lib'
  import { Ripple, Intersect, Touch, Resize } from 'vuetify/lib/directives'
import i18n from '@/i18n'

Vue.use(Vuetify, {
  components: { VRow, VTooltip, VCol, VTextField, VCheckbox, VSelect },
  directives: { Ripple, Intersect, Touch, Resize },
})

const theme = {
  primary: '#2e88bf',
  secondary: '#32405d',
  accent: '#9C27b0',
  info: '#00CAE3',
  error: '#FF3347',
  watch: '#2196F3',
  edit: '#388E3C',
  delete: '#E53935',
}

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
