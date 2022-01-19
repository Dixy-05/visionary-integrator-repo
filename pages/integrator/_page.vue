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
        .columns.is-multiline
          .column.is-half(v-for='(item, index) in chunk')
            card(
              :statement='item.text',
              :key='`card-` + index',
              :loading='isLoading',
              :cardNumber='index',
              v-model='answers[index]'
            )
        .columns
          .column.is-9
            section
              b-steps(
                size='is-medium',
                :has-navigation='false',
                v-model='stepPage',
                type='is-success'
              )
                b-step-item(
                  v-for='(step, index) in chunks',
                  :icon='`numeric-${index + 1}`',
                  :clickable='false'
                )

          .column.is-flex.is-justify-content-end
            div
              nuxt-link(
                :to='isAnswersValid ? `/integrator/${current + 1}` : ``',
                v-if='current < 5'
              )
                b-button(
                  type='is-base',
                  label='Next Page',
                  icon-right='chevron-right',
                  @click='storeAnswers()',
                  :disabled='!isAnswersValid'
                )
            div
              b-button(
                v-if='current == 5',
                type='is-base',
                :label='visionaryCompleted ? "Get Results" : "Visionary Assessment"',
                icon-right='chevron-right',
                @click='handleLastAnswer',
                :disabled='!isAnswersValid',
                :loading='buttonLoading'
              )
      span {{ allAnswers }}
      span {{ current }}
</template>
<script>
import { mapState } from 'vuex'
import { filter } from 'lodash'
import Post from '@/server/api.js'
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
      cardsAnswer: {},
      answers: [],
      current: +this.$route.params.page || 1,
      stepPage: +this.$route.params.page - 1,
      buttonLoading: false,
      isLoading: false,
    }
  },
  async fetch({ store, error, route }) {
    console.log(+route.params.page)
    try {
      await store.dispatch('integrator/fetchStatements', {
        statementsPerPage: 4,
      })
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch statements at this time. Please try again.',
      })
    }
  },

  computed: {
    ...mapState({
      userId: (state) => state.register.user,
      allAnswers: (state) => state.integrator.allAnswers,
      visionaryCompleted: (state) => state.integrator.visionaryIsCompleted,
      chunks: (state) => state.visionary.statementsChunks,
    }),

    chunk() {
      return this.chunks[this.current - 1]
    },

    isAnswersValid() {
      return filter(this.answers, (a) => !isNaN(+a)).length === 4
    },
  },
  methods: {
    storeAnswers() {
      this.$store.dispatch('integrator/sendAnswers', {
        index: this.current - 1,
        answers: this.answers,
      })
      // this.$store.dispatch('visionary/isLoading', true)
      this.isLoading = true
    },

    handleLastAnswer() {
      // sending completion to integrator state
      this.current === 5 &&
        this.$store.dispatch('visionary/integratorIsCompleted', true)
      // send last answers
      this.$store.dispatch('integrator/sendAnswers', {
        index: this.current - 1,
        answers: this.answers,
      })
      this.sendToDataBase()
    },
    async sendToDataBase() {
      this.buttonLoading = true
      // send to Database
      const response = await Post.sendToIntegrator({
        answers: this.allAnswers,
        userId: this.userId.data.id,
      })
      if (response.status === 201) {
        this.visionaryCompleted
          ? this.$router.push({
              name: 'result',
            })
          : this.$router.push({ name: 'visionary-page', params: { page: '1' } })
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
  color: hsl(172, 99%, 30%);
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