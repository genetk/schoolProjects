import { View, Text, Pressable, SafeAreaView,StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import { IBook } from "../../types/IBook";

import { updateAuthors } from "../../helper/api/author-api";
import { removeBooks } from "../../helper/api/book-api";
import MyContext from "../MyContext";
import { useNavigation } from "@react-navigation/native";
interface BookProps {
  data: IBook;
  index: number;
}  

const Books = ({ data }: BookProps) => {
  const { books, setBooks } = useContext(MyContext);
  const navigation=useNavigation()

  const onNavigateToAddbook = () => {
    navigation.navigate('add-book');
  }
  const onUpdateBook= () => {
    navigation.navigate("update-book", data);
  };
  
  
  const deleteBook = async () => {
    
      try {
        const res = await removeBooks(data.id);
        if (res) {
          const index = books.findIndex(x=>x.id === data.id)
          if(index!==-1){
            const arr = books.splice(index,1)
            setBooks(arr)
          }
        }
      } catch (error) {}
    }
 
  const onDeleteBook = () => {
    Alert.alert("Information", "Do you want to delete this book?", [
      {
        text: "no",
        onPress: () => {}
      },
      {
        text: "yes",
        onPress:deleteBook
      }
    ]);
  };
  return (

<View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{data.title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Genre:</Text>
        <Text style={styles.value}>{data.genre}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{data.category}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Authors:</Text>
        <Text style={styles.value}>{data.authorIDs.join(", ")}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Publisher:</Text>
        <Text style={styles.value}>{data.publisherId}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onDeleteBook}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onUpdateBook}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onNavigateToAddbook}>
        <Text style={styles.buttonText}>Add book</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  row: {
    flexDirection: "row",
    marginBottom: 5
  },
  label: {
    fontWeight: "bold",
    width: 100
  },
  value: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  button: {
    backgroundColor: "#0066CC",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  }
});