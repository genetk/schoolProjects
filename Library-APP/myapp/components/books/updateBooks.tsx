import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext,useState } from "react";
import { IBook } from "../../types/IBook";
import { updateBooks } from "../../helper/api/book-api";
import MyContext from "../MyContext";
import { Picker } from "@react-native-picker/picker";


const EditBooks = ({ navigation, route }: any) => {
  const { books, setBooks,authors,publishers } = useContext(MyContext);
  const data = route.params;
  const [editbook, setEditbook] = useState<IBook>(data);
  const [selectedAuthor, setSelectedAuthor] = useState<string>(data.authorIDs);
  const [selectedPublisher, setSelectedPublisher] = useState<string>(
    data.publisherId
  );

  const onSubmit = async () => {
    try {
      const res = await updateBooks(data.id, editbook);
      if (res) {
        const index = books.findIndex((x) => x.id === data.id);
        if (index !== -1) {
          const arr = [...books];
          arr[index] = res;
          setBooks(arr);
          Alert.alert('updated')
          navigation.navigate("book-list");
       
        }
      }
    } catch (error) {}
  };
 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="id"
          value={editbook.id}
          onChangeText={(text: string) =>
            setEditbook({ ...editbook, id: text })
           
          }
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={editbook.title}
          onChangeText={(text: string) =>
            setEditbook({ ...editbook, title: text })
            
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          value={editbook.genre}
          onChangeText={(text: string) =>
            setEditbook({ ...editbook, genre: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={editbook.category}
          onChangeText={(text: string) =>
            setEditbook({ ...editbook, category: text })
          }
        />
      </View>

      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedAuthor}
        onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select author" value="" />
        {authors.map((author,index) => (
          <Picker.Item key={index} label={`${author.id}`} value={author.id} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedPublisher}
        onValueChange={(itemValue) => setSelectedPublisher(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Publisher" value="" />
        {publishers.map((pub,index) => (
          <Picker.Item key={index} label={`${pub.id}`} value={pub.id} />
        ))}
      </Picker>
      </View>

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default EditBooks;

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
