import React, { useEffect } from "react";
import { styles } from "./style";
import { View, Text, ScrollView, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { DatePicker, ModalSelectorCus } from "../CustomComponents";
import { useSelector, useDispatch } from 'react-redux';
import { updateScreen1Data } from './reducers';
import data from '../constants';
import { Validate } from "../CustomComponents/DecimalValidation";
import { PipedWaterSubDet } from "./PipedWaterDetails";
import moment from "moment/moment";
import {
  resetScreen1Data,
  resetScreen2Data,
  resetScreen3Data,
  resetAbstraction,
  resetDischarge,
  resetIndustryDetails
} from './reducers';





const Screen1 = ({ route, navigation }) => {
  const { mnType } = route.params;

  const [initialTime] = React.useState(moment(new Date()).format('HH:mm:ss'));

  const [phone, setPhone] = React.useState('');

  const refKey = route.params?.refKey;

  const screen1Data = useSelector(state => state.screen1);
  const dispatch = useDispatch();

  const [load, setLoad] = React.useState(false);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      dispatch(resetScreen1Data());
      dispatch(resetScreen2Data());
      dispatch(resetScreen3Data());
      dispatch(resetAbstraction());
      dispatch(resetDischarge());
      dispatch(resetIndustryDetails());
    });

    return unsubscribe;
  }, [dispatch, navigation]);




  const AlertMessage = (value, field) => Alert.alert(
    `Confirmation`,
    `Are you sure You're Selecting Other than ${mnType}. Please Confirm ?`,
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => dispatch(updateScreen1Data({ [field]: value })),
      },
    ]
  );

  function generateUniqueWaterQualityID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueID = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters.charAt(randomIndex);
    }

    return uniqueID;
  }




  const handleFieldChange = (field, value) => {
    if (field === 'watType' && mnType !== 'Emergency' && mnType !== 'Client' && mnType !== value) {
      AlertMessage(value, field)
    } else {
      dispatch(updateScreen1Data({ [field]: value }));
    }
  };

  React.useEffect(() => { handleFieldChange('startTime', initialTime.toString()); screen1Data.date == '' && handleFieldChange('date', new Date().toString()) }, [])
  React.useEffect(() => {
    if (screen1Data.sampNo == '') {
      const uniqueKey = generateUniqueWaterQualityID();
      handleFieldChange('sampNo', uniqueKey);
    }
  }, [])



  const IconForMnType = <AntDesign name="caretdown" size={10} color="black" />

  const TextInputCus = (value, label, field, Check) => {
    return (
      <>

        <TextInput
          label={label}
          value={value}
          readOnly={field == 'sampNo' ? true : false}
          mode='outlined'
          cursorColor="#000"
          outlineColor="#ccc"
          activeOutlineColor="#888"
          keyboardType={Check && 'decimal-pad'}
          style={{ backgroundColor: '#fff', margin: 10 }}

          onChangeText={Check ? (e) => Validate(e, (f) => handleFieldChange(field, f)) : (e) => handleFieldChange(field, e)}
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == field &&
          <>
            {alert(`Please Enter ${label.replace('*', '')}`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Enter {label}</Text>
          </>
        }
      </>
    )
  }

  const PipedWater = () => {
    const myOptions = [{ label: 'Treated Water' }, { label: 'GFS' }, { label: 'Untreated Water' }];
    return (
      <>
        <ModalSelectorCus
          data={myOptions}
          initValue="Piped Water Type *"
          onChange={e => handleFieldChange('pipedWatType', e)}
          value={screen1Data.pipedWatType}
          myIcon={IconForMnType}
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'pipedWatType' &&
          <>
            {alert(`Please Select Piped Water Type`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Piped Water Type *</Text>
          </>
        }
        <PipedWaterSubDet />
      </>
    )
  }

  const BottleWater = () => {
    return (
      <>
        {TextInputCus(screen1Data.TypOfPurif, 'Type of Purification *', 'TypOfPurif')}
        {TextInputCus(screen1Data.Technology, 'Technology', 'Technology')}
        {TextInputCus(screen1Data.notesbtlWat, 'Notes', 'notesbtlWat')}
      </>
    )
  }


  const PointSource = () => {
    return (
      <>
        {TextInputCus(screen1Data.NoOfVilgSer, 'No. of Villages Served', 'NoOfVilgSer')}
        <ModalSelectorCus
          data={data.Question}
          initValue="Water User Committee *"
          onChange={e => handleFieldChange('WtrUsrCmty', e)}
          value={screen1Data.WtrUsrCmty}
          myIcon={IconForMnType}
          mySearch='false'
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'WtrUsrCmty' &&
          <>
            {alert(`Please Select Water User Committee`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Water User Committee *</Text>
          </>
        }
        {TextInputCus(screen1Data.notesPipe, 'Notes', 'notesPipe')}
      </>
    )
  }

  const hasValue = () => {
    const fields = ['catchment', 'CatchmentArea', 'subcatchment', 'subCatchmentCode', 'waterLevel', 'flowRate', 'length', 'width', 'notes'];
    for (var x = 0; x < fields.length; x++) {
      handleFieldChange(fields[x], '');
    }
  }


  const SurfaceWaterAdd = () => {
    const types = ['Catchment *', 'Catchment Area (Km2) *', 'Sub-Catchment', 'Sub-catchment Code', 'Water level (Mtr) *', 'Flow rate *', 'Length', 'Width', 'Notes'];
    const fields = ['catchment', 'CatchmentArea', 'subcatchment', 'subCatchmentCode', 'waterLevel', 'flowRate', 'length', 'width', 'notes'];

    return types.map((type, index) => {
      const check = type == 'Water level (Mtr) *' || type == 'Flow rate *' || type == 'Length' || type == 'Width';
      return (
        <View key={index}>
          {check ? TextInputCus(screen1Data[fields[index]], type, fields[index], 'Check') : TextInputCus(screen1Data[fields[index]], type, fields[index])}
        </View>
      )
    });
  };

  const Drinking = () => {
    return (
      <>
        <ModalSelectorCus
          data={data.SourceType}
          initValue="Source Type *"
          onChange={e => (screen1Data.srcCat ? (handleFieldChange('srcCat', ''), handleFieldChange('srcType', e)) : handleFieldChange('srcType', e))}
          value={screen1Data.srcType}
          myIcon={IconForMnType}
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'srcType' &&
          <>
            {alert(`Please Select Source Type`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Source Type *</Text>
          </>
        }
        {screen1Data.srcType &&
          <>
            <ModalSelectorCus
              data={data.SourceCategory[screen1Data.srcType.replace(/\s/g, "")]}
              initValue="Source Category *"
              onChange={e => handleFieldChange('srcCat', e)}
              value={screen1Data.srcCat}
              myIcon={IconForMnType}
            />
            {screen1Data[refKey] == '' &&
              refKey && refKey == 'srcCat' &&
              <>
                {alert(`Please Select Source Category`)}
                <Text style={{ margin: 10, color: 'red' }}>Please Select Source Category *</Text>
              </>
            }
          </>
        }
        {screen1Data.srcType === 'Piped Water' ? PipedWater() : screen1Data.srcType === 'Bottle Water' ? BottleWater() : screen1Data.srcType === 'Point Source' && PointSource()}
      </>
    )
  }

  const SW = () => {
    return (
      <>
        <ModalSelectorCus
          data={data.SourceCategorySW}
          initValue="Source Category *"
          onChange={e => {
            hasValue();
            handleFieldChange('srcCat', e)
          }}
          value={screen1Data.srcCat}
          myIcon={IconForMnType}
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'srcCat' &&
          <>
            {alert(`Please Select Source Category`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Source Category *</Text>
          </>
        }
        {screen1Data.srcCat && screen1Data.srcCat !== 'Swamp' && SurfaceWaterAdd()}
      </>
    )
  }

  useEffect(() => {
    setLoad(true);
    setTimeout(() => setLoad(false), 5000)
    handleFieldChange('startTime', new Date().toTimeString())
  }, [])

  return (

    <ScrollView style={[styles.container]} keyboardShouldPersistTaps="always">
      <View style={styles.Geograph}>

        <DatePicker
          date={screen1Data.date ? new Date(screen1Data.date) : new Date()}
          setDate={(e) => handleFieldChange('date', e.toString())}
          label="Date"
        />




        {TextInputCus(screen1Data.sampNo, 'Sample Number *', 'sampNo')}

        <ModalSelectorCus
          data={mnType == 'Surface Water' ? data.NetworkSW : data.Network}
          value={screen1Data.netwkType}
          initValue="Network Type *"
          onChange={e => handleFieldChange('netwkType', e)}
          myIcon={IconForMnType}
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'netwkType' &&
          <>
            {alert(`Please Select Network Type`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Network Type *</Text>
          </>
        }

        <Text style={styles.GeoTit}>Source</Text>
        {TextInputCus(screen1Data.srcName, 'Source Name *', 'srcName')}
        {TextInputCus(screen1Data.srcId, 'Source Code', 'srcId')}
        {TextInputCus(screen1Data.siteDesc, 'Site Description *', 'siteDesc')}

        <ModalSelectorCus
          data={data.SampleMatrix}
          initValue="Sample Matrix *"
          onChange={(e) => handleFieldChange('sampMatx', e)}
          value={screen1Data.sampMatx}
          myIcon={IconForMnType}
          sortNo
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'sampMatx' &&
          <>
            {alert(`Please Select Sample Matrix`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Sample Matrix *</Text>
          </>
        }

        {screen1Data.sampMatx == 'Other' && TextInputCus(screen1Data.sampMatxOther, 'Sample Matrix Desription', 'sampMatxOther')}
        <ModalSelectorCus
          data={data.waterType}
          initValue="Water Type *"
          onChange={(e) => handleFieldChange('watType', e)}
          value={screen1Data.watType}
          myIcon={IconForMnType}
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'watType' &&
          <>
            {alert(`Please Select Water Type`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select Water Type *</Text>
          </>
        }

        {TextInputCus(screen1Data.sampDepth, 'Sampling Depth (Metres) *', 'sampDepth', 'Check')}


        {mnType == 'Emergency' || mnType == 'Client' ?
          screen1Data.watType !== 'Surface Water' &&
          <>
            <ModalSelectorCus
              data={data.catchment}
              initValue="Catchment *"
              onChange={(e) => handleFieldChange('catchment', e)}
              value={screen1Data.catchment}
              myIcon={IconForMnType}
            />
            {screen1Data[refKey] == '' &&
              refKey && refKey == 'catchment' &&
              <>
                {alert(`Please Select Catchment`)}
                <Text style={{ margin: 10, color: 'red' }}>Please Select Catchment *</Text>
              </>
            }
            {TextInputCus(screen1Data.subcatchment, 'Sub Catchment', 'subcatchment')}
          </>
          :
          mnType !== 'Surface Water' &&
          <>
            <ModalSelectorCus
              data={data.catchment}
              initValue="Catchment *"
              onChange={(e) => handleFieldChange('catchment', e)}
              value={screen1Data.catchment}
              myIcon={IconForMnType}
            />
            {screen1Data[refKey] == '' &&
              refKey && refKey == 'catchment' &&
              <>
                {alert(`Please Select Catchment`)}
                <Text style={{ margin: 10, color: 'red' }}>Please Select Catchment *</Text>
              </>
            }
            {TextInputCus(screen1Data.subcatchment, 'Sub Catchment', 'subcatchment')}

          </>
        }

        {mnType == 'Emergency' || mnType == 'Client' ?
          screen1Data.watType == 'Waste Water/Pollution'
          &&
          <>
            <ModalSelectorCus
              data={data.WastwaterType}
              initValue="Wastwater Type *"
              onChange={(e) => handleFieldChange('WastwaterType', e)}
              value={screen1Data.WastwaterType}
              myIcon={IconForMnType}
            />
            {screen1Data[refKey] == '' &&
              refKey && refKey == 'WastwaterType' &&
              <>
                {alert(`Please Select Wastwater Type`)}
                <Text style={{ margin: 10, color: 'red' }}>Please Select Wastwater Type *</Text>
              </>
            }
          </>
          :
          mnType == 'Waste Water/Pollution' &&
          <>
            <ModalSelectorCus
              data={data.WastwaterType}
              initValue="Wastwater Type *"
              onChange={(e) => handleFieldChange('WastwaterType', e)}
              value={screen1Data.WastwaterType}
              myIcon={IconForMnType}
            />
            {screen1Data[refKey] == '' &&
              refKey && refKey == 'WastwaterType' &&
              <>
                {alert(`Please Select Wastwater Type`)}
                <Text style={{ margin: 10, color: 'red' }}>Please Select Wastwater Type *</Text>
              </>
            }
          </>
        }

        <ModalSelectorCus
          data={data.WMZ}
          initValue="WMZ *"
          onChange={(e) => handleFieldChange('wmz', e)}
          value={screen1Data.wmz}
          myIcon={IconForMnType}
        />
        {screen1Data[refKey] == '' &&
          refKey && refKey == 'wmz' &&
          <>
            {alert(`Please Select WMZ Type`)}
            <Text style={{ margin: 10, color: 'red' }}>Please Select WMZ *</Text>
          </>
        }

        {/* {TextInputCus(screen1Data.admtvUnit,'Administrative Unit','admtvUnit')} */}

        {mnType == 'Emergency' || mnType == 'Client' ?
          screen1Data.watType == 'Drinking Water' && Drinking() :
          mnType == 'Drinking Water' && Drinking()
        }
        {mnType == 'Emergency' || mnType == 'Client' ?
          screen1Data.watType == 'Surface Water' && SW() :
          mnType == 'Surface Water' && SW()
        }

      </View>
    </ScrollView>

  )
}

export default React.memo(Screen1);