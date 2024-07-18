import { View, Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import MyContext from './MyContext'
import Catalog from './Catalog'

export default function CatalogList() {
    const{catalogs}=useContext(MyContext)
  return (
    <View>
      <Text>CatalogList</Text>
      <FlatList data={catalogs}
      renderItem={({item})=><Catalog data={item}/>}
     keyExtractor={(item)=>item.id}
      />
    </View>
  )
}