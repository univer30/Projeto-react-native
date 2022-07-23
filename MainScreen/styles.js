import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
   container: {
    height: '100vh',
      padding: 15, 
      backgroundColor: '#E0FFFF'
   }, 
   input: {
     fontSize: 30,
     padding: 10,
   },
   buttonContainer: {
     alignItems: 'center',
     justifyContainer: 'center',
     flexDirection: 'row'
   },
   button: {
     padding: 5,
     flex: 1
   },
   task:{
     fontSize: 30,
     color: "#fff"
   },
   
  list: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderRadius: '25px',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#565656'
  }
})

export {styles}