import { Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

   
  },
  input: {
    width: "80%",
    fontSize: 24,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: "80%",
    fontSize: 30,
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "blue",
  },
 
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookDetails: {
    fontSize: 14,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default styles;
