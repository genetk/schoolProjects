import { View, Text, Pressable, Alert } from "react-native";
import React, { useContext } from "react";
import { IAuthor } from "../../types/IAuthor";
import { removeAuthors } from "../../helper/api/author-api";
import MyContext from "../MyContext";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// * Delete Author: Provide a method to remove an author, with a confirmation prompt.
interface AuthorProps {
  data: IAuthor;
}

const Author = ({ data }: AuthorProps) => {
  const { authors, setAuthors } = useContext(MyContext);
  const navigation = useNavigation();
  
  const  onEditAuthor = () => {
    navigation.navigate('upate-author', data)
  };
  const onAddAuthor=()=>{
    navigation.navigate("add-author");
  }
  const deleteAuthor = async () => {
   
    try {
      const res = await removeAuthors(data.id);
      if (res) {
        const index = authors.findIndex((author) => author.id === data.id);
        if (index !== -1) {
          const arr = authors.splice(index, 1);
          setAuthors(arr);
        }
      }
    } catch (error) {}
  };
  const onDeleteAuthor = () => {
    Alert.alert("Information", "Do you want to delete this author?", [
      {
        text: "no",
        onPress: () => {}
      },
      {
        text: "yes",
        onPress:deleteAuthor
      }
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{data.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.text}>{data.phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{data.email}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={onAddAuthor}>
          <Text style={styles.buttonText}>Add Author</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onDeleteAuthor}>
          <Text style={styles.buttonText}>Delete Author</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onEditAuthor}>
          <Text style={styles.buttonText}>Edit Author</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Author
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    minWidth: 60,
    marginRight: 8,
  },
  text: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});