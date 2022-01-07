<template lang='pug'>
  div
    .main
      .header
        span {{statement}}
      hr.divider(type="is-danger")
      .content
        section
            .block
                b-radio(v-model='radio' uncheck native-value='1' @input='getAnswer(radio,cardNumber)')
                    | 1
                b-radio(v-model='radio'  native-value='2' @input='getAnswer(radio,cardNumber)')
                    | 2
                b-radio(v-model='radio'  native-value='3' @input='getAnswer(radio,cardNumber)')
                    | 3
                b-radio(v-model='radio'  native-value='4' @input='getAnswer(radio,cardNumber)')
                    | 4
                b-radio(v-model='radio'  native-value='5' @input='getAnswer(radio,cardNumber)')
                    | 5
            p.content
                b Selection:
                  span.selection  {{ radio }}
                
</template>

<script>
export default {
  name: 'statementsCard',
      data(){
        return{
            radio:''
        }
    },
  props: {
  cardNumber:String,
  getAnswer:Function,
  statement:String
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
