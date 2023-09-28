import React from 'react'
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import { TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import ModalSelectorCus from '../CustomComponents/ModalSelectorCus';
import data from '../constants';
import { getLocationAsync } from '../CustomComponents/LocalGps';
import { Validate } from '../CustomComponents/DecimalValidation';
import { useSelector, useDispatch } from 'react-redux';
import { updateScreen2Data } from './reducers';
import { MultiSelectCust } from '../CustomComponents/MultSelectCus';
import proj4 from 'proj4';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectData } from '../constants/DataBaseHandle';
import { handleMyData } from './handleGeo';

const AllContent = ({ route }) => {
  const { refKey: routeRefKey } = route.params;
  const refKey = routeRefKey;

  const [load, setLoad] = React.useState(false);
  const [TotData, setTotData] = React.useState([]);

  const screen2Data = useSelector(state => state.screen2);
  const [easNor, setEasNor] = React.useState({ eas: '', nor: '' })
  const dispatch = useDispatch();


  React.useEffect(() => {
    handleSet();
    setLoad(true);
    getLocationAsync((f) =>
      handleFieldChange('lat', f), (f) => handleFieldChange('lon', f));
    setTimeout(() => {
      getLocationAsync((f) => handleFieldChange('lat', f), (f) => handleFieldChange('lon', f))
      setLoad(false);
      handleSet();
    }
      , 200)
  }, [])

  React.useEffect(() => {
    ConvEasNor(screen2Data.lon, screen2Data.lat)
  }, [screen2Data.lat, screen2Data.lon])


  const ConvEasNor = (longitude, latitude) => {
    if (longitude && latitude) {
      proj4.defs([
        [
          'EPSG:4326', // WGS 84 - Geographic
          '+proj=longlat +datum=WGS84 +no_defs',
        ],
        [
          'EPSG:32633', // UTM Zone 33N
          '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs',
        ],
      ]);

      // Convert from WGS 84 to UTM Zone 33N
      const utmCoordinates = proj4('EPSG:4326', 'EPSG:32633', [parseFloat(longitude), parseFloat(latitude)]);

      const easting = utmCoordinates[0];
      const northing = utmCoordinates[1];

      setEasNor({ eas: easting, nor: northing });
    }
  }


  const handleFieldChange = (field, value) => {
    dispatch(updateScreen2Data({ [field]: value }));
  };


  const IconForMnType = <AntDesign name="caretdown" size={10} color="black" />
  const WeatherIcon = <MaterialCommunityIcons name="weather-fog" size={24} color="black" style={{ paddingHorizontal: 3 }} />;

  const TextInputCus = (value, label, field, Width, Check) => {
    return (
      <>
        <TextInput
          label={label}
          value={value}
          mode='outlined'
          outlineColor='#ccc'
          activeOutlineColor="#888"
          keyboardType={Check && 'decimal-pad'}
          style={[{ backgroundColor: '#fff', margin: 10 }, Width && { width: Width }]}
          onChangeText={Check ? (e) => Validate(e, (f) => handleFieldChange(field, f)) : (e) => handleFieldChange(field, e)}
        />
        {!Width && screen2Data[refKey] == '' &&
          refKey && refKey == field &&
          <>
            {alert(`Please Enter ${label.replace('*', '')}`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Enter {label}</Text>
          </>
        }
      </>
    )
  }

  const EasNorth = () => {
    return (
      <View style={styles.containerCor}>
        <Text style={styles.label}>Easting:  <Text style={styles.value}>{easNor.eas}</Text></Text>
        <Text style={styles.label}>Northing: <Text style={styles.value}>{easNor.nor}</Text></Text>
      </View>
    )
  }

  const handleSet = async () => {
    const v = await selectData('AreaDetails');
    setTotData(v)
  }



  const GeographInfo = () => {
    const types = ['District', 'County', 'SubCounty', 'Parish', 'village'];
    const typesForData = ["districtname", "countyname", "subcountyname", "parishname"]
    const errorDisplayed = {}
    return types.map((v, index) => {
      const enable = types[index - 1];
      const disabled = screen2Data[enable] == '' ? true : false;
      const Res = handleMyData(typesForData[index], TotData, screen2Data)
      return (
        <View key={index}>
          {index !== 4 ?
            <View key={index}>
              <ModalSelectorCus
                data={disabled ? [] : Res}
                initValue={v + ' *'}
                onChange={(e) => handleFieldChange(v, e)}
                value={screen2Data[v]}
                myIcon={IconForMnType}
                disabled={disabled}
              />
              {screen2Data[refKey] == '' &&
                refKey && refKey == v && !errorDisplayed[v] &&

                (() => {
                  errorDisplayed[v] = true;
                  alert(`Please Select ${v.replace('*', '')}`);
                  return (
                    <Text style={{ margin: 10, color: 'red' }}>Please Select {v}</Text>
                  );
                })()}
            </View>
            :
            <View key={v}>
              {TextInputCus(screen2Data.village, 'Village', 'village')}
            </View>
          }
        </View>
      )
    });
  }



  // const FieldParameter = () => {
  //   const inputFields = ['EC', 'PH', 'Turb', 'PAR', 'Temp'];
  //   const [selectedUnits, setSelectedUnits] = React.useState({});

  //   const handleUnitChange = (field, unit) => {
  //     setSelectedUnits(prevSelectedUnits => ({
  //       ...prevSelectedUnits,
  //       [field]: unit
  //     }));
  //   };
  //   return (
  //     <>
  //       <Text style={styles.GeoTit}>Field Parameters&Result</Text>
  //       {inputFields.map((v, index) => {

  //         return (
  //           <View key={index}>
  //             <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
  //               {TextInputCus(screen2Data[v], v + ' *', v, '45%', 'Check')}
  //               <View style={{ width: '45%' }}>
  //                 <ModalSelectorCus
  //                   data={data[v]}
  //                   initValue='Units'
  //                   onChange={unit => handleUnitChange(v, unit)} // Pass the field name and selected unit
  //                   mySearch="false"
  //                   value={selectedUnits[v]}
  //                   myIcon={IconForMnType}
  //                 />
  //               </View>
  //             </View>
  //             {screen2Data[refKey] == '' &&
  //               refKey && refKey == v &&
  //               <>
  //                 {alert(`Please Enter ${v.replace('*', '')}`)}
  //                 <Text style={{ color: 'red', margin: 16 }}>Please Enter {v}</Text>
  //               </>
  //             }
  //           </View>
  //         )
  //       }
  //       )}

  //     </>
  //   );
  // };



  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View style={[styles.Geograph]}>
        <Text style={styles.GeoTit}>Geographical Information</Text>
        {GeographInfo()}
        <Text style={styles.GeoTit}>Coordintates</Text>
        {load ?
          <ActivityIndicator animating={true} color='#09222a' size={20} style={styles.loader} />
          :
          <>
            <View style={{ flexDirection: 'row' }}>
              {TextInputCus(screen2Data.lat, 'Latitude', 'lat', '45%', 'Check')}
              {TextInputCus(screen2Data.lon, 'Longitude', 'lon', '45%', 'Check')}
            </View>
            {EasNorth()}
          </>
        }


        <Text style={styles.GeoTit}>Weather Conditions</Text>
        <MultiSelectCust
          data={data.Whether}
          selected={screen2Data.WhetherConditions}
          setSelected={(option) => handleFieldChange('WhetherConditions', option)}
          icon={WeatherIcon}
        />
        {screen2Data[refKey] == '' &&
          refKey && refKey == 'WhetherConditions' &&
          <>
            {alert(`Please Select Weather Conditions `)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Weather Conditions </Text>
          </>
        }

        {/* {FieldParameter()} */}

      </View>
    </ScrollView>
  )

}

export default React.memo(AllContent);