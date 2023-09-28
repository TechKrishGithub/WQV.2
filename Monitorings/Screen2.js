import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Screen2WW from './Screen2WW';
import DynamicTabNavigation from '../CustomComponents/TabTopNav';
import AllContent from './AllContent';
import { View, Text } from 'react-native';
import { styles } from './style';

const Screen2 = ({ route }) => {
  const { mnType } = route.params;

  const refKey = route.params?.refKey;
  const refMethod = route.params?.refMethod;


  const screen1Data = useSelector(state => state.screen1);

  const screensWithParams = [
    { screen: Screen2WW, params: { refKey: refKey, refMethod: refMethod } },
    { screen: AllContent, params: { refKey: refKey } }
  ];


  const myTimer = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f8fb' }}>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>Note: </Text>
          <Text style={styles.noteContent}>Please Select Water Type !.</Text>
        </View>
      </View>
    )
  }



  return (
    <>
      {
        mnType == 'Emergency' || mnType == 'Client' ?
          screen1Data.watType == '' ? myTimer() :
            screen1Data.watType == 'Waste Water/Pollution' ?
              <DynamicTabNavigation screensWithParams={screensWithParams} />
              :

              <AllContent route={route} />
          :
          mnType == 'Waste Water/Pollution' ?
            <DynamicTabNavigation screensWithParams={screensWithParams} />
            :
            <AllContent route={route} />
      }


    </>
  )

}

export default React.memo(Screen2);