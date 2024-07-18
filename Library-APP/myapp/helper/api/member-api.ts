import axios from "./axiosConfig";
import { IMember } from "../../types/IMemeber";


export const getMembers =async()=>{
   try {
      const res = await axios.get('members')
      if(res.status===200){
        return res.data
      }
   } catch (error) {
    return []
   }
}

export const createMember = async (member:IMember) => {
    try {
        const res =await axios.post('/members',member); 
        if(res.status===201){
            return res.data
        }
    } catch (error) {
        
    }

   
  };
  export const updateMember = async (id:string,member: IMember) => {
    try {
      const res = await axios.put(`/members/${id}`, member);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {}
    return null
  };
  export const removeMember = async (id:string) => {
    try {
     const res =await axios.delete(`/members/${id}`);
     if(res.status===200){
      return true
     }
    } catch (error) {
      
    }
    return false
   
  };