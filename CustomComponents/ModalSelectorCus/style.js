import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    inputCell: {
        color:'black',
        marginTop:10,
        backgroundColor:'#fff'
      },
      searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor:'#fff',
        margin:10,
        height:50,
        borderRadius: 10,
        justifyContent:'center'
      },
      border:
      {
        // borderWidth: 1,
        // borderRadius: 4,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderColor:'#888'
      },
      searchTextStyle:
      {
        fontWeight:'bold'
      },
      text:
      {
        color:'black'
      },
      dropdownContainer: {
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 4,
        justifyContent: 'center',
        paddingHorizontal: 10,

      },
      dropdownOptionText: {
        color:'#0d1c24',
        textAlign:'left',
        fontWeight:'600'
      },
      dropdownCancel: {
        padding: 10,
        alignItems: 'center',
        backgroundColor:'transparent'
      },
      dropdownSelectedOption: {
        backgroundColor: 'yellow', // Set the desired background color for the selected option
      },
      dropdownCancelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform:'uppercase'
      },
      optionContainerStyle:
      {
        backgroundColor:'#e4e6f1'
      },
      optionStyle:
      {
        borderBottomWidth:1,
        borderBottomColor:'#fff',
        margin:3,
        borderRadius:10,
      }
      
})

export default styles;