import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";

import { isExisitedUser } from "../helper/api/author-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE } from "../helper/constants";

interface LoginProps{
  setLoggedIn:(loggedIn:boolean)=>void
}
const Login = ({setLoggedIn}:LoginProps) => {
  const [email, setEmail] = useState("");
 

  const handleLogin = async () => {
    if (email.trim() === "") {
      return Alert.alert("please enter email");
    }
    try {
      const res = await isExisitedUser(email);
      if (res) {
        Alert.alert("access granted");
        
         await AsyncStorage.setItem(LOCAL_STORAGE, JSON.stringify({loggedIn:true }));
         setLoggedIn(true);
        
        
      }else{
        Alert.alert("wrong email");
      }
      
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={(text: string) => setEmail(text.trim())}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,

    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Login;
