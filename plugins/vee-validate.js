import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { confirmed, email, length, required } from 'vee-validate/dist/rules'

import Vue from 'vue'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'This field must be a valid email',
})

extend('confirmed', {
  ...confirmed,
  message: 'This field confirmation does not match',
})

extend('length', {
  ...length,
  message: 'This field must have 2 options',
})

// extend('my-validation', {
//   message: 'This {_field_} is invalid.',
//   validate: (value) => {
//     // ...
//     return true
//   },
// })
