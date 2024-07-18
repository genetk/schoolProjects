import { View, Text,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ICatalog from '../types/ICatalog'
import { useNavigation } from '@react-navigation/native'
interface CatalogProp{
    data:ICatalog
}

const Catalog = ({data}:CatalogProp) => {
    const navigation=useNavigation()
    const onBorrowBook = () =>{
        navigation.navigate('borrow-book' ,data)
    }
    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Book ID: {data.bookId}</Text>
      <Text style={styles.text}>Available Copies: {data.availableCopies}</Text>
      <Text style={styles.text}>Total Copies: {data.numberOfCopies}</Text>
      <Pressable style={styles.button} onPress={onBorrowBook}>
        <Text style={styles.buttonText}>Borrow Book</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});



export default Catalog