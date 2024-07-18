import { View, Text, Pressable, Alert ,StyleSheet} from "react-native";
import React, { useContext } from 'react'

import MyContext from "../MyContext";

import { useNavigation } from "@react-navigation/native";


import { IMember } from "../../types/IMemeber";
import { removeMember } from "../../helper/api/member-api";
interface MembersProps {
  data: IMember;
}

const Members = ({ data }: MembersProps)  => {

  const { members,setMembers } = useContext(MyContext);
 



 
  const navigation = useNavigation();
  
  const  onEditMember = () => {
    navigation.navigate('upate-member', data)
  };
  const onAddMember=()=>{
    navigation.navigate("add-member");
  }
  const deleteMember = async () => {
   
    try {
      const res = await removeMember(data.id);
      if (res) {
        const index = members.findIndex((member:IMember) => member.id === data.id);
        if (index !== -1) {
          const arr = members.splice(index, 1);
        
          setMembers(arr);
         
        }
      }
    } catch (error) {}
  };
  const onDeleteMember= () => {
    Alert.alert("Information", "Do you want to delete this author?", [
      {
        text: "no",
        onPress: () => {}
      },
      {
        text: "yes",
        onPress:deleteMember 
       
      }

    ]);
    
  };
  return (
    
      <View style={styles.container}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{data.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Resident ID:</Text>
          <Text style={styles.value}>{data.residentID}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{data.firstname}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{data.lastname}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{data.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{data.address}</Text>
        </View>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={onAddMember}>
            <Text style={styles.buttonText}>Add Member</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onDeleteMember}>
            <Text style={styles.buttonText}>Delete Member</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onEditMember}>
            <Text style={styles.buttonText}>Edit Member</Text>
          </Pressable>
        </View>
      </View>
    )
  };
  
  export default Members;
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 8,
    },
    value: {
      flexShrink: 1,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    button: {
      backgroundColor: '#007BFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
    },
  });
  




