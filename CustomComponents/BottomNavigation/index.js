import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Keyboard } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ screenNames }) => {

  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name in screenNames) {
        iconName = focused ? screenNames[route.name].focusedIcon : screenNames[route.name].unfocusedIcon;
      } else {
        iconName = 'circle-outline'; // Default icon if screen name not found in props
      }

      return (   
        <View style={{borderBottomColor:focused?'#c6e9e9':'transparent',borderBottomWidth:2}}>
        <MaterialCommunityIcons name={iconName} size={focused?size+2:size} color={focused?'#c6e9e9':'#fff'} />
        </View>
      )
      
    },
    
    tabBarStyle: { height: keyboardVisible ? 0 : 48, backgroundColor: '#253b75',margin:10,borderRadius:10 },
    tabBarLabelStyle: { display: 'none' }, 
  
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {Object.keys(screenNames).map((name) =>(
        <Tab.Screen 
        key={name} 
        name={name} 
        component={screenNames[name].component}
        options={{headerShown:false}}
        initialParams={{ ...screenNames[name].props }} 
        />
      )
      )}
    </Tab.Navigator>
  );
};

export default React.memo(BottomTabNavigator);



