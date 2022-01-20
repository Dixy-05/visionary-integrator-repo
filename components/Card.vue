<template lang='pug'>
div
  .main
    .header
      template(v-if='!loading')
        span {{ statement }}
      b-skeleton(:active='loading', :count='2')
    hr.divider(
      :style='visionary ? "background:#00d1b2;" : "background:#9f46cf;"'
    )
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
          .buttons.is-flex.is-justify-content-center
            b-radio-button(
              v-for='(num, index) in numbers',
              :name='`card-` + cardNumber',
              :key='`button-` + cardNumber + `-index-` + index',
              :type='visionary ? `is-primary` : `is-success`',
              :native-value='num',
              @input='$emit("input", num)',
              v-model='value'
            ) 
              span {{ num }}
        b-skeleton(:active='loading', height='2em')
</template>

<script>
export default {
  name: 'statementsCard',
  data() {
    return {
      numbers: [1, 2, 3, 4, 5],
      value: this.prevDefault,
    }
  },
  props: {
    statement: String,
    loading: Boolean,
    cardNumber: Number,
    visionary: Boolean,
    prevDefault: Number,
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
  background: #00d1b2;
  box-shadow: 2px 2px 8px;
}
.main {
  box-shadow: 1px 1px 7px;
  padding: 1em;
}
</style>
