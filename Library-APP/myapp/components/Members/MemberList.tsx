import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useContext } from 'react'
import styles from '../../helper/styles'
import MyContext from '../MyContext'
import Members from './Members'


const MemberList = () => {
  const{members}=useContext(MyContext)

return (
  <SafeAreaView style={styles.container}>
    <FlatList data={members}
        renderItem={({item})=><Members data={item}/>}
        keyExtractor={(item)=>item.id}/>
  </SafeAreaView>
)
}



export default MemberList