import React from "react";
import { Text, View } from "react-native";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import { LoadingScreen,BottomTabNavigator } from "../CustomComponents";
import { Provider} from 'react-redux';
import store from './reducers';
import { styles } from "./style";
import { Avatar, Card, IconButton  } from "react-native-paper";
import moment from "moment/moment";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  updateScreen1Data,
  updateScreen2Data,
  updateScreen3Data,
  updateAbstractionData,
  updateDischargeData,
  updateIndustryDetailsData,
} from './reducers';
import Modal from 'react-native-modal';



const Monitorings=({route})=>
{
    const {
      mnType,
      items,
      DrinkingWaterSub,
      SurfaceWaterSub,
      WasteWaterScreen2EditData, // Include this line
      Screen2EditData,
      Screen3EditData,
      SampelCollectionEditData}=route.params;
    const [load, setLoad] = React.useState(true);
    const [initialTime] = React.useState(moment(new Date()).format('HH:mm:ss')); 


    const screenNames = {
        'Source Info': { focusedIcon: 'home', unfocusedIcon: 'home', component: Screen1,props:{mnType}  },
        'Geographical': { focusedIcon: 'database', unfocusedIcon: 'database', component: Screen2,props:{mnType}  },
        'Final Info': { focusedIcon: 'check-circle', unfocusedIcon: 'check-circle', component: Screen3,props:{mnType} },
      };

      const Loading = () => {
        return (
          <Modal 
          isVisible={load}
          animationIn="zoomIn"  
          animationOut="zoomOut"
          useNativeDriver
          >
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <LoadingScreen />
          </View>
          </Modal>
        );
      };
      
      
        React.useEffect(() => {
          if (items) 
          {

            store.dispatch(updateScreen1Data(items));
            if(DrinkingWaterSub)
            {
              store.dispatch(updateScreen1Data(DrinkingWaterSub[0]));
            }
            else if(SurfaceWaterSub)
            {
              store.dispatch(updateScreen1Data(SurfaceWaterSub[0]))
            }
            if(mnType === 'Emergency' || mnType === 'Client')
            {
              if(items.watType=='Waste Water/Pollution')
              {
               
                const modifiedArray1 = removePrefixFromArrayItems(WasteWaterScreen2EditData, "Abstraction_");
                const modifiedArray2 = removePrefixFromArrayItems(WasteWaterScreen2EditData, "Discharge_");
                const modifiedArray3 = removePrefixFromArrayItems(WasteWaterScreen2EditData, "IndustryDetails_");
                store.dispatch(updateAbstractionData(modifiedArray1[0]))
                store.dispatch(updateDischargeData(modifiedArray2[0]))
                store.dispatch(updateIndustryDetailsData(modifiedArray3[0]))
              }
              else
              {
                store.dispatch(updateScreen2Data(Screen2EditData[0]));
                store.dispatch(updateScreen3Data(Screen3EditData[0]));
                const WhetherConditions = Screen2EditData[0].WhetherConditions && Screen2EditData[0].WhetherConditions.trim() !== '' 
                ? Screen2EditData[0].WhetherConditions.split(',').map(condition => condition.trim()) 
                : [];
                store.dispatch(updateScreen2Data({WhetherConditions:WhetherConditions}));
              }
            }
            else
            {
              if(mnType=='Waste Water/Pollution')
              {

                const modifiedArray1 = removePrefixFromArrayItems(WasteWaterScreen2EditData, "Abstraction_");
                const modifiedArray2 = removePrefixFromArrayItems(WasteWaterScreen2EditData, "Discharge_");
                const modifiedArray3 = removePrefixFromArrayItems(WasteWaterScreen2EditData, "IndustryDetails_");
                store.dispatch(updateAbstractionData(modifiedArray1[0]))
                store.dispatch(updateDischargeData(modifiedArray2[0]))
                store.dispatch(updateIndustryDetailsData(modifiedArray3[0]))
              }
              store.dispatch(updateScreen2Data(Screen2EditData[0]));
              store.dispatch(updateScreen3Data(Screen3EditData[0]));
              const WhetherConditions = Screen2EditData[0].WhetherConditions && Screen2EditData[0].WhetherConditions.trim() !== '' 
              ? Screen2EditData[0].WhetherConditions.split(',').map(condition => condition.trim()) 
              : [];
              store.dispatch(updateScreen2Data({WhetherConditions:WhetherConditions}));
            }
          }
          setTimeout(() => {
            setLoad(false);
          }, 5000);
        }, []);


        function removePrefixFromArrayItems(array, prefixToRemove) {
          return array.map(item => {
            const newItem = {};
            for (const key in item) {
              if (key.startsWith(prefixToRemove)) {
                newItem[key.substr(prefixToRemove.length)] = item[key];
              } else {
                newItem[key] = item[key];
              }
            }
            return newItem;
          });
        }
        

      
      

    return(
       <View style={styles.container}>
        {load && Loading()}
        <Card.Title
        title={mnType}
        subtitle={'Time: ' + initialTime}
        left={(props) => <Avatar.Icon {...props} 
        icon={()=>mnType=="Emergency"||mnType=="Client"?<MaterialCommunityIcons name="car-emergency" size={24} color="white" />:<Ionicons name="ios-water" size={24} color="white" />} 
        backgroundColor="#645ad6"/>}
        titleStyle={{fontWeight:'700',color:'#0e084f'}}
        subtitleStyle={{fontWeight:'700',color:'#5e5899'}}
       />
        <Provider store={store}>
          <BottomTabNavigator screenNames={screenNames}/>
          </Provider>
       </View>
    )
}

export default React.memo(Monitorings);