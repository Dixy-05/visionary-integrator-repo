<template lang='pug'>
  div
    .main
      .header
        template(v-if="!loading")
          span {{statement}}
        b-skeleton(:active="loading" :count="2")
      hr.divider(type="is-danger")
      .content
        section(class="pl-5 pr-5")
          div(class="is-flex is-justify-content-space-between")
            span(v-if="!loading") Not related
            span(v-if="loading")
              b-skeleton(:active="loading" width='7em')
            span(v-if="!loading") Very related
            span(v-if="loading")
              b-skeleton(:active="loading" width='7em')
          b-field
            template(v-if="!loading")
              b-slider(size='is-medium' :min='1' :max='5' v-model='number'  @input='getAnswer(number,cardNumber)')
                template(v-for='val in [1,2,3,4,5]' )
                  b-slider-tick(:value='val' :key='val') {{ val }}
            b-skeleton(:active="loading" height="2em")

                
</template>

<script>
export default {
  name: 'statementsCard',
      data(){
        return{
           number:3
        }
    },
  props: {
  cardNumber:String,
  getAnswer:Function,
  statement:String,
  loading:Boolean
  },
}
</script>
<style scoped>
.header{
  font-weight: bold;
}
.selection{
  color: #712a96;
  font-size:1.2em;

}
.divider{
  background:hsl(171, 100%, 41%);
  box-shadow: 2px 2px 8px ;
}
.main{
  box-shadow: 1px 1px 7px ;
  padding: 1em;
}

</style>
