import { View, Text } from 'react-native'
import React from 'react'
import { Itransaction } from '../../types/ITransaction'
interface TransactionProp{
  data:Itransaction
}
const Transactions = ({data}:TransactionProp) => {
  
  return (
    <View>
      <Text>bookId:{data.bookId}</Text>
      <Text>memberId:{data.memberId}</Text>
      <Text>borrowedDate:{data.borrowedDate}</Text> 
      <Text>returnedDate:{data.returnedDate}</Text>
     
    </View>
  )
}


export default Transactions