import { StatusBar } from "expo-status-bar";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE } from "./helper/constants";
import Books from "./components/books/getBooks";
import { IUser } from "./types/IUser";
import MyContext from "./components/MyContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddAuthors from "./components/authors/addAuthors";
import { IAuthor } from "./types/IAuthor";
import { getAuthors } from "./helper/api/author-api";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screen/Home";
import { IPublisher } from "./types/IPublisher";
import { IBook } from "./types/IBook";
import { getBooks } from "./helper/api/book-api";
import AuthorList from "./components/authors/getAuthors";
import MemberList from "./components/Members/MemberList";
import { IMember } from "./types/IMemeber";
import { getMembers } from "./helper/api/member-api";
import PublisherList from "./components/publisher/PublisherList";
import { getPublishers } from "./helper/api/publisher-api";
import ICatalog from "./types/ICatalog";
import { getCatalogs } from "./helper/api/catalo-api";
import { Itransaction } from "./types/ITransaction";
import BorrowBook from "./components/BorrowBook";
import { getTransaction } from "./helper/api/transaction-api";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AddCatalog from "./components/addCatalog";

 
const tab = createBottomTabNavigator();
 
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [members, setMembers] = useState<IMember[]>([]);
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [transactions, setTransactions] = useState<Itransaction[]>([]);
 
  const loadLogin = async () => {
    try {
      const data = await AsyncStorage.getItem(LOCAL_STORAGE);
      if (data) {
        const result = JSON.parse(data);
        setLoggedIn(result.loggedIn);
        console.log('datadebug',data)
      }
    } catch (error) {}
  };
 
  const loadAuthor = async () => {
    const res = await getAuthors();
    setAuthors(res);
  };
  const loadMember = async () => {
    const res = await getMembers();
    setMembers(res);
  };
 
  const loadBook = async () => {
    const res = await getBooks();
    setBooks(res);
  };
  const loadPublsiher = async () => {
    const res = await getPublishers();
    setPublishers(res);
  };
 
  const loadCatalog = async () => {
    const catalogres = await getCatalogs();
    setCatalogs(catalogres);
  };
  const loadTransaction = async () => {
    const transaction = await getTransaction();
    setTransactions(transaction);
  };
 
  useEffect(() => {
    loadLogin();
    loadBook();
    loadAuthor();
    loadMember();
    loadPublsiher();
    loadCatalog();
    loadTransaction();
  }, []);
 
 
  return (
    <MyContext.Provider
      value={{
        setLoggedIn,
        authors,
        setAuthors,
        books,
        setBooks,
        publishers,
        setPublishers,
        members,
        setMembers,
        catalogs,
        setCatalogs,
        transactions,
        setTransactions,
      }}
    >
      <NavigationContainer>
        {!loggedIn ? (
          <Login setLoggedIn={setLoggedIn} />
        ) : (
          <tab.Navigator>
            <tab.Screen
              name="home"
              component={Home}
              options={{ headerShown:false,
               tabBarIcon: ({ color }) =>
                  <MaterialCommunityIcons color={color} size={24} name="library" />
              }}
            />
              
          

            <tab.Screen name="borrow-book" component={BorrowBook}  options={{
                title: "Borrow Book",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="book-plus" color={color} size={size} />
                ),
              }}
            />
            <tab.Screen name="author-list" component={AuthorList} options={{
                title: "Authors",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }} />
            <tab.Screen name="publisher-list" component={PublisherList} options={{
                title: "Publishers",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="domain" color={color} size={size} />
                ),
              }}
            />
            <tab.Screen name="member-list" component={MemberList}  options={{
                title: "Members",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-group" color={color} size={size} />
                ),
              }}
            />
            
          </tab.Navigator>
        )}
      </NavigationContainer>
    </MyContext.Provider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    backgroundColor: "#fff",
  },
});
