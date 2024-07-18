
import { IBook } from "../../types/IBook";
import { IAuthor } from "../../types/IAuthor";
import { Alert } from "react-native";
import axios from "./axiosConfig";


export const isExisitedUser = async (email: string) => {
  try {
    const res = await axios.get(`/users?email=${email}`);
    if (res.status === 200 && res.data.length > 0) {
      return true;
    }
  } catch (error) {}
  return false;
};

export const getAuthors = async () => {
  try {
    const res = await axios.get("/authors");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return [];
};

export const createAuthor = async ( author: IAuthor) => {
  try {
    
   
    const res = await axios.post("/authors", author);

    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {}
  return null;
};
export const updateAuthors = async (id:string,author:IAuthor) => {
  try {
    const res =   await axios.put(`/authors/${id}`,author);
    if (res){
      return res.data
    }
  } catch (error) {
    
  }
  return null

};
export const removeAuthors = async (id: string) => {
  try {
    const res = await axios.delete(`/authors/${id}`);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {}
  return false;
};
