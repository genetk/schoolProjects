import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import MyContext from '../MyContext'
import Author from './author'
import styles from '../../helper/styles'
const AuthorList = () => {
    const {authors,setAuthors}=useContext(MyContext)

   
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={authors}
          renderItem={({item})=><Author data={item}/>}
          keyExtractor={(item)=>item.id}/>
    </SafeAreaView>
  )
}

export default AuthorList