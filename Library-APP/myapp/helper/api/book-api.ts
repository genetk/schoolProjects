
import { IBook } from "../../types/IBook";
import axios from "./axiosConfig";


export const getBooks = async () => {
try {
    const res =await axios.get("/books");
    if(res.status===200 ){
        return res.data
    }
} catch (error) {
    
}
return []
   
  };
  export const createBook = async (book:IBook) => {
    try {
        const res =await axios.post('/books',book); 
        if(res.status===201){
            return res.data
        }
    } catch (error) {
        
    }

   
  };
  export const updateBooks = async (id:string,book: IBook) => {
    try {
      const res = await axios.put(`/books/${id}`, book);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {}
    return null
  };
  export const removeBooks = async (id:string) => {
    try {
     const res =await axios.delete(`/books/${id}`);
     if(res.status===200){
      return true
     }
    } catch (error) {
      
    }
    return false
   
  };