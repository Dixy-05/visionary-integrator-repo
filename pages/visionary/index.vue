<template lang="pug">
    div
        div.container(class="mt-3")
            .topDiv
                .column
                    .columns
                      .column(class="is-two-thirds")
                        h1.assessmentTitle VISIONARY INDICATOR ASSESSMENT
                      .column(class="is-flex is-align-items-center is-justify-content-end")
                         b-tag.infoTag(type="is-info" size="is-medium") 1 rarely describes you and 5 describes you
                    .columns
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="one" :statement="statements.data[0].text" :loading="loading")
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="two" :statement="statements.data[1].text" :loading="loading")
                    .columns
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="three" :statement="statements.data[2].text" :loading="loading")
                        .column
                            card(:key="currentPage" :getAnswer="getAnswer" cardNumber="four" :statement="statements.data[3].text" :loading="loading")
                    .column(class="is-flex is-justify-content-end")
                        nuxt-link(:to="currentPage!==6?{path:`/visionary`,query:{page:currentPage}}:{path:'/integrator'}")
                            b-button(type='is-primary' label="Next Page"  icon-right='chevron-right'  @click="sendData" )
                    span {{statements.data[0].text}}
                    

</template>
<script>
// :statement="statements.data[0].text"
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
                one:3,
                two:3,
                three:3,
                four:3
            },
            // notCompleted:true,
            current:1,
        }
    },
     async fetch({ store, error }) {
      store.dispatch('visionary/sendCurrentPage',1);
    try {
      await store.dispatch('visionary/fetchStatements', {
        perPage: 4,
        page: 1
      })
      console.log(store.state.visionary.isLoading)
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
    statements:(state)=> state.visionary.statements,
    currentPage: (state) => state.visionary.currentPage,
    loading: (state) => state.visionary.isLoading,
  }),
    methods:{
        getAnswer(number,cardNumber){
            // this.cards[cardNumber]=number
            // this.checkCompletion();
            console.log("number:",number)
        },
        checkCompletion(){
        Object.values(this.cards).every(value=>value !=='')?
         this.notCompleted=false:
         this.notCompleted=true
        },

      sendData(){
        this.current++
          this.$store.dispatch('visionary/sendCurrentPage',this.currentPage+1)
            const cardsArr=Object.values(this.cards);
            const arr=['one','two','three','four','five'];
            for(let i=0;i<arr.length;i++){
            cardsArr.filter(num=>+num===i+1).forEach(num=>
                 this.$store.dispatch('visionary/sendNumber',{number:num,stateProp:arr[i]})
                )
            }
            // clear cards answers
           for(let i=0;i<4;i++){
             this.$data.cards[arr[i]]=3
           }
           this.notCompleted=true;
           this.nextPage()
             // call fetch()
            // this.$nuxt.refresh()
        },
      async nextPage(){
        this.$store.dispatch('visionary/isLoading',true)
          try {
             await this.$store.dispatch('visionary/fetchStatements', {
              perPage: 4,
              page: this.current
            })
          } catch(error) {
          return error
              }
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
  .infoTag{
    font-family: 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color:red;
  }
}
</style>