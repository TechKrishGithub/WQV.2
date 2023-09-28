import React, { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import MyCameraApp from '../CustomComponents/ImagePicker';
import MainScreen from './SampleCollectionDet';
import { WarningBox } from '../CustomComponents';
import { useSelector, useDispatch } from 'react-redux';
import { updateScreen3Data } from './reducers';
import data from '../constants';
import ModalSelectorCus from '../CustomComponents/ModalSelectorCus';
import { InsertData, deleteFromTable, getColumnNames, selectData } from '../constants/DataBaseHandle';
import moment from "moment/moment";
import {
  resetScreen1Data,
  resetScreen2Data,
  resetScreen3Data,
  resetAbstraction,
  resetDischarge,
  resetIndustryDetails
} from './reducers';

const Screen3 = ({ route, navigation }) => {
  const { mnType } = route.params;


  const screen3Data = useSelector(state => state.screen3);
  const screen2Data = useSelector(state => state.screen2);
  const screen1Data = useSelector(state => state.screen1);
  const Abstraction = useSelector(state => state.Abstraction);
  const Discharge = useSelector(state => state.Discharge);
  const IndustryDetails = useSelector(state => state.IndustryDetails);
  const [formData, setFormData] = React.useState(Array(8).fill({}));

  const [EditMode, setMyEdit] = React.useState(null);

  const [message, setMessage] = React.useState('');

  const dispatch = useDispatch();

  const [success, setSuccess] = React.useState(false);

  const [refMyKey, setRefMyKey] = React.useState('');


  const CheckdEditModeAndDelete = async () => {
    try {
      const data = await selectData('FirstScreenCommonFields');
      const Check = data.filter(v => v.sampNo == screen1Data.sampNo);

      if (Check.length > 0) {
        const tablesToDelete = [
          'FirstScreenCommonFields',
          'DrinkingWatSubScreen1',
          'SurfaceWaterSubScreen1',
          'SecondScreen',
          'WasteWaterScreen2',
          'Screen3',
          'SampelCollection',
        ];

        for (const table of tablesToDelete) {
          await deleteFromTable(table, 'sampNo = ?', [screen1Data.sampNo]);
          console.log(table, 'deleted');
        }
      }

      setSuccess(true);
      const successInsert = InsertMyData();

      if (successInsert) {
        setMessage('Data Saved Successfully !');
      } else {
        setMessage('Sorry Data Not Saved, Please Try Again !');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  const handleSubmit = async () => {

    if (validateForm1Data(screen1Data)) {
      if (validateForm2Data(screen2Data)) {
        if (validateForm3Data(screen3Data)) {
          CheckdEditModeAndDelete();

        }
      }
    }

  }


  const handleClose = () => {
    setSuccess(false);
    if (message == 'Data Saved Successfully !') {
      navigation.navigate('Dashboard');
      setTimeout(() => {
        dispatch(resetScreen1Data());
        dispatch(resetScreen2Data());
        dispatch(resetScreen3Data());
        dispatch(resetAbstraction());
        dispatch(resetDischarge());
        dispatch(resetIndustryDetails());
      }, 2000)
    }
  }

  const validateForm1Data = (data) => {
    const srcType = data.srcType;

    if (mnType == 'Emergency' || mnType == 'Client') {

      if (data.watType == '') {

        navigation.navigate('Source Info', { refKey: 'watType' });
        return false;
      }
      if (data.watType == 'Drinking Water') {
        if (data.srcType == '') {
          // alert(`Please Fill srcType Field in First Screen !`);
          navigation.navigate('Source Info', { refKey: 'srcType' });
          return false;
        }
      }
    }
    if (mnType == 'Drinking Water') {
      if (data.srcType == '') {
        // alert(`Please Fill srcType Field in First Screen !`);
        navigation.navigate('Source Info', { refKey: 'srcType' });
        return false;
      }
    }

    const commonFields = ['sampNo', 'netwkType', 'srcName', 'siteDesc', 'sampMatx', 'watType', 'sampDepth', 'wmz', 'srcCat', 'catchment', 'WastwaterType'];

    for (const key of commonFields) {
      if (mnType == 'Emergency' || mnType == 'Client') {

        if (data.watType == 'Waste Water/Pollution') {
          if (key !== 'srcCat') {
            if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
              // alert(`Please Fill "${key}" Field in First Screen !`);
              navigation.navigate('Source Info', { refKey: key });
              return false;
            }
          }
        }
        if (data.watType == 'Surface Water' || data.watType == 'Drinking Water') {

          if (key !== 'WastwaterType') {

            if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
              if (data.watType == 'Surface Water') {
                if (screen1Data.srcCat == 'Swamp') {
                  if (key !== 'catchment') {

                    navigation.navigate('Source Info', { refKey: key });
                    return false;
                  }
                }
                else {
                  navigation.navigate('Source Info', { refKey: key });
                  return false;
                }
              }
              else {
                navigation.navigate('Source Info', { refKey: key });
                return false;
              }
              // alert(`Please Fill "${key}" Field in First Screen !`);

            }
          }
        }
      }
      else if (mnType == 'Waste Water/Pollution') {
        if (key !== 'srcCat') {
          if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
            // alert(`Please Fill "${key}" Field in First Screen !`);
            navigation.navigate('Source Info', { refKey: key });
            return false;
          }
        }
      }
      else {

        if (key !== 'WastwaterType') {
          if (data.srcCat == 'Swamp') {
            if (key !== 'catchment') {
              if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
                //  alert(`Please Fill "${key}" Field in First Screen !`);
                navigation.navigate('Source Info', { refKey: key });
                return false;
              }
            }
          }
          else {
            if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
              //  alert(`Please Fill "${key}" Field in First Screen !`);
              navigation.navigate('Source Info', { refKey: key });
              return false;
            }
          }

        }

      }
    }


    if ((mnType === 'Emergency' || mnType === 'Client') && data.watType === 'Drinking Water') {
      if (!DrinkingWatAdd(data, srcType)) {
        return false; // Return false if DrinkingWatAdd() returns false
      }
    } else if (mnType === 'Drinking Water') {
      if (!DrinkingWatAdd(data, srcType)) {
        return false; // Return false if DrinkingWatAdd() returns false
      }
    }

    if ((mnType === 'Emergency' || mnType === 'Client') && data.watType === 'Surface Water') {
      if (!SWAdd(data, data.srcCat)) {
        return false; // Return false if SWAdd() returns false
      }
    } else if (mnType === 'Surface Water') {
      if (!SWAdd(data, data.srcCat)) {
        return false; // Return false if SWAdd() returns false
      }
    }


    return true;
  };






  const DrinkingWatAdd = (data, srcType) => {
    if (srcType === 'Piped Water') {
      const pipedWaterFields = ['srcType', 'srcCat', 'pipedWatType', 'NtwkName', 'NtwkAdmstr', 'NtwkCvg', 'srcAbstn', 'tpeOfTrtmt', 'RsrvrCap'];
      for (const key of pipedWaterFields) {
        if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
          // alert(`Please Fill "${key}" Field in First Screen !`);
          navigation.navigate('Source Info', { refKey: key });
          return false;
        }
      }
    } else if (srcType === 'Bottle Water') {
      const bottleWaterFields = ['srcCat', 'TypOfPurif'];
      for (const key of bottleWaterFields) {
        if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
          // alert(`Please Fill "${key}" Field in First Screen !`);
          navigation.navigate('Source Info', { refKey: key });
          return false;
        }
      }
    } else if (srcType === 'Point Source') {
      const pointSourceFields = ['srcCat', 'WtrUsrCmty'];
      for (const key of pointSourceFields) {
        if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
          // alert(`Please Fill "${key}" Field in First Screen !`);
          navigation.navigate('Source Info', { refKey: key });
          return false;
        }
      }
    }
    return true;
  }

  const SWAdd = (data, srcType) => {

    if (srcType === 'Lake' || srcType === 'River' || srcType === 'Stream') {
      const pipedWaterFields = ['CatchmentArea', 'waterLevel', 'flowRate'];
      for (const key of pipedWaterFields) {
        if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {
          // alert(`Please Fill "${key}" Field in First Screen !`);
          navigation.navigate('Source Info', { refKey: key });
          return false;
        }
      }
    }
    return true;
  }

  const validateForm2Data = (data) => {
    for (const key in data) {
      if (key !== 'Village') {
        if (data[key] === "" || data[key] === null || data[key] === undefined || data[key].length === 0) {

          // alert(`Please Fill "${key}" Field in Second Screen !`);
          if (mnType == 'Emergency' || mnType == 'Client') {
            if (screen1Data.watType == 'Waste Water/Pollution') {
              navigation.navigate('Tab2', { refKey: key })
              return false;
            }
            else {
              navigation.navigate('Geographical', { refKey: key })
              return false;
            }
          }
          else if (mnType == 'Waste Water/Pollution') {
            navigation.navigate('Tab2', { refKey: key })
            return false;
          }
          else {
            alert(key)
            navigation.navigate('Geographical', { refKey: key })
            return false;
          }
        }

      }
    }
    // mnType=='Emergency'||mnType=='Client'?screen1Data.watType=='Waste Water/Pollution'&&WasteWatAdd() : mnType=='Waste Water/Pollution'&&WasteWatAdd();
    if (mnType === 'Emergency' || mnType === 'Client') {
      if (screen1Data.watType === 'Waste Water/Pollution') {
        if (!WasteWatAdd()) {
          return false; // Return false if WasteWatAdd() returns false
        }
      }
    } else if (mnType === 'Waste Water/Pollution') {
      if (!WasteWatAdd()) {
        return false; // Return false if WasteWatAdd() returns false
      }
    }

    return true;
  };




  const WasteWatAdd = () => {
    const AbstractionMand = ['AbstractionSrc', 'PermitNo', 'QuarterlySubmissions'];

    const DischargeMand = ['Discharge', 'PermitNo', 'QuarterlySubmissions'];

    const IndustryDetailsMand = ['TypeofIndustry', 'RawMaterials', 'ChemicalsUsed', 'ProcessingMethods', 'TreatementType']

    for (const key of AbstractionMand) {
      if (Abstraction[key] === "" || Abstraction[key] === null || Abstraction[key] === undefined || Abstraction[key].length === 0) {
        // alert(`Please Fill "${key}" Field in First Screen !`);
        navigation.navigate('Tab1', { refKey: key, refMethod: 'Abstraction' });
        return false;
      }
    }
    for (const key of DischargeMand) {
      if (Discharge[key] === "" || Discharge[key] === null || Discharge[key] === undefined || Discharge[key].length === 0) {
        // alert(`Please Fill "${key}" Field in First Screen !`);
        navigation.navigate('Tab1', { refKey: key, refMethod: 'Discharge' });
        return false;
      }
    }
    for (const key of IndustryDetailsMand) {
      if (IndustryDetails[key] === "" || IndustryDetails[key] === null || IndustryDetails[key] === undefined || IndustryDetails[key].length === 0) {
        // alert(`Please Fill "${key}" Field in First Screen !`);
        navigation.navigate('Tab1', { refKey: key, refMethod: 'IndustryDetails' });
        return false;
      }
    }
    return true;
  }



  const validateForm3Data = (data) => {

    if (data['fldDup'] === "" || data['fldDup'] === null || data['fldDup'] === undefined) {
      setRefMyKey('fldDup')
      // alert(`Please Fill "${key}" Field in Second Screen !`);
      return false;
    }

    const hasData = formData.some(obj => {
      return Object.keys(obj).length > 0;
    })
    if (!hasData) {
      alert('Sorry Please Fill Sample Collection Details !');
      return false;
    }
    if (screen3Data.file == null) {
      alert('Sorry Please upload Photograph !');
      return false;
    }
    return true;
  };




  const InsertMyData = async () => {
    try {
      await getColumnNames('FirstScreenCommonFields').then(columnNames => {
        const filteredCommonData = columnNames.reduce((acc, field) => {
          if (field !== 'id') {
            acc[field] = screen1Data[field];
          }
          return acc;
        }, {});
        filteredCommonData.mnType = mnType;
        filteredCommonData.DurationTime = CalTimeDiff();
        InsertData('FirstScreenCommonFields', filteredCommonData);
      });

      if ((mnType === 'Emergency' || mnType === 'Client') && screen1Data.watType === 'Drinking Water') {
        await InsertDrink();
      } else if (mnType === 'Drinking Water') {
        await InsertDrink();
      }

      if ((mnType === 'Emergency' || mnType === 'Client') && screen1Data.watType === 'Surface Water') {
        await InsertSurf();
      } else if (mnType === 'Surface Water') {
        await InsertSurf();
      }

      await getColumnNames('SecondScreen').then(columnNames => {
        const filteredCommonData = columnNames.reduce((acc, field) => {
          if (field === 'WhetherConditions' && Array.isArray(screen2Data[field])) {
            acc[field] = screen2Data[field].join(', ');
          } else {
            acc[field] = screen2Data[field];
          }
          return acc;
        }, {});

        filteredCommonData.mnType = mnType;
        filteredCommonData.sampNo = screen1Data.sampNo;
        InsertData('SecondScreen', filteredCommonData)
      });

      if ((mnType === 'Emergency' || mnType === 'Client') && screen1Data.watType === 'Waste Water/Pollution') {
        await InsertWaste();
      } else if (mnType === 'Waste Water/Pollution') {
        await InsertWaste();
      }

      await getColumnNames('Screen3').then(columnNames => {
        const filteredCommonData = columnNames.reduce((acc, field) => {
          if (field !== 'id') {
            acc[field] = screen3Data[field];
          }
          return acc;
        }, {});
        filteredCommonData.mnType = mnType;
        filteredCommonData.sampNo = screen1Data.sampNo;
        InsertData('Screen3', filteredCommonData);
      });

      await getColumnNames('SampelCollection').then(data => {
        const transformedObject = {};

        for (const formDataItem of formData) {
          const transformedItem = {};
          const name = formDataItem.name?.replace(/ /g, '');

          for (const key in formDataItem) {
            if (key !== "name") {
              // Remove "(Ltr.)" or other substrings you want to exclude
              const cleanKey = key.replace(/\(.*?\)/, '').trim();

              const transformedKey = `${name.replace(/\//g, '_')}_${cleanKey.replace(/ /g, '')}`;
              transformedItem[transformedKey] = formDataItem[key];
            }
          }
          Object.assign(transformedObject, transformedItem);
        }

        const filteredCommonData = data.reduce((acc, field) => {
          if (transformedObject[field] !== undefined) {
            acc[field] = transformedObject[field];
          } else {
            acc[field] = undefined; // Assign empty string for missing fields
          }
          return acc;
        }, {});

        filteredCommonData.sampNo = screen1Data.sampNo;
        filteredCommonData.mnType = mnType;

        InsertData('SampelCollection', filteredCommonData);
      });

      return true; // Return true after all functions have been executed successfully
    } catch (error) {
      console.error(error);
      return false; // Return false if any error occurs
    }
  };


  const InsertDrink = () => {
    getColumnNames('DrinkingWatSubScreen1').then(columnNames => {
      const filteredCommonData = columnNames.reduce((acc, field) => {
        if (field !== 'id') {
          acc[field] = screen1Data[field];
        }
        return acc;
      }, {});
      filteredCommonData.mnType = mnType;
      filteredCommonData.sampNo = screen1Data.sampNo;
      InsertData('DrinkingWatSubScreen1', filteredCommonData);
    })
  }

  const InsertSurf = () => {
    getColumnNames('SurfaceWaterSubScreen1').then(columnNames => {
      const filteredCommonData = columnNames.reduce((acc, field) => {
        if (field !== 'id') {
          if (screen1Data[field] !== undefined) {
            acc[field] = screen1Data[field];
          }
        }
        return acc;
      }, {});
      filteredCommonData.mnType = mnType;
      filteredCommonData.sampNo = screen1Data.sampNo;
      InsertData('SurfaceWaterSubScreen1', filteredCommonData);
    })
  }


  const InsertWaste = () => {
    getColumnNames('WasteWaterScreen2')
      .then(columnNames => {
        const prefixToRemove = "Abstraction_";
        const prefixToRemove2 = "Discharge_";
        const prefixToRemove3 = "IndustryDetails_";
        const modifiedData = {};

        columnNames.forEach((key) => {
          if (key.startsWith(prefixToRemove)) {
            const modifiedKey = key.substring(prefixToRemove.length);
            modifiedData[key] = Abstraction[modifiedKey];
          } else if (key.startsWith(prefixToRemove2)) {
            const modifiedKey = key.substring(prefixToRemove2.length);
            modifiedData[key] = Discharge[modifiedKey];
          }
          else if (key.startsWith(prefixToRemove3)) {
            const modifiedKey = key.substring(prefixToRemove3.length);
            modifiedData[key] = IndustryDetails[modifiedKey];
          }
          else {
            modifiedData[key] = undefined;
          }
        });

        modifiedData.mnType = mnType;
        modifiedData.sampNo = screen1Data.sampNo;
        InsertData('WasteWaterScreen2', modifiedData);
      })
  }


  const CalTimeDiff = () => {
    const timeFormat = "HH:mm:ss"; // Format for the time strings
    const timeZoneOffset = 3 * 60 * 60 * 1000; // Time zone offset in milliseconds (GMT+3)

    const timeParts = screen1Data.startTime.split(' ');
    const extractedTime = timeParts[0];

    const [hours, minutes, seconds] = extractedTime.split(':').map(Number);
    const date1 = new Date(0, 0, 0, hours, minutes, seconds) - timeZoneOffset;

    const [hours2, minutes2, seconds2] = screen3Data.EndTime.split(':').map(Number);
    const date2 = new Date(0, 0, 0, hours2, minutes2, seconds2) - timeZoneOffset;

    const timeDifference = date2 - date1; // Difference in milliseconds

    const diffHours = Math.floor(timeDifference / (60 * 60 * 1000));
    const diffMinutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const diffSeconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    const diff = diffHours == 0 ? `${diffMinutes} minutes, ${diffSeconds} seconds` : `${diffHours} hours, ${diffMinutes} minutes, ${diffSeconds} seconds`;
    return diff;
  }

  const handleFieldChange = (field, value) => {
    dispatch(updateScreen3Data({ [field]: value }));
  };



  const TextInputCus = (value, label, field) => {
    return (
      <TextInput
        label={label}
        value={value}
        readOnly={field == 'sampNoDup' ? true : false}
        mode='outlined'
        outlineColor='#ccc'
        activeOutlineColor="#888"
        style={{ backgroundColor: '#fff', margin: 10 }}
        onChangeText={handleFieldChange.bind(null, field)}
      />
    )
  }
  const IconForMnType = <AntDesign name="caretdown" size={10} color="black" />
  return (

    <ScrollView keyboardShouldPersistTaps='always' style={styles.container}>
      {success && <WarningBox Icon={message == 'Data Saved Successfully !' ? "checkbox-sharp" : 'warning'} visible={true} message={message}
        onClose={handleClose}
        success={success} />}

      <View style={styles.Geograph}>
        <Text style={styles.GeoTit}>Sample Collection details</Text>
        <MainScreen myFormData={formData} setMyFormData={setFormData} />

        <Text style={styles.GeoTit}>Quality Assurance</Text>
        <ModalSelectorCus
          data={data.Question}
          initValue="Field Duplicate *"
          onChange={(e) => {
            e == 'Yes' ? handleFieldChange('sampNoDup', screen1Data.sampNo + 'D') : handleFieldChange('sampNoDup', '');
            handleFieldChange('fldDup', e)
          }}
          mySearch="false"
          value={screen3Data.fldDup}
          myIcon={IconForMnType}
          yesorno="yes"
        />
        {screen3Data['fldDup'] == '' && refMyKey && <Text style={{ margin: 16, color: 'red' }}>Please Select Field Duplicate *</Text>}
        {screen3Data.fldDup == 'Yes' && TextInputCus(screen3Data.sampNoDup, 'Sample Number Duplicate', 'sampNoDup')}
        {TextInputCus(screen3Data.fldRup, 'Field Repulicate', 'fldRup')}
        {formData.filter(v => v.name === 'Microbiology')[0]?.Filtration == 'Yes' &&
          <>
            <ModalSelectorCus
              data={data.Question}
              initValue="Microbiology Duplicate *"
              onChange={(e) => { handleFieldChange('micDup', e) }}
              mySearch="false"
              value={screen3Data.micDup}
              myIcon={IconForMnType}
              yesorno="yes"
            />
            {TextInputCus(screen3Data.micBlank, 'Microbiology Blank', 'micBlank')}
          </>
        }
        {/* 'Microbiology Duplicate','Microbiology Blank' */}
        <Text style={styles.GeoTit}>Photograpgh</Text>
        <MyCameraApp value={screen3Data.file} onDocumentChange={(e) => handleFieldChange('file', e)} />
      </View>

      <Button icon={() => <Ionicons name="md-save-sharp" size={24} color="#fff" />}
        mode="elevated"
        style={styles.ButtonStyle}
        textColor="white"
        onPress={() => {
          handleFieldChange('EndTime', moment(new Date()).format('HH:mm:ss').toString());
          handleSubmit();
        }}
      >
        Submit
      </Button>

    </ScrollView>

  )
}

export default React.memo(Screen3);
