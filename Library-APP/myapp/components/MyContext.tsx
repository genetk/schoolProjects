import { createContext } from "react";
import { IUser } from "../types/IUser";
import { IAuthor } from "../types/IAuthor";
import { IBook } from "../types/IBook";
import { IPublisher } from "../types/IPublisher";
import { IMember } from "../types/IMemeber";
import Members from "./Members/Members";
import ICatalog from "../types/ICatalog";
import { Itransaction } from "../types/ITransaction";
interface IContext{
  setLoggedIn:(value:boolean)=>void
  authors:IAuthor[],
  setAuthors:(authors:IAuthor[])=>void
  books:IBook[],
 setBooks:(books:IBook[])=>void
publishers:IPublisher[]
 setPublishers:(publisher:IPublisher[])=>void
 members:IMember[]
 setMembers :(member:IMember[])=>void
 catalogs:ICatalog[],
 setCatalogs:(value:ICatalog[])=>void
 transactions:Itransaction[],
 setTransactions:(transaction:Itransaction[])=>void

}
 const MyContext = createContext<IContext>({setLoggedIn:()=>{},authors:[],setAuthors:()=>{}, books:[],
 setBooks:()=>{},
publishers:[],
 setPublishers:()=>{},members:[],
 setMembers:()=>{},catalogs:[],setCatalogs:()=>{},
transactions:[],setTransactions:()=>{}})


 export default MyContext