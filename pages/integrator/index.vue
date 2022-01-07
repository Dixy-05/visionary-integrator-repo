<template lang="pug">
    div
        div.container(class="mt-3")
            .topDiv
                .column
                    .columns
                      .column(class="is-two-thirds")
                        h1.assessmentTitle INTEGRATOR INDICATOR ASSESSMENT
                      .column(class="is-flex is-align-items-center is-justify-content-end")
                         b-tag.infoTag(type="is-info" size="is-medium") 1 rarely describes you and 5 describes you
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
                        nuxt-link(:to="currentPage!==6?{path:`/integrator`,query:{page:currentPage}}:{path:'/visionary'}")
                            b-button(type='is-primary' label="Next Page"  icon-right='chevron-right' :disabled="notCompleted" @click="sendData" )
                    //- span {{statements}}
                    span {{stateOne}}
                    span {{stateTwo}}
                    span {{stateThree}}
                    span {{stateFour}}
                    span {{stateFive}}
                    span {{currentPage}}
                    span local current: {{current}}

</template>
<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'
export default {
    name:"integratorPage",
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
            current:1,
        }
    },
      async fetch({ store, error, route }) {
        store.dispatch('integrator/sendCurrentPage',1)
    try {
      await store.dispatch('integrator/fetchIntegratorStatements', {
        perPage: 4,
        page: 1
        // page: store.state.visionary.currentPage,
      })

    } catch {
      error({
        statusCode: 503,
        message: 'Unable to fetch statements at this time. Please try again.',
      })
    }
  },

    computed: mapState({
    stateOne: (state) => state.integrator.one,
    stateTwo: (state) => state.integrator.two,
    stateThree: (state) => state.integrator.three,
    stateFour: (state) => state.integrator.four,
    stateFive: (state) => state.integrator.five,
    statements:(state)=>state.integrator.integratorStatements,
    currentPage: (state) => state.integrator.currentPage,
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
        this.current++
          this.$store.dispatch('integrator/sendCurrentPage',this.currentPage+1)
            const cardsArr=Object.values(this.cards);
            const arr=['one','two','three','four','five'];
            for(let i=0;i<arr.length;i++){
            cardsArr.filter(num=>+num===i+1).forEach(num=>
                 this.$store.dispatch('integrator/sendNumber',{number:num,stateProp:arr[i]})
                )
            }
            // clear cards answers
           for(let i=0;i<4;i++){
             this.$data.cards[arr[i]]=''
           }
           this.notCompleted=true;
           this.nextPage()
             // call fetch()
            // this.$nuxt.refresh()
        },
        async nextPage(){
          try {
            await this.$store.dispatch('integrator/fetchIntegratorStatements', {
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