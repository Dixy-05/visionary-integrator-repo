<template lang="pug">
div
  .container.mt-3
    .topDiv
      .column
        .columns
          .column.is-two-thirds.is-three-fifths-tablet
            h1.assessmentTitle INTEGRATOR INDICATOR ASSESSMENT
          .column.is-flex.is-align-items-center.is-justify-content-end
            b-tag(type='is-info', size='is-medium') #1 rarely describes you and #5 describes you
        .columns
          .column
            card(
              :key='current',
              :getAnswer='getAnswer',
              cardNumber='one',
              :statement='statements.data[0].text',
              :loading='loading'
            )
          .column
            card(
              :key='current',
              :getAnswer='getAnswer',
              cardNumber='two',
              :statement='statements.data[1].text',
              :loading='loading'
            )
        .columns
          .column
            card(
              :key='current',
              :getAnswer='getAnswer',
              cardNumber='three',
              :statement='statements.data[2].text',
              :loading='loading'
            )
          .column
            card(
              :key='current',
              :getAnswer='getAnswer',
              cardNumber='four',
              :statement='statements.data[3].text',
              :loading='loading'
            )
        .columns
          .column.is-four-fifths
            section
              b-steps(
                size='is-medium',
                type='is-base',
                :has-navigation='false',
                v-model='stepPage'
              )
                b-step-item(icon='numeric-1', :clickable='false')
                b-step-item(icon='numeric-2', :clickable='false')
                b-step-item(icon='numeric-3', :clickable='false')
                b-step-item(icon='numeric-4', :clickable='false')
                b-step-item(icon='numeric-5', :clickable='false')

          .column.is-flex.is-justify-content-end
            div
              nuxt-link(
                :to='{ path: `/integrator`, query: { page: current } }',
                v-if='current < 5'
              )
                b-button(
                  type='is-base',
                  label='Next Page',
                  icon-right='chevron-right',
                  @click='sendToStore'
                )
            div
              nuxt-link(
                :to='visionaryCompleted ? { path: "/result" } : { path: `/visionary` }',
                v-if='current == 5'
              )
                b-button(
                  type='is-base',
                  :label='visionaryCompleted ? "Get Results" : "Visionary Assessment"',
                  icon-right='chevron-right',
                  @click='lastAnswerToStore'
                )
</template>
<script>
import { mapState } from 'vuex'
import Fetch from '@/server/api.js'
import Card from '@/components/Card.vue'
export default {
  name: 'integratorPage',
  components: {
    Card,
  },
  layout: 'assessment',
  scrollToTop: true,
  fetchOnServer: false,
  data() {
    return {
      cards: {
        one: 3,
        two: 3,
        three: 3,
        four: 3,
      },
      current: 1,
      stepPage: 0,
    }
  },
  async fetch({ store, error, route }) {
    try {
      await store.dispatch('integrator/fetchStatements', {
        perPage: 4,
        page: +route.query.page || 1,
      })
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch statements at this time. Please try again.',
      })
    }
  },

  computed: mapState({
    userId: (state) => state.register.user,
    arrOne: (state) => state.integrator.one,
    arrTwo: (state) => state.integrator.two,
    arrThree: (state) => state.integrator.three,
    arrFour: (state) => state.integrator.four,
    arrFive: (state) => state.integrator.five,
    statements: (state) => state.integrator.statements,
    loading: (state) => state.integrator.isLoading,
    // finding out if visionary assessment is completed
    visionaryCompleted: (state) => state.integrator.visionaryIsCompleted,
  }),
  methods: {
    getAnswer(number, cardNumber) {
      this.cards[cardNumber] = number
    },

    sendToStore() {
      const cardsArr = Object.values(this.cards)
      const arr = ['one', 'two', 'three', 'four', 'five']
      for (let i = 0; i < arr.length; i++) {
        cardsArr
          .filter((num) => +num === i + 1)
          .forEach((num) =>
            this.$store.dispatch('integrator/sendNumber', {
              number: num,
              stateProp: arr[i],
            })
          )
      }
      // clear cards answers
      for (let i = 0; i < 4; i++) {
        this.$data.cards[arr[i]] = 3
      }
      this.nextPage()
    },
    async nextPage() {
      this.stepPage++
      this.current++
      this.$store.dispatch('integrator/isLoading', true)
      try {
        await this.$store.dispatch('integrator/fetchStatements', {
          perPage: 4,
          page: this.current,
        })
      } catch (err) {
        return { err }
      }
    },
    lastAnswerToStore() {
      // sending completion to visionary state
      this.current === 5 &&
        this.$store.dispatch('visionary/integratorIsCompleted', true)
      // send last result to store
      const cardsArr = Object.values(this.cards)
      const arr = ['one', 'two', 'three', 'four', 'five']
      for (let i = 0; i < arr.length; i++) {
        cardsArr
          .filter((num) => +num === i + 1)
          .forEach((num) =>
            this.$store.dispatch('integrator/sendNumber', {
              number: num,
              stateProp: arr[i],
            })
          )
      }
      this.sendToDataBase()
    },
    async sendToDataBase() {
      // send to Database
      await Fetch.sendToIntegrator({
        one: this.arrOne.length,
        two: this.arrTwo.length,
        three: this.arrThree.length,
        four: this.arrFour.length,
        five: this.arrFive.length,
        userId: this.userId.data.id,
      })
    },
  },
}
</script>
<style  scoped>
.topDiv {
  height: 1rem;
  background: hsl(172, 99%, 30%);
}
.assessmentTitle {
  color: #712a96;
  font-size: 2em;
  font-weight: bold;
}
@media only screen and (max-width: 440px) {
  .assessmentTitle {
    margin-top: 1.5em;
    font-size: 1.5em;
    text-align: center;
  }
}
</style>