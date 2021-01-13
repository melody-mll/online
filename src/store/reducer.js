const defaultStatus={
    form: {
        doctorid: '',
        doctorname:'',
        doctorphone:'',
        doctorposition:'',
        doctordepart:''
    },
    doctorlist:[]
}
export default(state=defaultStatus,action)=>{
    if(action.type==="update-form"){
        return {
            ...state,
            form: {
                ...state.form,
                ...action.payload
            }
        }
    }
}