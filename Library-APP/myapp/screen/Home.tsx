import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthorList from "../components/authors/getAuthors";
import UpdateAuthor from "../components/authors/updateAuthor";

import BookList from "../components/books/getBooks";
import AddBooks from "../components/books/addBooks";
import UpdateBooks from "../components/books/updateBooks";
import AddAuthor from "../components/authors/addAuthors";
import PublisherList from "../components/publisher/PublisherList";
import AddPublisher from "../components/publisher/Addpublisher";
import UpdatePublisher from "../components/publisher/UpdatePublisher";
import Login from "../components/Login";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE } from "../helper/constants";
import MyContext from "../components/MyContext";
import EditBooks from "../components/books/updateBooks";
import EditAuthor from "../components/authors/updateAuthor";
import EDITPublisher from "../components/publisher/UpdatePublisher";
import EDITmember from "../components/Members/UpdateMembers";
import AddMembers from "../components/Members/AddMembers";
import BorrowBook from "../components/BorrowBook";
import TransactionList from "../components/transaction/TransactionList";
import CatalogList from "../components/CatalogList";
import AddCatalog from "../components/addCatalog";

const { Navigator, Screen } = createNativeStackNavigator();

const Home = () => {
  return (
    
      <Navigator>
      
        <Screen name="book-list" component={BookList} />
        <Screen name="add-book" component={AddBooks} />
        <Screen name="update-book" component={EditBooks} />
        <Screen name="add-author" component={AddAuthor} />
        <Screen name="upate-author" component={ EditAuthor} />
        <Screen name="add-publisher" component={AddPublisher} />
        <Screen name="upate-publisher" component={EDITPublisher }/>
         <Screen name="add-member" component={AddMembers}/> 
         <Screen name="upate-member" component={EDITmember}/> 
         <Screen name='transaction-list' component={TransactionList}/>
         <Screen name="catalog-list" component={CatalogList}/>
         <Screen name="add-catalog" component={AddCatalog}/>
         
       

      </Navigator>

     
  
  );
};

export default Home;
