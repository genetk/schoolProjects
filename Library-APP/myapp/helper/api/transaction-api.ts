
import axios from "./axiosConfig";

export const getTransaction=async()=>{
    try {
        const res=await axios.get('transactions')
        if(res){
            return res.data
        }
    } catch (error) {
        
    }
    return null
    
}