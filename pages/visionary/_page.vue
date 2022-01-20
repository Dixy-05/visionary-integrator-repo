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
        .columns.is-multiline
          .column.is-half(v-for='(item, index) in chunk')
            card(
              :statement='item.text',
              :key='`card-` + index',
              :loading='isLoading',
              :cardNumber='index',
              v-model='answers[index]',
              :visionary='true',
              :prevDefault='answers[index]'
            )
        .columns
          .column.is-8
            section
              b-steps(
                size='is-medium',
                :has-navigation='false',
                v-model='stepPage'
              )
                b-step-item(
                  v-for='(step, index) in chunks',
                  :icon='`numeric-${index + 1}`',
                  :clickable='false'
                )

          .column.is-flex.is-justify-content-end
            div
              nuxt-link(
                :to='`/visionary/${current - 1}`',
                v-if='current <= chunks.length && current !== 1'
              )
                b-button.mr-1(
                  type='is-primary',
                  :label='current < chunks.length ? `Prev` : ``',
                  icon-left='chevron-left',
                  @click='storeAnswers()'
                )
              nuxt-link(
                :to='isAnswersValid ? `/visionary/${current + 1}` : ``',
                v-if='current < chunks.length'
              )
                b-button(
                  type='is-primary',
                  label='Next',
                  icon-right='chevron-right',
                  @click='storeAnswers()',
                  :disabled='!isAnswersValid'
                )
            div
              b-button(
                v-if='current == chunks.length',
                type='is-primary',
                :label='integratorCompleted ? "Get Results" : "Integrator Assessment"',
                icon-right='chevron-right',
                @click='handleLastAnswer',
                :disabled='!isAnswersValid',
                :loading='buttonLoading'
              )
      span allAnswers: {{ allAnswers }}
      span current: {{ answers }}
</template>
<script>
import { mapState } from 'vuex'
import { filter, cloneDeep } from 'lodash'
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
      cardsAnswer: {},
      answers: [],
      buttonLoading: false,
      isLoading: false,
    }
  },
  async fetch({ store, error, route }) {
    try {
      await store.dispatch('visionary/fetchStatements', {
        statementsPerPage: 4,
      })
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch statements at this time. Please try again.',
      })
    }
  },
  created() {
    const clone = cloneDeep(this.allAnswers[this.current - 1])
    if (clone) {
      this.answers = clone
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.register.user,
      allAnswers: (state) => state.visionary.allAnswers,
      integratorCompleted: (state) => state.visionary.integratorIsCompleted, // finding out if integrator assessment is completed
      chunks: (state) => state.visionary.statementsChunks,
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
    storeAnswers() {
      this.$store.dispatch('visionary/sendAnswers', {
        index: this.current - 1,
        answers: this.answers,
      })
      this.isLoading = true
    },

    handleLastAnswer() {
      this.current === this.chunks.length && // sending completion to integrator state
        this.$store.dispatch('integrator/visionaryIsCompleted', true)
      // send last answers
      this.$store.dispatch('visionary/sendAnswers', {
        index: this.current - 1,
        answers: this.answers,
      })
      this.sendToDataBase()
    },
    async sendToDataBase() {
      this.buttonLoading = true
      // send to Database
      const response = await Post.sendToVisionary({
        answers: this.allAnswers,
        userId: this.userId.data.id,
      })
      if (response.status === 201) {
        this.integratorCompleted
          ? this.$router.push({
              name: 'result',
            })
          : this.$router.push({
              name: 'integrator-page',
              params: { page: '1' },
            })
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