import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { IBook } from "../../types/IBook";

import { createBook } from "../../helper/api/book-api";
import MyContext from "../MyContext";
import { Picker } from "@react-native-picker/picker";
import addCatalog from "../addCatalog";

const AddBooks = ({ navigation }: any) => {
  const { books, setBooks, authors, publishers,catalogs,setCatalogs} = useContext(MyContext);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  
  const [book, setBook] = useState<IBook>({
    id: "",
    title: "",
    genre: "",
    category: "",
    authorIDs: [],
    publisherId: "",
  });

  const onAddBook = async () => {
    const newbook = {
      ...book,
      authorIDs: [selectedAuthor],
      publisherId: selectedPublisher,
    };
    const res = await createBook(newbook);
    if (res) {
      setBooks([...books, res]);
    }
      navigation.navigate("add-catalog",book)
   
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="id"
          value={book.id}
          onChangeText={(text: string) => setBook({ ...book, id: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={book.title}
          onChangeText={(text: string) => setBook({ ...book, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          value={book.genre}
          onChangeText={(text: string) => setBook({ ...book, genre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={book.category}
          onChangeText={(text: string) => setBook({ ...book, category: text })}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAuthor}
          onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select author" value="" />
          {authors.map((author, index) => (
            <Picker.Item key={index} label={`${author.id}`} value={author.id} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedPublisher}
          onValueChange={(itemValue) => setSelectedPublisher(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Publisher" value="" />
          {publishers.map((pub, index) => (
            <Picker.Item key={index} label={`${pub.id}`} value={pub.id} />
          ))}
        </Picker>
      </View>

      <Pressable style={styles.button} onPress={onAddBook}>
        <Text style={styles.buttonText}>Add Book</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default AddBooks;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
