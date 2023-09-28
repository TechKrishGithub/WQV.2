import React from 'react';
import { TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateScreen1Data } from '../reducers';
import { useRoute } from '@react-navigation/native';
import { Validate } from '../../CustomComponents/DecimalValidation';

export const PipedWaterSubDet = () => {
  const route = useRoute();
  const refKey = route.params?.refKey;
  const screen1Data = useSelector(state => state.screen1);
  const dispatch = useDispatch();

  const handleFieldChange = (field, value) => {
    // debounceUpdate(field, value);
    dispatch(updateScreen1Data({ [field]: value }));
  };

  const inputFields = [
    { key: 'NtwkName', label: 'Network Name *' },
    { key: 'NtwkAdmstr', label: 'Network Administration *' },
    { key: 'NtwkCvg', label: 'Network Coverage (Km2 pipeline) *' },
    { key: 'srcAbstn', label: 'Source of Abstraction *' },
    { key: 'tpeOfTrtmt', label: 'Type of Treatment *' },
    { key: 'RsrvrCap', label: 'Reservior Capacity *' },
    { key: 'NoOfClients', label: 'Number of Clients' },
    { key: 'cstPerUnit', label: 'Cost per Unit' },
    { key: 'notes', label: 'Notes' },
  ];

  return (
    <View>
      {inputFields.map(field => (
        <React.Fragment key={field.key}>
          <TextInput
            label={field.label}
            value={screen1Data[field.key]}
            mode="outlined"
            outlineColor='#ccc'
            activeOutlineColor="#888"
            keyboardType={field.key=='cstPerUnit'||field.key=='NoOfClients'?'decimal-pad':'default'}
            style={{ backgroundColor: '#fff', margin: 10 }}
            onChangeText={field.key=='cstPerUnit'||field.key=='NoOfClients'?(e)=>Validate(e,(f)=>handleFieldChange(field.key,f)):(e)=>handleFieldChange(field.key,e)}
            // onChangeText={value =>{ handleFieldChange(field.key, value)}}
          />
          {screen1Data[field.key] === '' && refKey === field.key && (
              <>
              {alert(`Please Enter ${field.label}`)}
            <Text style={{ color: 'red', margin: 10 }}>
              Please Enter {field.label}
            </Text>
            </>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};
