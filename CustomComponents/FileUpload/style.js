import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
  container:
  {
    flex: 1
  },
    file:
    {
        flexDirection:'row',
        borderWidth:0.8,
        borderColor:'#000',
        borderRadius:10,
        width:'100%'
            },
    choose:
    {
        height:50,
        borderRadius:0.5,
        padding:2,
        borderColor:'#ccc',
        backgroundColor:'#ccc',
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    chooseText:
    {
        fontSize:12,
        fontWeight:'500'
    },
    choosedFile:
    {
        height:50,
        width:'70%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    previewContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      edit: {
        margin:3,
        paddingVertical: 5,
        // paddingHorizontal: 3,
        backgroundColor: '#007bff',
        borderRadius: 4
      },
      card: {
        padding: 15,
        borderRadius: 16,
        elevation: 6,
        alignItems:'center',
        justifyContent:'center'
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding:10
      },
      
})

export default styles;