import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useContext } from 'react'
import styles from '../../helper/styles'
import MyContext from '../MyContext'
import Publisher from './Publishers'

const PublisherList = () => {
  const{publishers}=useContext(MyContext)

return (
  <SafeAreaView style={styles.container}>
    <FlatList data={publishers}
        renderItem={({item})=><Publisher data={item}/>}
        keyExtractor={(item)=>item.id}/>
  </SafeAreaView>
)
}



export default PublisherList