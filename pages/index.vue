<template lang='pug'>
  div(class="mt-4 container")
    .card
    .card-content
      .columns
        .column(class="is-three-fifths")
          .content
            h4 Find out if you are a Visionary or an Integrator by taking our assessments. 
            section.registered(v-if="!showForm")
              .tile(class="tile is-parent")
                article(class="tile is-child notification is-info")
                  p.title Success, now Lets start !!
                  p.subtitle 
                    b-icon(icon="hand-pointing-right")
                    |You can choose either assessment to begin 
                  
            p(v-if="showForm")
              b.beforeStart BEFORE WE START, 
              |PLEASE FILL OUT FORM AND REGISTER
            section.form(v-if="showForm")
              form(@submit.prevent="click")
                h5 
                  b-icon(icon="account-edit")
                  |Register Form
                ValidationObserver(ref="observer" v-slot="{invalid}")
                  ValidationProvider.field(rules="required" name="First Name" v-slot="{errors,valid}")
                    b-field(label="First Name" :label-position="firstName!=''?'on-border':'inside'" :type="{'is-danger':errors[0],'is-success':valid}" :message="errors") 
                      b-input(class="mb-3" placeholder="First Name" v-model="firstName" type='string' ) 
                  ValidationProvider.field(rules="required" name="Last Name" v-slot="{errors,valid}")
                    b-field(label="Last Name" :label-position="lastName!=''?'on-border':'inside'" :type="{'is-danger':errors[0],'is-success':valid}" :message="errors")
                      b-input(class="mb-3" placeholder="Last Name" v-model="lastName" type='string')
                  ValidationProvider.field(rules="required|email" name="Last Name" v-slot="{errors,valid}")
                    b-field(label="Email" :label-position="email!=''?'on-border':'inside'" :type="{'is-danger':errors[0],'is-success':valid}" :message="errors" )
                      b-input(class="mb-3" placeholder="Email" v-model="email" type='email' )
                b-button(class="is-info" @click="register" :disabled="invalid") Register
        .column
          .tile
            .tile(class="is-parent")
              article(class="tile is-child notification is-dark is-light")
                p.title It will only take you a few minutes !!
                b-button.fbutton(type="is-primary mr-3" expanded @click="checkForm" ) Visionary Assessment
                h3.or or
                b-button.fbutton(type="is-AppGreen ml-3" expanded @click="checkForm") Integrator Assessment

      
    //- footer.card-footer(class="mb-3")
    //-   b-button.fbutton(type="is-primary mr-3" expanded ) Visionary Assessment
    //-   h3.or or
    //-   b-button.fbutton(type="is-AppGreen ml-3" expanded) Integrator Assessment
</template>

<script>
// import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  data(){
    return{
      firstName:'',
      lastName:'',
      email:'',
      showForm:true
    }
  },
  methods:{
    checkForm(){
      return(this.firstName!=="" && this.lastName!=="" && this.email!=="")? (this.success()):(this.fail())
    },
success() {
  this.$buefy.toast.open({
    message: ' Yay!!All good',
    type: 'is-warning',
    duration: 5000,
    position: 'is-bottom',
    })
    },
fail() {
  this.$buefy.toast.open({
    message: 'Please Fill out Register Form and Register, to start assessment',
    type: 'is-danger',
    duration: 5000,
    // position: 'is-bottom',
    })
    },
    register(){
      this.showForm=false

    }
  }
}
</script>
<style  scoped>
.fbutton{
  font-size: 1.5em;
}
.or{
  font-size:2em;
  text-align: center;
}
.beforeStart{
  font-size:1.5em;
  color:hsl(171, 100%, 41%)
}
.form{
  width: 90%;
}
</style>