<template lang='pug'>
.mt-4.container
  .card
  .card-content
    .columns
      .column.is-three-fifths
        .content
          h4 Find out if you are a Visionary or an Integrator by taking our assessments.
          section.registered(v-if='!showForm')
            .tile.tile.is-parent
              article.tile.is-child.notification.is-info
                p.title Success, now Lets start !!
                p.subtitle 
                  b-icon(icon='hand-pointing-right')
                  | You can choose either assessment to begin

          p(v-if='showForm')
            b.beforeStart BEFORE WE START,
            | PLEASE FILL OUT FORM AND REGISTER
          section.form(v-if='showForm')
            form
              h5 
                b-icon(icon='account-edit')
                | Register Form
              ValidationObserver(ref='observer', v-slot='{ invalid }')
                ValidationProvider(
                  rules='required',
                  name='First Name',
                  v-slot='{ errors, valid }'
                )
                  b-field(
                    label='First Name',
                    :label-position='firstName != "" ? "on-border" : "inside"',
                    :type='{ "is-danger": errors[0], "is-success": valid }',
                    :message='errors'
                  ) 
                    b-input.mb-3(
                      placeholder='First Name',
                      v-model='firstName',
                      type='string'
                    ) 
                ValidationProvider(
                  rules='required',
                  name='Last Name',
                  v-slot='{ errors, valid }'
                )
                  b-field(
                    label='Last Name',
                    :label-position='lastName != "" ? "on-border" : "inside"',
                    :type='{ "is-danger": errors[0], "is-success": valid }',
                    :message='errors'
                  )
                    b-input.mb-3(
                      placeholder='Last Name',
                      v-model='lastName',
                      type='string'
                    )
                ValidationProvider(
                  rules='required|email',
                  name='Last Name',
                  v-slot='{ errors, valid }'
                )
                  b-field(
                    label='Email',
                    :label-position='email != "" ? "on-border" : "inside"',
                    :type='{ "is-danger": errors[0], "is-success": valid }',
                    :message='errors'
                  )
                    b-input.mb-3(
                      placeholder='Email',
                      v-model='email',
                      type='email'
                    )
                b-button.is-info(@click='register', :disabled='invalid') Register
      .column
        .tile
          .tile.is-parent
            article.tile.is-child.notification.is-dark.is-light
              p.title It will only take you a few minutes !!
              nuxt-link(:to='registered ? "/visionary/1" : "/"')
                b-button.fbutton(
                  type='is-primary  mr-3',
                  expanded,
                  @click='checkForm(true)'
                ) Visionary Assessment
              h3.or or
              nuxt-link(:to='registered ? "/integrator/1" : "/"')
                b-button.fbutton(
                  type='is-AppGreen  ml-3',
                  expanded,
                  @click='checkForm(false)'
                ) Integrator Assessment
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      showForm: true,
      registered: false,
    }
  },
  methods: {
    checkForm(payload) {
      if (!this.registered) {
        this.notRegistered()
      } else {
        this.$store.dispatch('visionary/isVisionary', payload)
      }
    },
    notRegistered() {
      this.$buefy.toast.open({
        message:
          'Please Fill out Register Form and Register, to start assessment',
        type: 'is-danger',
        duration: 5000,
        // position: 'is-bottom',
      })
    },
    register() {
      this.$store.dispatch('register/registerUser', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      })
      this.showForm = false
      this.registered = true
    },
  },
  mounted() {
    this.$store.dispatch('register/resetState')
    this.$store.dispatch('visionary/resetState')
    this.$store.dispatch('integrator/resetState')
    localStorage.removeItem('vuex')
  },
  computed: mapState({
    user: (state) => state.register.user,
  }),
}
</script>
<style  scoped>
.fbutton {
  font-size: 1.5em;
}
.or {
  font-size: 2em;
  text-align: center;
}
.beforeStart {
  font-size: 1.5em;
  color: hsl(171, 100%, 41%);
}
.form {
  width: 90%;
}
</style>