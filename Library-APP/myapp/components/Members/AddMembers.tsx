import { View, Text, Alert, SafeAreaView, TextInput,StyleSheet, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'

import MyContext from '../MyContext';
import { IMember } from '../../types/IMemeber';
import { createMember } from '../../helper/api/member-api';


const AddMembers = ({navigation}:any) => {

   
      const [member, setMember] = useState<IMember>({
        id: "",
        residentID: "",
        firstname: "",
        lastname:'',
       
        address:"",
        phone:'',
        email:''
      });
     const{members,setMembers}=useContext(MyContext)
    
      const onAddMember = async () => {
        try {
          if (!member.id) {
            return Alert.alert("ID is empty", "Please provide a valid ID.");
          }
    
          const isDuplicate = members.find((x: IMember) => x.id === member.id);
          if (isDuplicate ) {
            return Alert.alert("member already exist or isempty");
          }
          const res = await createMember(member);
          if (res) {
            Alert.alert("Member added succesfully");
            setMembers([...members, res]);
            navigation.navigate('member-list')
          }
        } catch (error) {}
      };
      return (
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="id"
            value={member.id}
            onChangeText={(text) => setMember({ ...member, id: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="residentId"
            value={member.residentID}
            onChangeText={(text) => setMember({ ...member, residentID: text })}
          />
            <TextInput
            style={styles.input}
            placeholder="firstname"
            value={member.firstname}
            onChangeText={(text) => setMember({ ...member,firstname: text })}
          />
             <TextInput
            style={styles.input}
            placeholder="lastname"
            value={member.lastname}
            onChangeText={(text) => setMember({ ...member,lastname: text })}
          />
            <TextInput
            style={styles.input}
            placeholder="adress"
            value={member.address}
            onChangeText={(text) => setMember({ ...member,address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="phone"
            value={member.phone}
            onChangeText={(text) => setMember({ ...member, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            value={member.email}
            onChangeText={(text) => setMember({ ...member, email: text })}
          />
          <Pressable style={styles.button} onPress={onAddMember}>
            <Text style={styles.button}>ADD Member</Text>
          </Pressable>
        </SafeAreaView>
      );
    };
   
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
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#f5f5f5",
      },
      button: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        width: "50%",
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
      },
    });
  


 export default AddMembers



