import { View, Text, SafeAreaView, TextInput, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { IAuthor } from '../../types/IAuthor'
import styles from '../../helper/styles';
import { updateAuthors } from '../../helper/api/author-api';
import MyContext from '../MyContext';
// * Update Author: Allow editing author details through a form, possibly accessed by tapping on an author in the list.


const EditAuthor = ({navigation,route}:any) => {
  const data = route.params
  const[editAuthor,setEditAuthor]=useState<IAuthor>(data)
  const{authors,setAuthors}=useContext(MyContext)

  const onUpdateAuthor =async()=>{
       try {
        const res = await updateAuthors(data.id,editAuthor)
        if(res){
          const index = authors.findIndex(author=>author.id===data.id)
          if(index!==-1){
            const arr =[...authors]
            arr[index]=res
            setAuthors(arr)
            navigation.navigate('author-list')
          }
        }
       } catch (error) {
        
       }
  }
  return (
    <SafeAreaView>
      
    
      <TextInput
        style={styles.input}
        placeholder="id"
        value={editAuthor.id}
        onChangeText={(text) => setEditAuthor({ ...editAuthor, id: text })}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="name"
        value={editAuthor.name}
        onChangeText={(text) => setEditAuthor({ ...editAuthor, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="phone"
        value={editAuthor.phone}
        onChangeText={(text) => setEditAuthor({ ...editAuthor, phone: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={editAuthor.email}
        onChangeText={(text) =>setEditAuthor({ ...editAuthor, email: text })}
      />
      <Pressable style={styles.button} onPress={onUpdateAuthor}>
        <Text style={styles.button}>edit Author</Text>
      </Pressable>
    </SafeAreaView>
  );
};
   
 
export default EditAuthor
