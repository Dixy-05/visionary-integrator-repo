<template lang='pug'>
  div
    .main
      .header
        template(v-if="!loading")
          span {{statement}} {{loading}}
        b-skeleton(:active="loading" :count="2")
      hr.divider(type="is-danger")
      .content
        section(class="pl-5 pr-5")
          div(class="is-flex is-justify-content-space-between")
            span Not related
            span Very related
          b-field
            b-slider(size='is-medium' :min='1' :max='5' v-model='number'  @input='getAnswer(number,cardNumber)')
              template(v-for='val in [1,2,3,4,5]' )
                b-slider-tick(:value='val' :key='val') {{ val }}

                
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
