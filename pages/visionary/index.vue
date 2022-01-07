<template lang="pug">
    div
        div.container(class="mt-3")
            .topDiv
                .column
                    .column
                        h1.assessmentTitle VISIONARY INDICATOR ASSESSMENT
                    .columns
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="one" :statement="statements.data[0].text" )
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="two" :statement="statements.data[1].text")
                    .columns
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="three" :statement="statements.data[2].text")
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="four" :statement="statements.data[3].text")
                    .column(class="is-flex is-justify-content-end")
                        nuxt-link(:to="{path:`/visionary`,query:{page:currentPage}}")
                            b-button(type='is-primary' label="Next Page"  icon-right='chevron-right' :disabled="notCompleted" @click="sendData" )
                    //- span {{statements}}
                    span {{stateOne}}
                    span {{stateTwo}}
                    span {{stateThree}}
                    span {{stateFour}}
                    span {{stateFive}}
                    span {{currentPage}}

</template>
<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'
export default {
    name:"visionaryPage",
    layout:'assessment',
    components:{
        Card
    },
    data(){
        return{
            cards:{
                one:'',
                two:'',
                three:'',
                four:''
            },
            notCompleted:true,
        }
    },
      async fetch({ store, error, route }) {
    try {
      await store.dispatch('visionary/fetchVisionaryStatements', {
        perPage: 4,
        page: store.state.visionary.currentPage,
      })

    } catch {
      error({
        statusCode: 503,
        message: 'Unable to fetch statements at this time. Please try again.',
      })
    }
  },

    computed: mapState({
    stateOne: (state) => state.visionary.one,
    stateTwo: (state) => state.visionary.two,
    stateThree: (state) => state.visionary.three,
    stateFour: (state) => state.visionary.four,
    stateFive: (state) => state.visionary.five,
    statements:(state)=>state.visionary.visionaryStatements,
    currentPage: (state) => state.visionary.currentPage,
  }),
    methods:{
        getAnswer(number,cardNumber){
            this.cards[cardNumber]=number
            this.checkCompletion();
        },
        checkCompletion(){
        Object.values(this.cards).every(value=>value !=='')?
         this.notCompleted=false:
         this.notCompleted=true
        },

      sendData(){
          this.$store.dispatch('visionary/sendCurrentPage',this.currentPage+1)
            const cardsArr=Object.values(this.cards);
            const arr=['one','two','three','four','five'];
            for(let i=0;i<arr.length;i++){
            cardsArr.filter(num=>+num===i+1).forEach(num=>
                 this.$store.dispatch('visionary/sendNumber',{number:num,stateProp:arr[i]})
                )
            }
            this.$nuxt.refresh()
                // try {
                //     await this.$store.dispatch('visionary/fetchVisionaryStatements', {
                //         perPage: 4,
                //         page: this.currentPage,
                //     })
                //     } catch(error) {
                //         return error
                //     }
        }
    }

}
</script>
<style  scoped>
.topDiv{
    height: 1rem;
    background: hsl(172, 99%, 30%);
}
.assessmentTitle{
    color:#712a96;
    font-size: 2em;
    font-weight: bold;
}
@media only screen and (max-width: 440px) {
  .assessmentTitle {
          margin-top:1.5em;
    font-size: 1.5em;
  text-align: center;
  }
}
</style>