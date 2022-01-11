<template lang="pug">
    div.container
        h1.resultTitle Results
        section
            div(class="is-flex is-justify-content-center is-primary subV") Visionary
            b-progress(:value='visionaryTotal' size='is-medium' show-value)
                span {{visionaryTotal}} %
            div(class="is-flex is-justify-content-center subI") Integrator
            b-progress(:value='integratorTotal' size='is-medium' show-value)
                span {{integratorTotal}} %
        section
            div(class="mt-5")
                .tile.is-ancestor
                    .tile.is-parent
                        article.tile(class="is-child notification is-primary" v-if="visionaryTotal>integratorTotal")
                            p.title Visionary
                            div.content
                                p {{visionaryDefinition}}
                        article.tile(class="is-child notification is-base" v-if="visionaryTotal<integratorTotal")
                            p.title Integrator
                            div.content
                                p {{integratorDefinition}}
                        article.tile(class="is-child notification is-primary" v-if="visionaryTotal==integratorTotal")
                            p.title Visionary
                            div.content
                                p {{visionaryDefinition}}
                        article.tile(class="is-child notification is-base" v-if="visionaryTotal==integratorTotal")
                            p.title Integrator
                            div.content
                                p {{integratorDefinition}}
                
</template>
<script>
import { mapState } from 'vuex'

export default {
    name:"resultPage",
    data(){
        return{
            visionaryTotal:Number,
            integratorTotal:Number,
            visionaryDefinition:"As a visionary you are extremely passionate about product, service, company, and costumers. You typically have ten new ideas a week. Many of them may not be so good, how ever a few are absolutely brilliant, and those few great ideas keep the organization growing.Those great ideas can take companies to the moon. For that reason, yor are invaluable.",
            integratorDefinition:"An integrator is a person who has the unique ability to harmoniously integrate the major functions of the business, run the organization, and manage the day to day issues that arise. The integrator is the glue that hold the people, processes, systems, priorities and strategy of the company together. \"Integrator\" is the best word to describe titles such as president, COO, general manager, or chief of staff."
        }
    },
    computed: mapState({

         visionaryResults: (state) => state.visionary.results,
         integratorResults: (state) => state.integrator.results,
        }),
    async fetch({ store, error}) {
    const userId = await store.state.register.user.data.id
    try {
      await store.dispatch('integrator/fetchResults',userId)
      await store.dispatch('visionary/fetchResults',userId)
    } catch(e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch results at this time. Please try again.',
      })
    }
  },
  created(){
      this.calculate()
  },
  methods:{
      calculate(){
          const tv=[];
          const ti=[];
          for(let i=0;i<4;i++){
            tv.push(Object.values(this.visionaryResults.data[0])[i+1]*[i+1])
          }
          for(let i=0;i<4;i++){
            ti.push(Object.values(this.integratorResults.data[0])[i+1]*[i+1])
          }
          this.visionaryTotal=tv.reduce((total,num)=>total+num)
          this.integratorTotal=ti.reduce((total,num)=>total+num)
      }
  }

}
</script>
<style scoped>
.resultTitle{
    font-size: 3em;
}
.subI{
    font-size:2em;
   color: hsl(171, 100%, 41%);
} 
.subV{
    font-size:2em;
color: #712a96;
} 

</style>