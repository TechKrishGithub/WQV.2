import { styles } from './style';
import React, { useState } from 'react';
import data from '../../constants';
import {
  Button,
  Appbar,
  Text,
  Avatar,
  Card,
  Paragraph,
  IconButton,
  Badge,
  AnimatedFAB,
  Animated,
  Searchbar,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalSelectorCus } from '../../CustomComponents';
import { MaterialCommunityIcons, MaterialIcons, Entypo, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons'; //
import { InsertData, selectData } from '../../constants/DataBaseHandle';
import { TouchableOpacity, View, LayoutAnimation, UIManager, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { LoadingScreen } from '../../CustomComponents';
import ImageBG from './ImageBG';




export const Dashboard = ({ navigation }) => {
  const [mnType, setMnType] = React.useState('');
  const [error, setError] = React.useState('');
  const [myData, setMyData] = React.useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const [loading, setLoading] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState([]);

  const [cardError, setCardError] = React.useState(false);


  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const [expandPlusButton, setExpandedPlusButton] = React.useState(true);

  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // Enable LayoutAnimation

  React.useEffect(() => {
    GetData();
  }, []);

  useFocusEffect(React.useCallback(() => {
    GetData();
  }, []))

  const GetData = () => {
    selectData('FirstScreenCommonFields').then(data => {
      if (data) {
        setMyData(data);
      }
    });
  }


  const handleCardPress = (mnType) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Apply layout animation
    setExpandedCard(expandedCard === mnType ? null : mnType);
    searchQuery ? setSearchQuery('') : null;
    cardError ? setCardError(false) : null;
  };


  const handleEdit = async (items) => {
    setLoading(true);
    const mnType = items.mnType;
    const mnTypeKey = mnType === 'Emergency' || mnType === 'Client' ? items.watType.replace(/\s+/g, '') : mnType.replace(/\s+/g, '');
    const sampNo = items.sampNo;

    let dataType, filterFn;

    if (mnType === 'Emergency' || mnType === 'Client') {
      dataType = items.watType === 'Drinking Water' ? 'DrinkingWatSubScreen1' : 'SurfaceWaterSubScreen1';
      filterFn = (v) => v.sampNo === sampNo;
    } else {
      dataType = mnType === 'Drinking Water' ? 'DrinkingWatSubScreen1' : 'SurfaceWaterSubScreen1';
      filterFn = (v) => v.sampNo === sampNo && v.mnType === mnType;
    }

    const [subData, screen2Data, screen3Data, sampleCollectionData, wasteWaterScreen2Data] = await Promise.all([
      selectData(dataType).then(data => data?.filter(filterFn)),
      selectData('SecondScreen').then(data => data?.filter(filterFn)),
      selectData('Screen3').then(data => data?.filter(filterFn)),
      selectData('SampelCollection').then(data => data?.filter(filterFn)),
      selectData('WasteWaterScreen2').then(data => data?.filter(filterFn))
    ]);

    const navigationData = {
      mnType: items.mnType,
      items,
      ...(filterFn ? { [mnTypeKey + 'Sub']: subData } : {}),
      Screen2EditData: screen2Data,
      Screen3EditData: screen3Data,
      SampelCollectionEditData: sampleCollectionData,
      WasteWaterScreen2EditData: wasteWaterScreen2Data
    };


    navigation.navigate("Monitoring", navigationData);
    setTimeout(() => setLoading(false), 500)
  };




  const handleStartMonitoring = () => {

    if (mnType) {
      setIsDialogVisible(false);
      setExpandedPlusButton(true);
      setLoading(true);
      setTimeout(() => { navigation.navigate("Monitoring", { mnType: mnType }); setLoading(false); }, 500)

    }
    else {
      setLoading(false)
      setError('Please Select Monitoring Type !');
    }
  };

  mnType && error ? setError('') : null;
  const IconForMnType = <AntDesign name="caretdown" size={15} color="black" />;

  const groupedData = {};

  const colors = ['#A8DADC', '#F4A261', '#00AEEF', '#BFA3D0', '#FC766AFF'];
  const TextClr = ['#162132', '#001F3F', '#fff', '#fff', '#FFF']

  if (myData) {
    myData.forEach(item => {
      if (!groupedData[item.mnType]) {
        groupedData[item.mnType] = [];
      }
      groupedData[item.mnType].push(item);
    });
  }

  React.useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 5000);
  }, []);

  const [load, setLoad] = React.useState(true);

  const Loading = () => {
    return (
      <Modal isVisible={load}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <LoadingScreen />
        </View>
      </Modal>
    );
  };

  const openDialog = () => {
    setExpandedCard(null)
    setIsDialogVisible(true);
    setExpandedPlusButton(false)
    setError('');
    setMnType('');
  };



  const StartMonitoringDialog = () => {
    return (
      <Modal isVisible={isDialogVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver
      >
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogText}>Monitoring Type</Text>
          <ModalSelectorCus
            data={data.MonitoringList}
            value={mnType}
            initValue="Monitoring Type"
            onChange={setMnType}
            myIcon={IconForMnType}
            search={false}
            sortNo
          />
          {error && <Text style={{ color: 'red', margin: 10 }}>{error}</Text>}

          <Button
            icon={() => <MaterialIcons name="not-started" size={24} color="white" />}
            mode="contained"
            onPress={handleStartMonitoring}
            style={styles.ButtonStyle}
            labelStyle={{ fontSize: 16, color: 'white' }}
          >
            Start Monitoring
          </Button>
          <TouchableOpacity onPress={() => { setIsDialogVisible(false); setExpandedPlusButton(true) }} style={styles.closeButton}>
            <FontAwesome name="window-close" size={24} color="#38369a" />

          </TouchableOpacity>
        </View>
      </Modal>
    );
  };


  const filterData = (mnType, currentSearchQuery) => {
    const normalizedQuery = currentSearchQuery.toLowerCase();
    const filtered = groupedData[mnType].filter(item => item.sampNo.toLowerCase().includes(normalizedQuery));
    if (filtered.length <= 0) {
      setCardError(true);
      setFilteredItems([])
    }
    else {
      setSearchQuery(currentSearchQuery);
      setCardError(false);
      currentSearchQuery ? setFilteredItems(filtered) : setFilteredItems([]);
    }

  };

  const loadingModal = () => {
    return (
      loading &&
      <Modal isVisible={loading}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver

      >
        <ActivityIndicator animating={true} color='#09222a' size='small' style={styles.loader} />
      </Modal>
    )
  }


  return (
    <>
      {load ? Loading()
        :
        <SafeAreaView style={[styles.container]}>
          <ImageBG />
          <ScrollView keyboardShouldPersistTaps="always" >
            <View style={[{ margin: 10 }]}>
              {myData.length > 0 ?
                Object.entries(groupedData).map(([mnType, items], colorIndex) => (
                  <Card key={mnType}
                    style={[styles.CardStyle, { backgroundColor: colors[colorIndex] }]}
                    elevation={4}
                  >
                    <Badge style={styles.Badge}>{items.length}</Badge>
                    <TouchableOpacity onPress={() => handleCardPress(mnType)}>
                      <Card.Title
                        title={mnType}
                        titleStyle={[styles.CardTitle, { color: TextClr[colorIndex] }]}
                        left={(props) => <Avatar.Icon {...props}
                          backgroundColor="#0e445c"
                          icon={mnType == 'Emergency' || mnType == 'Client' ? () => <MaterialCommunityIcons name={mnType == 'Client' ? "briefcase-account" : "car-emergency"} size={24} color="white" /> : () => <MaterialIcons name={mnType == 'Waste Water/Pollution' ? "water-damage" : mnType == 'Surface Water' ? 'branding-watermark' : "local-drink"} size={24} color="white" />} />}
                        right={(props) => <IconButton {...props} icon={() => <Entypo name={expandedCard == mnType ? 'chevron-down' : 'chevron-right'} size={24} color="#888" />} onPress={() => { onPress = handleCardPress(mnType) }} />}
                        titleVariant='labelLarge'
                      />
                    </TouchableOpacity>
                    {expandedCard === mnType && (
                      <Card.Content>
                        <Searchbar
                          placeholder="Search Samp No ..."
                          onChangeText={(text) => {
                            setSearchQuery(text);
                            filterData(mnType, text);
                          }}
                          value={searchQuery}
                          style={styles.searchBar}
                          inputStyle={styles.input}
                          iconColor="#000" // Change the icon color
                          placeholderTextColor="#888" // Change the placeholder text color
                        />
                        {filteredItems.length > 0 ?
                          filteredItems.map((item, index) => (
                            <View key={item.id} style={styles.CardContent}>

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}>
                                  <Paragraph style={{ fontWeight: 'bold', marginBottom: 5 }}>
                                    Samp No: {item.sampNo}
                                  </Paragraph>
                                  <Paragraph style={{ fontWeight: '500', fontSize: 14, color: '#38505e' }}>
                                    Date: {new Date(item.date).toLocaleDateString()} {'\n'}
                                    Water Type: <Text style={{ color: '#38505e' }}>{item.watType}</Text>{'\n'}
                                    {/* Duration: <Text style={{ color: '#38505e' }}>{item.DurationTime}</Text> */}
                                  </Paragraph>
                                </View>
                                <Button
                                  mode="elevated"
                                  icon={() => <AntDesign name="edit" size={18} color="blue" />}
                                  style={{ borderRadius: 5, alignSelf: 'center' }}
                                  labelStyle={{ fontWeight: '600', color: 'blue' }}
                                  onPress={() => handleEdit(items[index])}
                                >
                                  Edit
                                </Button>
                              </View>
                            </View>
                          ))
                          :
                          cardError == true ? <Text style={styles.NotFound}>
                            Data not found
                          </Text> :
                            items.map((item, index) => (
                              <View key={item.id} style={styles.CardContent}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <View style={{ flex: 1 }}>
                                    <Paragraph style={{ fontWeight: 'bold', marginBottom: 5 }}>
                                      Samp No: {item.sampNo}
                                    </Paragraph>
                                    <Paragraph style={{ fontWeight: '500', fontSize: 14, color: '#38505e' }}>
                                      Date: {new Date(item.date).toLocaleDateString()} {'\n'}
                                      Water Type: <Text style={{ color: '#38505e' }}>{item.watType}</Text>{'\n'}
                                      {/* Duration Time: <Text style={{ color: '#38505e' }}>{item.DurationTime}</Text> */}
                                    </Paragraph>
                                  </View>
                                  <Button
                                    mode="elevated"
                                    icon={() => <AntDesign name="edit" size={18} color="blue" />}
                                    style={{ borderRadius: 5, alignSelf: 'center' }}
                                    labelStyle={{ fontWeight: '600', color: 'blue' }}
                                    onPress={() => handleEdit(items[index])}
                                  >
                                    Edit
                                  </Button>
                                </View>
                              </View>
                            ))
                        }
                      </Card.Content>
                    )}
                  </Card>

                )) :

                <View style={{ justifyContent: 'center' }}>
                  <Card style={styles.CardStyle}>
                    <Badge style={styles.Badge}>0</Badge>
                    <Card.Title
                      titleStyle={styles.CardTitle}
                      left={(props) => <Avatar.Icon {...props}
                        backgroundColor="#4c8bb2"
                        icon={() => <AntDesign name="minuscircleo" size={24} color="#fff" />} />}
                      title="Initiate water quality monitoring !"
                    />
                  </Card>
                  <View style={{ alignItems: 'center', marginTop: '30%' }}>
                    <MaterialCommunityIcons name="magnify-remove-outline" size={100} color="#ccc" />
                    <Text style={styles.message}>No Records Found</Text>
                  </View>
                </View>
              }
            </View>


          </ScrollView>
          <AnimatedFAB
            icon={() => <MaterialCommunityIcons name="flask-plus" size={24} color="#fff" />}
            extended={expandPlusButton}
            label='MONITORING'
            onPress={openDialog}
            visible={true}
            animateFrom={'right'}
            iconMode={'dynamic'}
            style={[styles.fabStyle]}
            elevation={20}
            color='#fff'
          />

          {StartMonitoringDialog()}
          {loading && loadingModal()}
        </SafeAreaView>
      }
    </>
  );
};




