import "react-native-gesture-handler";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./routes/DrawerNavigator";
import Login from "./Authentication/Login";
import PinGeneration from "./Authentication/PinGeneration";
import PinAccess from "./Authentication/PinAccess";
import Monitorings from "./Monitorings";
import { View, Animated } from 'react-native';
import { Ionicons, FontAwesome5, AntDesign, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "react-native-paper";



// Prevent native splash screen from autohiding before App component declaration

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

const Stack = createStackNavigator();

const Options = () => ({
  headerStyle: { backgroundColor: '#253b75' },
  headerTintColor: '#fff',
  headerRight: () => <CustomHeaderRight />,
  headerLeft: () => <CustomBackButton />
})

const CustomBackButton = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    console.log("Custom back button pressed!");
    navigation.goBack();
  };

  return (
    <IconButton
      icon={() => <Ionicons name="md-return-up-back-outline" size={24} color="white" />}
      onPress={handleBackPress}
      style={{ marginLeft: 10 }}
    />
  );
};

const CustomHeaderRight = () => {

  const navigation = useNavigation();
  const [showOptions, setShowOptions] = React.useState(false);
  const optionsScale = React.useRef(new Animated.Value(0)).current;


  const toggleOptions = () => {
    if (showOptions) {
      Animated.timing(optionsScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setShowOptions(false);
      });
    } else {
      setShowOptions(true);
      Animated.timing(optionsScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };


  return (
    <View>
      <IconButton
        icon={() => <Ionicons name="ellipsis-vertical" size={24} color="white" />}
        onPress={toggleOptions}
      />
      {showOptions && (
        <Animated.View
          style={{
            transform: [{ scale: optionsScale }],
            flexDirection: 'row',
            position: 'absolute',
            top: 50,
            right: 10,
            backgroundColor: '#f3f8fb',
            elevation: 4,
            borderRadius: 10,
            height: 70,
            width: 200,
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <IconButton
            icon={() => <EvilIcons name="user" size={44} color="black" />}
            onPress={() => navigation.navigate('Logout')}
          />
          <IconButton
            icon={() => <EvilIcons name="lock" size={44} color="black" />}
            onPress={() => navigation.navigate('PinAccess')}
          />
        </Animated.View>
      )}
    </View>
  );
};




const DrawerStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="PinGeneration"
      component={PinGeneration}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="PinAccess"
      component={PinAccess}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Monitoring"
      component={Monitorings}
      options={Options}
    />
    {/* <Stack.Screen name="Drinking Water" component={DrinkingWater}  options={Options}/>

     <Stack.Screen name="Surface Water" component={SurfaceWater}  options={Options} />

     <Stack.Screen name="Waste Water" component={WasteWater}  options={Options} /> */}

  </Stack.Navigator>
);

export default function App() {
  React.useEffect(() => {
    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}