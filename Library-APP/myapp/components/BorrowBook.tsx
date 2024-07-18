import { View, Text, Alert, Button, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "./MyContext";
import ICatalog from "../types/ICatalog";
import { getCatalogs } from "../helper/api/catalo-api";

import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE } from "../helper/constants";
// Display a list of books and a list of members. The user selects a book and a member, then confirms the borrowing transaction.
// Decrease the availableCopies by 1 for the selected book. Prevent borrowing if no copies are available.
const BorrowBook = ({ navigation, route }: any) => {
  const data = route.params;
  const {
    books,
   
    members,
    catalogs,
    setCatalogs,
    transactions,
    setTransactions,
  } = useContext(MyContext);
  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [selectedMemberId, setSelectedMemeberId] = useState<string>("");

  const onConfirmBorrow = async () => {
    if (!selectedBookId || !selectedMemberId) {
      return Alert.alert(" please select  books and members");
    }

    const index = catalogs.findIndex(
      (catalog: ICatalog) => catalog.bookId === selectedBookId
    );

    if (index !== -1) {
      let updatedLogs = [...catalogs];
      if (updatedLogs[index].availableCopies > 0) {
        updatedLogs[index].availableCopies =
          updatedLogs[index].availableCopies - 1;

        const newTransaction = {
          id: selectedBookId + selectedMemberId,
          bookId: selectedBookId,
          memberId: selectedMemberId,
          borrowedDate: Date.now().toString(),
          returnedDate: "------",
        };
        setTransactions([...transactions, newTransaction]);
      

        setCatalogs([...updatedLogs]);
        navigation.navigate("catalog-list");
       
        console.log("", updatedLogs[index].availableCopies);
        return Alert.alert("succesful");
      }
      return Alert.alert("no copies available");
    }
  };

  const onConfirmReturn = () => {
    if (!selectedBookId || !selectedMemberId) {
      return Alert.alert("please select books and members");
    }

    const index = catalogs.findIndex(
      (catalog: ICatalog) => catalog.bookId === selectedBookId
    );

    if (index !== -1) {
      let updatedLogs = [...catalogs];

      updatedLogs[index].availableCopies =
        updatedLogs[index].availableCopies + 1;

      const transactionIndex = transactions.findIndex(
        (transaction) =>
          transaction.bookId === selectedBookId &&
          transaction.memberId === selectedMemberId &&
          transaction.returnedDate === "------"
      );
      if (transactionIndex !== -1) {
        let updatedTransaction = [...transactions];
        updatedTransaction[transactionIndex].returnedDate =
          Date.now().toString();

        setTransactions(updatedTransaction);
      }
     

      setCatalogs(updatedLogs);
      navigation.navigate("catalog-list");

      return Alert.alert("succesful returned");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select a Book:</Text>
      <Picker
        selectedValue={selectedBookId}
        onValueChange={(itemValue) => setSelectedBookId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a Book" value="" />
        {books.map((book) => (
          <Picker.Item key={book.id} label={`${book.title}`} value={book.id} />
        ))}
      </Picker>

      <Text>Select a Member:</Text>
      <Picker
        selectedValue={selectedMemberId}
        onValueChange={(itemValue) => setSelectedMemeberId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a Member" value="" />
        {members.map((member) => (
          <Picker.Item
            key={member.id}
            label={`${member.firstname} ${member.lastname}`}
            value={member.id}
          />
        ))}
      </Picker>
      <Button title="Confirm Return" onPress={onConfirmReturn} />

      <Button title="Confirm Borrowing" onPress={onConfirmBorrow} />
    </View>
  );
};

export default BorrowBook;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  picker: {
    marginVertical: 8,
  },
});
