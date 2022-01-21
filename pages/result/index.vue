<template lang="pug">
.container(v-if='!isLoading')
  h1.resultTitle Results
  section
    .is-flex.is-justify-content-center.is-primary.subV Visionary
    b-progress(
      :value='visionaryTotal',
      type='is-info',
      size='is-large',
      show-value
    )
      span {{ visionaryTotal }} %
    .is-flex.is-justify-content-center.subI Integrator
    b-progress(
      :value='integratorTotal',
      type='is-info',
      size='is-large',
      show-value
    )
      span {{ integratorTotal }} %
  section
    .mt-5
      .tile.is-ancestor
        .tile.is-parent
          article.tile.is-child.notification.is-primary(
            v-if='visionaryTotal > integratorTotal'
          )
            p.title Visionary
            .content
              p {{ visionaryDefinition }}
          article.tile.is-child.notification.is-base(
            v-if='visionaryTotal < integratorTotal'
          )
            p.title Integrator
            .content
              p {{ integratorDefinition }}
          article.tile.is-child.notification.is-primary(
            v-if='visionaryTotal == integratorTotal'
          )
            p.title Visionary
            .content
              p {{ visionaryDefinition }}
          article.tile.is-child.notification.is-base(
            v-if='visionaryTotal == integratorTotal'
          )
            p.title Integrator
            .content
              p {{ integratorDefinition }}
.container(v-else='isLoading')
  .is-loading
    span Loading....
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Post from '@/server/api.js'

export default {
  name: 'resultPage',
  data() {
    return {
      isLoading: true,
      visionaryTotal: Number,
      integratorTotal: Number,
      visionaryDefinition:
        'As a Visionary you are extremely passionate about product, service, company, and costumers. You typically have ten new ideas a week, many of them may not be so good, how ever a few are absolutely brilliant, and those few great ideas keep the organization growing. Those great ideas can take companies to the moon. For that reason, yor are invaluable.',
      integratorDefinition:
        'An Integrator is a person who has the unique ability to harmoniously integrate the major functions of the business, run the organization, and manage the day to day issues that arise. The integrator is the glue that holds the people, processes, systems, priorities and strategy of the company together. "Integrator" is the best word to describe titles such as president, COO, general manager, or chief of staff.',
    }
  },

  // async fetch({ store, error }) {
  //   console.log('result:', store.state.register)
  //   const userId = await store.state.register.user.data.id
  //   // const userId = 5
  //   try {
  //     await store.dispatch('integrator/fetchResults', userId)
  //     await store.dispatch('visionary/fetchResults', userId)
  //   } catch (e) {
  //     error({
  //       statusCode: 503,
  //       message: 'Unable to fetch results at this time. Please try again.',
  //     })
  //   }
  // },
  beforeMount() {
    this.fetchResults()
  },
  computed: {
    ...mapState({
      visionaryResults: (state) => state.visionary.results.data[0].answers,
      integratorResults: (state) => state.integrator.results.data[0].answers,
    }),
    ...mapGetters({ userId: 'register/userId' }),
  },
  watch: {
    userId() {
      this.fetchResults()
    },
  },
  methods: {
    async fetchResults() {
      // check for computed userId getter, if true, then run fetch & set isLoading = false
      if (this.userId) {
        await this.$store.dispatch('integrator/fetchResults', this.userId)
        await this.$store.dispatch('visionary/fetchResults', this.userId)
        this.calculate()
        this.sendResults()
        this.isLoading = false
      }
    },
    calculate() {
      const vr = this.visionaryResults.reduce((mainArr, arr) =>
        mainArr.concat(arr)
      )
      const vi = this.integratorResults.reduce((mainArr, arr) =>
        mainArr.concat(arr)
      )
      const visionaryTotal = []
      for (let i = 0; i < 5; i++) {
        visionaryTotal.push(vr.filter((num) => num === i + 1).length * (i + 1))
      }
      const integratorTotal = []
      for (let i = 0; i < 5; i++) {
        integratorTotal.push(vi.filter((num) => num === i + 1).length * (i + 1))
      }
      this.visionaryTotal = visionaryTotal.reduce((total, num) => total + num)
      this.integratorTotal = integratorTotal.reduce((total, num) => total + num)
    },
    // ..........map actions.....
    sendResults() {
      return Post.sendToResult({
        visionary: this.visionaryTotal,
        integrator: this.integratorTotal,
        userId: this.userId,
      }).catch((e) => {
        return e
      })
    },
  },
}
</script>
<style scoped>
.resultTitle {
  font-size: 3em;
}
.subI {
  font-size: 2em;
  color: hsl(171, 100%, 41%);
}
.subV {
  font-size: 2em;
  color: #712a96;
}
</style>