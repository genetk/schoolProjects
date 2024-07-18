import { View, Text, Pressable, Alert,StyleSheet } from "react-native";
import React, { useContext } from 'react'
import { IAuthor } from "../../types/IAuthor";
import MyContext from "../MyContext";
import { IPublisher } from "../../types/IPublisher";
import { useNavigation } from "@react-navigation/native";
import { removePublisher } from "../../helper/api/publisher-api";

interface PublisherProps {
  data: IPublisher;
}

const Publisher = ({ data }: PublisherProps)  => {


  const { publishers, setPublishers } = useContext(MyContext);



 
  const navigation = useNavigation();
  
  const  onEditPublisher = () => {
    navigation.navigate('upate-publisher', data)
  };
  const onAddPublisher=()=>{
    navigation.navigate("add-publisher");
  }
  const deletePublisher = async () => {
   
    try {
      const res = await removePublisher(data.id);
      if (res) {
        const index = publishers.findIndex((publish) => publish.id === data.id);
        if (index !== -1) {
          const arr = publishers.splice(index, 1);
          setPublishers(arr);
        }
      }
    } catch (error) {}
  };
  const onDeletePublisher= () => {
    Alert.alert("Information", "Do you want to delete this author?", [
      {
        text: "no",
        onPress: () => {}
      },
      {
        text: "yes",
        onPress:deletePublisher
      }
    ]);
  };
  return (
    <View style={styles.container}>
    <Text style={styles.label}>Name:</Text>
    <Text style={styles.value}>{data.name}</Text>
    <Text style={styles.label}>Phone:</Text>
    <Text style={styles.value}>{data.phone}</Text>
    <Text style={styles.label}>Email:</Text>
    <Text style={styles.value}>{data.email}</Text>

    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onAddPublisher}>
        <Text style={styles.buttonText}>Add Publisher</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onDeletePublisher}>
        <Text style={styles.buttonText}>Delete Publisher</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onEditPublisher}>
        <Text style={styles.buttonText}>Edit Publisher</Text>
      </Pressable>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  padding: 16,
  backgroundColor: '#fff',
  borderRadius: 8,
  marginVertical: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},
label: {
  fontWeight: 'bold',
  marginBottom: 4,
},
value: {
  marginBottom: 16,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},
button: {
  backgroundColor: '#007BFF',
  paddingVertical: 12,
  paddingHorizontal: 2,
  borderRadius: 5,
  alignItems: 'center',
  width: '30%',
},
buttonText: {
  color: '#fff',
  fontSize: 14,
},
});



export default Publisher