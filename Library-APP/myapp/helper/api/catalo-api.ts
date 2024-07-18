
import axios from "./axiosConfig";


export const getCatalogs=async()=>{

    try {
        const res = await axios.get('catalogs')
            if(res)
                return res.data
            
        
    } catch (error) {
        
    }
    return []

}
