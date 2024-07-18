import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import ICatalog from '../types/ICatalog'
import { addnewcatalog } from '../helper/catalog-api'
import MyContext from './MyContext'

const AddCatalog =({route}:any) => { 
    const book=route.params
    const [catalog,setCatalog]=useState({id:'',bookId:book.id,availableBook:'',noofCopies:''})
const {catalogs,setCatalogs}=useContext(MyContext)

  const handlecatalog=async()=>{
    const newCatalog={
        id:'',
        bookId:catalog.bookId,
        availableCopies:parseInt(catalog.availableBook),
        numberOfCopies:parseInt(catalog.noofCopies)

    };
    try {
        const res = await addnewcatalog(newCatalog)
        setCatalogs([...catalogs,res])
        Alert.alert('added correctly')
    } catch (error) {
        
    }
}

  return (
    <View>
     
      <TextInput placeholder="bookid"
         value={catalog.bookId}
         onChangeText={(text)=>setCatalog({...catalog,bookId:text})} 
         editable={false}
      />
      
      <TextInput placeholder="id"
         value={catalog.id}
         onChangeText={(text)=>setCatalog({...catalog,id:text})}
      />
      
      <TextInput placeholder="availablebook"
         value={catalog.availableBook}
         onChangeText={(text)=>setCatalog({...catalog,availableBook:text})}
      />
      <TextInput placeholder="noofcopie"
         value={catalog.noofCopies}
         onChangeText={(text)=>setCatalog({...catalog,noofCopies:text})}
      />
      <Button title='addcatalog' onPress={handlecatalog}/>
    </View>
  )
}

export default AddCatalog