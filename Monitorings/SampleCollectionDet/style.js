import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#f3f8fb',
      justifyContent: 'center',
    },
    inputContainer: {
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    header: {
      margin: 20,
      textAlign: 'center',
    },
    progressBar: {
      height: 15,
      borderRadius: 5,
      margin: 10,
      overflow: 'hidden',
      backgroundColor: '#ccc'
    },
    progressValue: {
      height: '100%'
    },
    Headline:
    {
      borderBottomColor:'#2d6c80',
      borderBottomWidth:0.7,
      padding:10,
      fontWeight:'700',
      color:'#3863d7'
    },

      stageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      },
      stageName: {
        fontSize: 12,
        color: '#555'
      },
      activeStage: {
        color: '#2196f3', // Change to your preferred active stage color
        fontWeight: 'bold',
      },
      dataEntered: {
        color: '#00c853',
        fontWeight:'bold'
      },
      loader:
      {
        margin:10,
        alignItems:'flex-start',
        backgroundColor:'#bad8e3',
        padding:10,
        borderRadius:10
      },

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
    
      searchTextStyle:
      {
        fontWeight:'bold'
      },
      text:
      {
        color:'black'
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

  });
  