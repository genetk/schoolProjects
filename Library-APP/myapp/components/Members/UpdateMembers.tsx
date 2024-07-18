import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import MyContext from "../MyContext";

import styles from "../../helper/styles";
import { IMember } from "../../types/IMemeber";
import { updateMember } from "../../helper/api/member-api";
const EDITmember = ({ navigation, route }: any) => {
  const data = route.params;
  const [editmember, setEditmember] = useState<IMember>(data);
  const { members, setMembers } = useContext(MyContext);

  const onUpdatemember = async () => {
    try {
      const res = await updateMember(data.id, editmember);
      if (res) {
        const index = members.findIndex(
          (member:IMember)=> member.id === editmember.id
        );
        if (index !== -1) {
          const arr = [...members];
          arr[index] = res;
          setMembers(arr);
          navigation.navigate("member-list");
        }
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="id"
        value={editmember.id}
        onChangeText={(text) =>
          setEditmember({ ...editmember, id: text })
        }
        editable={false}
      />
      <TextInput
            style={styles.input}
            placeholder="residentId"
            value={editmember.residentID}
            onChangeText={(text) => setEditmember({ ...editmember, residentID: text })}
          />
            <TextInput
            style={styles.input}
            placeholder="firstname"
            value={editmember.firstname}
            onChangeText={(text) => setEditmember({ ...editmember,firstname: text })}
          />
             <TextInput
            style={styles.input}
            placeholder="lastname"
            value={editmember.lastname}
            onChangeText={(text) => setEditmember({ ...editmember,lastname: text })}
          />
            <TextInput
            style={styles.input}
            placeholder="adress"
            value={editmember.address}
            onChangeText={(text) => setEditmember({ ...editmember,address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="phone"
            value={editmember.phone}
            onChangeText={(text) => setEditmember({ ...editmember, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            value={editmember.email}
            onChangeText={(text) => setEditmember({ ...editmember, email: text })}
          />
          <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={onUpdatemember}>
            <Text style={styles.button}>UPDATE Member</Text>
          </Pressable>
          </View>
          </SafeAreaView>)
}

export default EDITmember ;
