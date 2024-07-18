import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import React,{useContext, useState} from 'react'
import { IPublisher } from "../../types/IPublisher";
import MyContext from "../MyContext";
import { createPublisher } from "../../helper/api/publisher-api";



const AddPublisher = ({navigation}:any) => {

 

 
    const [publisher, setPublisher] = useState<IPublisher>({
      id: "",
      name: "",
      phone: "",
      email: "",
      address:""
    });
    const { publishers,setPublishers } = useContext(MyContext);
  
    const onAddAuthor = async () => {
      try {
        if (!publisher.id) {
          return Alert.alert("ID is empty", "Please provide a valid ID.");
        }
  
        const isDuplicate = publishers.find((x: IPublisher) => x.id === publisher.id);
        if (isDuplicate ) {
          return Alert.alert("author already exist or isempty");
        }
        const res = await createPublisher( publisher);
        if (res) {
          Alert.alert("Author added succesfully");
          setPublishers([...publishers, res]);
          navigation.navigate('publisher-list')
        }
      } catch (error) {}
    };
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="id"
          value={publisher.id}
          onChangeText={(text) => setPublisher({ ...publisher, id: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="name"
          value={publisher.name}
          onChangeText={(text) => setPublisher({ ...publisher, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="phone"
          value={publisher.phone}
          onChangeText={(text) => setPublisher({ ...publisher, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={publisher.email}
          onChangeText={(text) => setPublisher({ ...publisher, email: text })}
        />
        <Pressable style={styles.button} onPress={onAddAuthor}>
          <Text style={styles.button}>ADD Publisher</Text>
        </Pressable>
      </SafeAreaView>
    );
  };
  
 
  

export default AddPublisher


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});