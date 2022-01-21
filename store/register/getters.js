export default {
    userId:state=> {
        return state?.user?.data?.id|| 0
    }
}