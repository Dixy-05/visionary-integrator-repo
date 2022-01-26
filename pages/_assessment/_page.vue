<template lang="pug">
div
  .container.mt-3
    .topDiv
      .column
        .columns
          .column.is-two-thirds.is-three-fifths-tablet
            h1.assessmentTitle(v-if='visionary', style='color: #712a96') VISIONARY INDICATOR ASSESSMENT
            h1.assessmentTitle(v-if='!visionary', style='color: #019884') INTEGRATOR INDICATOR ASSESSMENT
          .column.is-flex.is-align-items-center.is-justify-content-end
            b-tag(type='is-info', size='is-medium') #1 rarely describes you and #5 describes you
        .columns.is-multiline
          .column.is-half(v-for='(item, index) in chunk')
            card(
              :statement='item.text',
              :key='`card-` + index',
              :loading='isLoading',
              :cardNumber='index',
              v-model='answers[index]',
              :visionary='visionary',
              :prevDefault='answers[index]'
            )
        .columns
          .column.is-8
            section
              b-steps(
                size='is-medium',
                :has-navigation='false',
                v-model='stepPage',
                :type='visionary ? `is-primary` : `is-success`'
              )
                b-step-item(
                  v-for='(step, index) in chunks',
                  :icon='`numeric-${index + 1}`',
                  :clickable='false'
                )

          .column.is-flex.is-justify-content-end
            div
              nuxt-link(
                :to='`/${visionary ? `visionary` : `integrator`}/${current - 1}`',
                v-if='current <= chunks.length && current !== 1'
              )
                b-button.mr-1(
                  :type='visionary ? `is-primary` : `is-base`',
                  :label='current < chunks.length ? `Prev` : ``',
                  icon-left='chevron-left',
                  @click='storeAnswers()'
                )
              nuxt-link(
                :to='isAnswersValid ? `/${visionary ? `visionary` : `integrator`}/${current + 1}` : ``',
                v-if='current < chunks.length'
              )
                b-button(
                  :type='visionary ? `is-primary` : `is-base`',
                  label='Next',
                  icon-right='chevron-right',
                  @click='storeAnswers()',
                  :disabled='!isAnswersValid'
                )
            div
              b-button(
                v-if='current == chunks.length',
                :type='visionary ? `is-primary` : `is-base`',
                :label='(visionary ? integratorCompleted : visionaryCompleted) ? "Get Results" : `${visionary ? `Integrator` : `Visionary`} Assessment`',
                icon-right='chevron-right',
                @click='handleLastAnswer',
                :disabled='!isAnswersValid',
                :loading='buttonLoading'
              )
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { filter, cloneDeep } from 'lodash'
import Post from '@/server/api.js'
import Card from '@/components/Card.vue'

export default {
  name: 'assessmentPage',
  components: {
    Card,
  },
  layout: 'assessment',
  scrollToTop: true,

  fetchOnServer: false,
  data() {
    return {
      cardsAnswer: {},
      answers: [],
      buttonLoading: false,
      isLoading: false,
      integrator: false,
    }
  },
  async fetch({ store, error, route }) {
    try {
      await store.dispatch(
        `${
          store.state.visionary.isVisionary ? 'visionary' : 'integrator'
        }/fetchStatements`,
        {
          statementsPerPage: 4,
        }
      )
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch statements at this time. Please try again.',
      })
    }
  },
  created() {
    console.log(this.$route.params.page)
    const clone = cloneDeep(this.allAnswers[this.current - 1])
    if (clone) {
      this.answers = clone
    }
  },
  computed: {
    ...mapState({
      visionary: (state) => state.visionary.isVisionary,
      userId: (state) => state.register.user,
      allAnswers: (state) => {
        return state.visionary.isVisionary
          ? state.visionary.allAnswers
          : state.integrator.allAnswers
      },
      integratorCompleted: (state) => state.visionary.integratorCompleted,
      visionaryCompleted: (state) => state.integrator.visionaryCompleted,
      chunks: (state) => {
        return state.visionary.isVisionary
          ? state.visionary.statementsChunks
          : state.integrator.statementsChunks
      },
    }),
    current() {
      return +this.$route.params.page || 1
    },
    stepPage() {
      return +this.$route.params.page - 1
    },
    chunk() {
      return this.chunks[this.current - 1]
    },
    isAnswersValid() {
      return filter(this.answers, (a) => !isNaN(+a)).length === 4
    },
  },
  methods: {
    ...mapActions({
      iIsComplete: 'visionary/integratorIsComplete',
      vIsComplete: 'integrator/visionaryIsComplete',
      vSendAnswer: 'visionary/sendAnswers',
      iSendAnswer: 'integrator/sendAnswers',
      isVisionary: 'visionary/isVisionary',
    }),
    storeAnswers() {
      const payload = { index: this.current - 1, answers: this.answers }
      this.visionary ? this.vSendAnswer(payload) : this.iSendAnswer(payload)
      // this.$store.dispatch(
      //   `${this.visionary ? 'visionary' : 'integrator'}/sendAnswers`,
      //   {
      //     index: this.current - 1,
      //     answers: this.answers,
      //   }
      // )
      this.isLoading = true
    },

    handleLastAnswer() {
      this.current === this.chunks.length && // sending completion to integrator state
      this.visionary
        ? this.vIsComplete(true)
        : this.iIsComplete(true)
      //  this.$store.dispatch(
      //     `${this.visionary ? 'integrator' : 'visionary'}/visionaryIsCompleted`,
      //     true
      //   )
      // send last answers
      const payload = { index: this.current - 1, answers: this.answers }
      this.visionary ? this.vSendAnswer(payload) : this.iSendAnswer(payload)

      // this.$store.dispatch(
      //   `${this.visionary ? 'visionary' : 'integrator'}/sendAnswers`,
      //   {
      //     index: this.current - 1,
      //     answers: this.answers,
      //   }
      // )
      this.sendToDataBase()
    },
    async sendToDataBase() {
      this.buttonLoading = true
      // send to Database
      const response = await Post[
        this.visionary ? 'sendToVisionary' : 'sendToIntegrator'
      ]({
        answers: this.allAnswers,
        userId: this.userId.data.id,
      })
      this.changeRoute(response)
    },
    changeRoute(response) {
      if (this.visionary && response.status === 201) {
        this.isVisionary(false)
        // this.$store.dispatch('visionary/isVisionary', false)

        this.integratorCompleted
          ? this.$router.push({
              name: 'result',
            })
          : this.$router.push({
              path: '/integrator/1',
            })
      }
      if (!this.visionary && response.status === 201) {
        this.isVisionary(true)
        // this.$store.dispatch('visionary/isVisionary', true)

        this.visionaryCompleted
          ? this.$router.push({
              name: 'result',
            })
          : this.$router.push({
              path: '/visionary/1',
            })
      }
    },
  },
}
</script>
<style  scoped>
.topDiv {
  height: 1rem;
  background: #019884;
}
.assessmentTitle {
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