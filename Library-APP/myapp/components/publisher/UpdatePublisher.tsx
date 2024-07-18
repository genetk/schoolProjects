import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import MyContext from "../MyContext";
import { IPublisher } from "../../types/IPublisher";
import { updatePublisher } from "../../helper/api/publisher-api";
import styles from "../../helper/styles";

const EDITPublisher = ({ navigation, route }: any) => {
  const data = route.params;
  const [editPublisher, setEditPublisher] = useState<IPublisher>(data);
  const { publishers, setPublishers } = useContext(MyContext);

  const onUpdatePublisher = async () => {
    try {
      const res = await updatePublisher(data.id, editPublisher);
      if (res) {
        const index = publishers.findIndex(
          (publish) => publish.id === editPublisher.id
        );
        if (index !== -1) {
          const arr = [...publishers];
          arr[index] = res;
          setPublishers(arr);
          navigation.navigate("publisher-list");
        }
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="id"
        value={editPublisher.id}
        onChangeText={(text) =>
          setEditPublisher({ ...editPublisher, id: text })
        }
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="name"
        value={editPublisher.name}
        onChangeText={(text) =>
          setEditPublisher({ ...editPublisher, name: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="phone"
        value={editPublisher.phone}
        onChangeText={(text) =>
          setEditPublisher({ ...editPublisher, phone: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={editPublisher.email}
        onChangeText={(text) =>
          setEditPublisher({ ...editPublisher, email: text })
        }
      />
      <Pressable style={styles.button} onPress={onUpdatePublisher}>
        <Text style={styles.button}>edit Publisher</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default EDITPublisher ;
