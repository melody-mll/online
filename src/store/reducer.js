const defaultStatus={
    form: {
        doctorid: '',
        doctorname:'',
        doctorphone:'',
        doctorposition:'',
        doctordepart:''
    },
    doctorlist:{
        doctorid:'',
        doctorname:'',
        doctorsex:'man',
        doctorage:'',
        doctorphone:'',
        doctorposition:'',
        doctordepart:'',
        doctorproject:''
    }
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
    if(action.type==="update-doctorlist"){
        return {
            ...state,
            doctorlist: {
                ...state.doctorlist,
                ...action.payload
            }
        }
    }
}