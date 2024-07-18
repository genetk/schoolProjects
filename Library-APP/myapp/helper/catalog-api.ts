import ICatalog from '../types/ICatalog'
import axios from './api/axiosConfig'

export const addnewcatalog=async(newcatalog:ICatalog)=>{
    const res = await axios.post('catalogs',newcatalog) 
    try{
    if (res.status === 201) {
        return res.data;
      }
    } catch (error) {}
    return null;
  };
