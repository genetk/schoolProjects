import { View, Text, FlatList, SafeAreaView ,TextInput ,Pressable,StyleSheet } from 'react-native'
import React, { useContext , useState ,useEffect} from 'react'
import MyContext from '../MyContext'
import Books from './Books'


import { IBook } from '../../types/IBook'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { LOCAL_STORAGE } from '../../helper/constants'

const BookList = ({navigation}:any) => {
  const{books ,setLoggedIn}=useContext(MyContext)
  const [displaybook, setDisplaybook] = useState<IBook[]>(books);
  const [searchText, setSearchText] = useState("")
   const[filter,setFilter]=useState('')
console.log('this is book1',books)
  const onSearch=(text:string)=>{
    const arr = books.filter(x =>
      x.title.toLowerCase().includes(text.trim().toLowerCase())
    );
    setDisplaybook(arr);
    setSearchText(text);
  };
 
  // const onFilter =()=>{
  //   const arr =books.filter(book=>book.category.toLowerCase().includes(filter.trim().toLowerCase()))
  //   setDisplaybook(arr)
    
  // }
  const onAddCatalog=()=>{
    navigation.navigate('add-catalog')
  }
  
  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem(LOCAL_STORAGE);
      setLoggedIn(false);
      
    } catch (error) {
      
    }
 
  }
  useEffect(
    () => {
      setDisplaybook(books);
      
    },
    [books]
  ); 
  
 console.log('thisis',books)
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
       <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      </View>
      
     <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={onSearch}
        placeholder="Enter something to search"
      />
          
       {/* <TextInput
        style={styles.input}
        value={filter}
        onChangeText={setFilter}
        placeholder="category"
      />
      <Pressable onPress={onFilter}><Text>filter detail</Text></Pressable>
      */}
      <Pressable onPress={onAddCatalog}><Text>addcatalog</Text></Pressable>
      <FlatList data={displaybook} 
         renderItem={({item,index})=><Books data={item} index={index}/>}
         keyExtractor={(item,index)=>item.id?item.id.toString():index.toString()}/>
    </SafeAreaView>
  )
}

export default BookList
const styles= StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: "#0066CC",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
 
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
   
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10
    },
  
  logoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
 
});