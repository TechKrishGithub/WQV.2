import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
        container: {
            flex:1,
            margin:10
        },
        dropdown: {
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 8,
            shadowColor: '#000',
            borderWidth:1,
            borderColor:'#ccc',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
    
            elevation: 2,
        },
        placeholderStyle: {
            // fontWeight:'300'
            marginHorizontal:10
        },
        selectedTextStyle: {
            fontSize: 14,
            fontWeight:'bold'
           
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
        item: {
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        selectedStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
            backgroundColor: 'white',
            shadowColor: '#000',
            marginTop: 8,
            marginRight: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
        },
        textSelectedStyle: {
            marginRight: 5,
            fontSize: 16,
        }
})

export default styles;