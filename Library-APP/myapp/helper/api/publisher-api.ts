import axios from "./axiosConfig";
import { IPublisher } from "../../types/IPublisher";



export const getPublishers = async () => {
    try {
      const res = await axios.get("/publishers");
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {}
    return [];
  };
  
  export const createPublisher = async ( author: IPublisher) => {
    try {
    
     
      const res = await axios.post("/publishers", author);
  
      if (res.status === 201) {
        return res.data;
      }
    } catch (error) {}
    return null;
  };
  export const updatePublisher = async (id:string,author:IPublisher) => {
    try {
      const res =   await axios.put(`/publishers/${id}`,author);
      if (res){
        return res.data
      }
    } catch (error) {
      
    }
    return null
  
  };
  export const removePublisher = async (id: string) => {
    try {
      const res = await axios.delete(`/publishers/${id}`);
      if (res.status === 200) {
        return true;
      }
    } catch (error) {}
    return false;
  };
  