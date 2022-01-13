<template lang='pug'>
div
  .main
    .header
      template(v-if='!loading')
        span {{ statement }}
      b-skeleton(:active='loading', :count='2')
    hr.divider(type='is-danger')
    .content
      section.pl-5.pr-5
        .is-flex.is-justify-content-space-between
          span(v-if='!loading') Not related
          span(v-if='loading')
            b-skeleton(:active='loading', width='7em')
          span(v-if='!loading') Very related
          span(v-if='loading')
            b-skeleton(:active='loading', width='7em')
      div
        template(v-if='!loading')
          .buttons.is-flex.is-justify-content-center(
            v-for='(num, index) in numbers'
          )
            b-button(type='is-primary', outlined, @click='cardAnswer(num)') {{ num }}
        b-skeleton(:active='loading', height='2em')
</template>

<script>
export default {
  name: 'statementsCard',
  data() {
    return {
      numbers: [1, 2, 3, 4, 5],
    }
  },
  props: {
    cardAnswer: Function,
    statement: String,
    loading: Boolean,
  },
}
</script>
<style scoped>
.header {
  font-weight: bold;
}
.selection {
  color: #712a96;
  font-size: 1.2em;
}
.divider {
  background: hsl(171, 100%, 41%);
  box-shadow: 2px 2px 8px;
}
.main {
  box-shadow: 1px 1px 7px;
  padding: 1em;
}
/* .number {
  font-size: 1em;
} */
</style>
