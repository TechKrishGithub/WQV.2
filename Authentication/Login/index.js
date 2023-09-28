import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button, Image } from 'react-native';
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../../WQDb";
import logo from '../../assets/logo-removebg-preview.png'
import wiselogo from '../../assets/wiselogo.png';
import styles from "./style";
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import { ActivityIndicator } from "react-native-paper";
import { InsertData, selectData } from "../../constants/DataBaseHandle";
import * as Location from "expo-location";
import { AllTablesCreations } from "../../constants/TablesCreation";


const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setSuccess('');
    setError('');
    setLoading(false);
    getData();
    AllTablesCreations();
    setTimeout(() => {
      getData();
    }, 500)

  }, []);

  useEffect(() => {
    getLocPer();
  }, [])

  const getLocPer = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    status !== 'granted' ? await Location.requestForegroundPermissionsAsync() : console.log('Permission to access location success');
  }



  const getData = async () => {
    try {
      await AsyncStorage.getItem('Username').then(
        async value => {
          if (value != null) {
            await AsyncStorage.getItem('Password').then(
              value => {
                if (value != null) {
                  navigation.replace('PinGeneration');
                }
              }
            )
          }
        }
      )

    }
    catch (error) {
      console.log(error);
    }
  }


  const insertIntoAreaDet = async () => {
    const check = await selectData('AreaDetails');
    if (check.length > 0) {
      setLoading(false);
      setSuccess('');
      navigation.navigate('PinGeneration');
      setUsername('');
      setPassword('');
    }
    else {
      fetch('http://182.18.181.115:8084/api/Masterdata/Getadministrativeboundries').
        then(response => response.json()).
        then(responseText => JSON.parse(responseText)).then(async data => {
          data.map((v, index) => {
            const dataToInsert = {
              districtname: v.districtname,
              countyname: v.countyname,
              parishname: v.parishname,
              subcountyname: v.subcountyname
            }
            InsertData('AreaDetails', dataToInsert).then(v => {
              if (data.length == index + 1) {
                setLoading(false);
                setSuccess('');
                navigation.navigate('PinGeneration');
                setUsername('');
                setPassword('');
              }
            }
            )
          })
        })
    }
  }


  const Validate = async () => {

    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;
    if (isConnected == false) {
      Alert.alert(
        'No Network Connection',
        'Please connect to a network and try again.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    else {
      try {
        if (username != '' && password != '') {
          setLoading(true);
          setError('');
          fetch('http://182.18.181.115:8084/api/login/loginservice?username=' + username + '&password=' + password + '').
            then(response => response.json()).
            then(responseText => JSON.parse(responseText)).
            then(async (result) => {

              if (result.length !== 0) {
                console.log(result[0].userid);
                console.log(result[0].token);
                // const hasDetails = await  getWetlandDetails(result[0].userid);
                const hasDetails = true;
                if (hasDetails) {
                  setSuccess('Login Success Please Wait Fetching Offline Data....');
                  setLoading(true);
                  await AsyncStorage.setItem('Username', username);
                  await AsyncStorage.setItem('Password', password);
                  const dataInsert = {
                    username: username,
                    password: password,
                    userid: result[0].userid,
                    token: result[0].token
                  }
                  InsertData('User_Master', dataInsert)
                    .then((resultSet) => {
                      console.log(resultSet)
                    })
                  insertIntoAreaDet()
                }
                else {
                  setLoading(false);
                  setError('Apologies, no user activity found.');
                }

              }
              else {
                // Alert.alert('warning','Username and password wrong');
                setLoading(false)
                setError('Sorry,Please Enter Valid Username and password')
              }
            }).catch(error => {
              console.log(error)
            })
        }
        else {
          //  Alert.alert('warning','Please Entered Username and Password')
          setError('Sorry, Please Entered Username and Password')
        }
      }
      catch (error) {
        console.log(error);
      }

    }


  }







  // Rest of your component's rendering logic



  return (
    <View style={styles.user}>
      <View style={{ height: '10%', width: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 60 }}>
        <Image source={logo} style={{ height: '70%', width: '70%' }} />
      </View>
      <Text></Text>
      <View style={styles.Field}>
        <Image source={wiselogo} style={{ height: '15%', width: '30%', marginTop: -20 }} />
        <Text></Text>
        <Text style={{ fontWeight: '500' }}>Please login when you are online</Text>
        <Text></Text>
        <View style={styles.InputContainer}>
          <TextInput placeholder="Enter username" placeholderTextColor='grey' style={styles.FieldInput}
            onChangeText={
              (e) => {
                setUsername(e);
                if (error) {
                  setError('');
                }
                if (success) {
                  setSuccess('')
                }
              }}
            value={username}
            readOnly={success ? true : false}
          />
          <Icon name="user" size={20} color="#000" style={{ marginRight: 10 }} />
        </View>
        <Text></Text>
        <View style={styles.InputContainer}>
          <TextInput placeholder="Enter password" placeholderTextColor='gray' secureTextEntry={true} style={styles.FieldInput} onChangeText={(e) => { setPassword(e); if (error) { setError('') } if (success) { setSuccess('') } }} value={password} readOnly={success ? true : false} />
          <Icon name="lock" size={20} color="#000" style={{ marginRight: 10 }} />
        </View>
        <Text></Text>
        {!loading &&
          <TouchableOpacity style={styles.button} onPress={Validate}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        }
        <Text></Text>
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        {loading ? <ActivityIndicator size="small" color="blue" /> : null}
        {success ? <Text style={{ color: 'green' }}>{success}</Text> : null}
      </View>
      {/* <Warning visible={warningVis} change={WarningMessage}/> */}

    </View>
  )
}



export default Login;