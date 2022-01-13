<template lang="pug">
div
  .container.mt-3
    .topDiv
      .column
        .columns
          .column.is-two-thirds.is-three-fifths-tablet
            h1.assessmentTitle VISIONARY INDICATOR ASSESSMENT
          .column.is-flex.is-align-items-center.is-justify-content-end
            b-tag(type='is-info', size='is-medium') #1 rarely describes you and #5 describes you
        .columns
          .column(v-for='(item, index) in chunk')
            card(
              :key='index',
              :cardAnswer='setCardAnswer',
              :statement='statements.data[0].text',
              :loading='loading',
              cardName=`card${index}`
            )

        .columns
          .column.is-9
            section
              b-steps(
                size='is-medium',
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
                :to='{ path: `/visionary`, query: { page: current } }',
                v-if='current < 5'
              )
                b-button(
                  type='is-primary',
                  label='Next Page',
                  icon-right='chevron-right',
                  @click='sendToStore',
                  :disabled='notCompleted'
                )
            div
              b-button(
                v-if='current == 5',
                type='is-primary',
                :label='integratorCompleted ? "Get Results" : "Integrator Assessment"',
                icon-right='chevron-right',
                @click='lastAnswerToStore',
                :disabled='notCompleted',
                :loading='buttonLoading'
              )
</template>
<script>
import { mapState } from 'vuex'
import Post from '@/server/api.js'
import Card from '@/components/Card.vue'
export default {
  name: 'visionaryPage',
  components: {
    Card,
  },
  layout: 'assessment',
  scrollToTop: true,
  fetchOnServer: false,
  data() {
    return {
      cardsAnswer: {
        card1: '',
        cardTwo: '',
        cardThree: '',
        cardFour: '',
      },
      notCompleted: true,
      current: 1,
      stepPage: 0,
      buttonLoading: false,
    }
  },
  async fetch({ store, error, route }) {
    // store.dispatch('visionary/sendCurrentPage',1);
    try {
      await store.dispatch('visionary/fetchStatements', {
        perPage: 4,
        page: +route.query.page || 1,
      })
      // console.log(store.state.visionary.isLoading)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch statements at this time. Please try again.',
      })
    }
  },

  computed: mapState({
    userId: (state) => state.register.user,
    arrOne: (state) => state.visionary.one,
    arrTwo: (state) => state.visionary.two,
    arrThree: (state) => state.visionary.three,
    arrFour: (state) => state.visionary.four,
    arrFive: (state) => state.visionary.five,
    statements: (state) => state.visionary.statements,
    loading: (state) => state.visionary.isLoading,
    // finding out if integrator assessment is completed
    integratorCompleted: (state) => state.visionary.integratorIsCompleted,
    chunk: (state) => {},
  }),
  methods: {
    setCardAnswer(number, cardNumber) {
      this.cardsAnswer[cardNumber] = number
      this.checkAllAnswers()
    },
    checkAllAnswers() {
      Object.values(this.cards).every((value) => value !== '')
        ? (this.notCompleted = false)
        : (this.notCompleted = true)
    },

    sendToStore() {
      const cardsArr = Object.values(this.cards)
      const arr = ['one', 'two', 'three', 'four', 'five']
      for (let i = 0; i < arr.length; i++) {
        cardsArr
          .filter((num) => +num === i + 1)
          .forEach((num) =>
            this.$store.dispatch('visionary/sendNumber', {
              number: num,
              stateProp: arr[i],
            })
          )
      }
      // clear cards answers
      for (let i = 0; i < 4; i++) {
        this.$data.cards[arr[i]] = ''
      }
      this.notCompleted = true
      this.nextPage()
    },
    async nextPage() {
      this.stepPage++
      this.current++
      this.$store.dispatch('visionary/isLoading', true)
      try {
        await this.$store.dispatch('visionary/fetchStatements', {
          perPage: 4,
          page: this.current,
        })
      } catch (err) {
        return { err }
      }
    },
    lastAnswerToStore() {
      // sending completion to integrator state
      this.current === 5 &&
        this.$store.dispatch('integrator/visionaryIsCompleted', true)
      // send last result to store
      const cardsArr = Object.values(this.cards)
      const arr = ['one', 'two', 'three', 'four', 'five']
      for (let i = 0; i < arr.length; i++) {
        cardsArr
          .filter((num) => +num === i + 1)
          .forEach((num) =>
            this.$store.dispatch('visionary/sendNumber', {
              number: num,
              stateProp: arr[i],
            })
          )
      }

      this.sendToDataBase()
    },
    async sendToDataBase() {
      this.buttonLoading = true
      // send to Database
      const response = await Post.sendToVisionary({
        one: this.arrOne.length,
        two: this.arrTwo.length,
        three: this.arrThree.length,
        four: this.arrFour.length,
        five: this.arrFive.length,
        userId: this.userId.data.id,
      })
      if (response.status === 201) {
        this.integratorCompleted
          ? this.$router.push({
              name: 'result',
            })
          : this.$router.push({ name: 'integrator' })
      }
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