import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:'#f3f8fb',
        padding:10
    },
    AppHeader:
    {
        backgroundColor: 'transparent',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:14,
        padding:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    CardTitle:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:14
    },
    CardStyle:
    {
        marginBottom: 20,
        elevation: 5, 
        borderRadius: 10,
        backgroundColor:'#00AEEF'
    },
    CardContent:{
        padding:15,
        backgroundColor: '#e7effc',
        elevation:5,
        borderRadius:10,
        margin:5
    },
    titleStyle:{
        fontWeight: '700',
        color:'#ecf5fa'
    },
    ButtonStyle:{
        marginTop: 20, 
        borderRadius: 10, 
        backgroundColor: '#007bff',
        margin:10
    },
    Badge: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#008080',
        paddingHorizontal: 8,
        position:'absolute',
        left:5,
        top:5
      },
      fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        bottom:20,
        backgroundColor:'#0D47a4',
        color:'#fff'
      },
      dialogContainer: {
        backgroundColor: '#dff0f8',
        padding: 30,
        borderRadius: 10,
        justifyContent: 'center',
      },
      dialogText:{
        fontSize:13,
        fontWeight:'bold',
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        padding:10,
        color:'#393da1'
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5
      },
      message: {
        marginTop: 16,
        color: '#888888',
      },
      searchBar: {
        borderRadius: 10, 
        backgroundColor: '#fff',
        margin:5
      },
      input: {
        fontSize: 16,
        color: '#000'
      },
      iconContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
      },
      NotFound:
      {
        textAlign: 'center',
        color:'#fff',
        marginTop:10,
        fontWeight:'bold'
      },
      card: {
      padding: 0,
      marginBottom: 10,
      borderRadius: 8,
      overflow: 'hidden',
      margin:9,
      elevation:20,
      height:'20%'
      },
      image: {
        flexDirection:'row',
        alignItems:'center',
        height:'100%',
      },
      content:
      {
        flexDirection:'row',
        alignItems:'center',
        padding:10
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      },
      loader:
      {
        alignItems:'flex-start',
        backgroundColor:'#bad8e3',
        padding:24,
        borderRadius:8
      },
})
