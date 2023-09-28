import React from "react";
import { 
  View,
  Text,
  Image
} from "react-native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import myLogo from "../../assets/logo-removebg-preview.png"
import WiseLogooo from "../../assets/wiselogo.png";
import Logout from "../../Authentication/Logout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dashboard } from "../../pages/Dashboard";



const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
  
    <Drawer.Navigator
    drawerType="slide"
      drawerContent={(props) => {
        return (
          <SafeAreaView>

  <TouchableOpacity style={{padding: 5,paddingLeft:15}}>
  <Ionicons
    name="arrow-back-sharp"
    size={24}
    color="black"
    onPress={() => props.navigation.goBack()}
  />
  </TouchableOpacity>

            <View
              style={{
                width: "100%",                
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              
              <View>
               
                
              <Image
                source={myLogo}
                style={{
                  height: 110,
                  width: 110,
                  alignSelf:'center'
                }}
              />
              </View>
              <Text
                 style={{
                  fontSize:12,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#156235"
                }}

              >
              Republic Of Uganda
              </Text>

              <Text
                style={{
                  marginVertical: 6,
                  fontWeight: "bold",
                  fontSize:13,
                  color: "#156235",
                  textAlign:'center'
                }}
              >
              Ministry of Water and Environment 
              </Text>
           
              <Text
                style={{
                  marginVertical: 6,
                  fontWeight: "bold",
                  fontSize:12,
                  color: "#156235"
                }}
              >
              {/* National Wetland Information System */}
              Water Quality Management Database
              </Text>
            </View>

            <DrawerItemList {...props} />
            <View
              style={{
                height: 100,
                width: "100%",
                justifyContent: "flex-end",
                alignSelf:'flex-end',
                borderTopColor: "#f4f4f4",
                borderTopWidth: 1,
                
              }}
            >
              <Image
                source={WiseLogooo}
                style={{
                  height:'55%',
                  width: '55%',
                  marginLeft:10
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f7ffff",
          width: '55%',
        },
        headerStyle: {
          backgroundColor: "#0D47a4",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >

      <Drawer.Screen
        name="Dashboard"
        options={{
          // headerTitleAlign:'center',
          headerTitle:()=>
          {
            return(
              <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}> Dashboard</Text>
            )
           
          },
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: () => (
            <Ionicons name="home" size={20} color="#808080" />
          ),
          headerRight: () => (
            <Image
              source={WiseLogooo}
              style={{ width: 100, height: 50, marginRight: 10}}
            />
          ),
        }}
        component={Dashboard}
      />

    
      <Drawer.Screen
        name="Logout"
        options={{
          headerTitle:()=>
          {
            return(
              <Text style={{color:'#fff',fontWeight:'bold',fontSize:17,marginRight:20}}>Logout</Text>
            )
           
          },
          drawerLabel: "Logout",
          title: "Logout",
          drawerIcon: () => (
            <AntDesign name="logout"  size={20} color="#808080" />
          ),
        }}
        component={Logout}
      />
      
    </Drawer.Navigator>
 
  );
};

export default DrawerNavigator;