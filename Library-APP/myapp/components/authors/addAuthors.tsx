import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { IAuthor } from "../../types/IAuthor";
import { StyleSheet } from "react-native";
import { createAuthor } from "../../helper/api/author-api";
import MyContext from "../MyContext";
// Create Author: A form to input author details. Ensure no duplicate authors by checking existing records before submission.
const AddAuthor = ({navigation}:any) => {
  const [author, setAuthor] = useState<IAuthor>({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const { authors, setAuthors } = useContext(MyContext);

  const onAddAuthor = async () => {
    try {
      if (!author.id) {
        return Alert.alert("ID is empty", "Please provide a valid ID.");
      }

      const isDuplicate = authors.find((x: IAuthor) => x.id === author.id);
      if (isDuplicate ) {
        return Alert.alert("author already exist ");
      }
      const res = await createAuthor( author);
      if (res) {
        Alert.alert("Author added succesfully");
        setAuthors([...authors, res]);
        navigation.navigate('author-list')
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="id"
        value={author.id}
        onChangeText={(text) => setAuthor({ ...author, id: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="name"
        value={author.name}
        onChangeText={(text) => setAuthor({ ...author, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="phone"
        value={author.phone}
        onChangeText={(text) => setAuthor({ ...author, phone: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={author.email}
        onChangeText={(text) => setAuthor({ ...author, email: text })}
      />
      <Pressable style={styles.button} onPress={onAddAuthor}>
        <Text style={styles.button}>ADD Author</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddAuthor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    alignItems:'center'
  },
});