import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useContext } from 'react'
import MyContext from '../MyContext'
import Transactions from './Transactions'

const TransactionList = () => {
    const{transactions}=useContext(MyContext)
  return (
    <SafeAreaView>
      <FlatList data={transactions}
      renderItem={({item})=><Transactions data={item}/>}
      keyExtractor ={(item)=>item.id}/>
      
    </SafeAreaView>
  )
}

export default TransactionList