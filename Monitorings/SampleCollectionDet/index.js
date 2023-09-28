import React from 'react';
import { Touchable, TouchableOpacity, View } from 'react-native';
import { TextInput, Button, Headline, Text } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector-searchable';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from 'react-native-paper';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { styles } from './style';
import { Validate } from '../../CustomComponents/DecimalValidation';
import { useSelector } from 'react-redux';
import { selectData } from '../../constants/DataBaseHandle';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const fields = [
  // { name: 'Microbiology', fields: ['Filtration','Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type','Preservation','Microbiology Duplicate','Microbiology Blank'] },
  { name: 'Microbiology', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  { name: 'Macrobiology', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  { name: 'General Chemistry', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  { name: 'Organics', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  { name: 'Trace metals', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  { name: 'TP/TN', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  { name: 'COD/TOC', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  { name: 'FOG', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  // { name: 'BIO', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  // { name: 'PHYTO', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
  // { name: 'ZOO', fields: ['Filtration', 'Volume of water Taken (Max.100 Ml)', 'Volume of Container (Ltr.)', 'Container Type', 'Preservation'] },
];


const MainScreen = (props) => {


  const { myFormData, setMyFormData } = props;
  const [currentFieldIndex, setCurrentFieldIndex] = React.useState(0);
  const [formData, setFormData] = React.useState(Array(fields.length).fill({}));
  const [error, setError] = React.useState('')

  const [loading, setLoading] = React.useState(true);


  const [showRemainingMicrobiologyFields, setShowRemainingMicrobiologyFields] = React.useState(false);

  const screen1Data = useSelector(state => state.screen1);

  const progress = (currentFieldIndex + 1) / fields.length;



  const populateFormData = (dataObject) => {
    fields.map((data, index) => {
      const fieldName = fields[index].name.replace(/\s/g, '');
      const myField = fieldName.replace('/', '_')

      fields[index].fields.map((field) => {
        dataObject.map(item => {
          for (const key in item) {
            if (key.includes(`${myField}_${(field.replace(/\s/g, '')).replace(/\(.*?\)/, '').trim()}`)) {
              if (item[key] !== null) {
                handleInputChangeEdit(field, item[key], index)
              }
            }
          }
        })

      })

    });
  };


  React.useEffect(() => {
    selectData('SampelCollection').then(data => {
      const dataObject = data.filter(v => v.sampNo == screen1Data.sampNo);
      if (dataObject) {
        populateFormData(dataObject);
      }
      setLoading(false);
    })

  }, []);

  const handleInputChangeEdit = (field, value, index) => {
    if (field === 'Filtration' && fields[index].name == 'Microbiology') {
      if (value == 'Yes') {
        setShowRemainingMicrobiologyFields(true);
      }
      else if (value == 'No') {
        setShowRemainingMicrobiologyFields(false);
      }
    }

    error ? setError('') : null;
    setFormData((prevFormData) => {
      const newData = [...prevFormData];
      const updatedField = { [field]: value, name: fields[index].name }; // Add the name field
      newData[index] = { ...newData[index], ...updatedField };
      return newData;
    });
    setMyFormData((prevFormData) => {
      const newData = [...prevFormData];
      const updatedField = { [field]: value, name: fields[index].name }; // Add the name field
      newData[index] = { ...newData[index], ...updatedField };
      return newData;
    })

  };


  const handleInputChange = (field, value) => {
    if (field === 'Filtration' && fields[currentFieldIndex].name == 'Microbiology') {
      if (value == 'Yes') {
        setShowRemainingMicrobiologyFields(true);
      }
      else if (value == 'No') {
        setShowRemainingMicrobiologyFields(false);
      }
    }
    if (field === 'Volume of water Taken (Max.100 Ml)') {
      if (parseInt(value) > 100) {
        return false
      }
    }
    error ? setError('') : null;
    setFormData((prevFormData) => {
      const newData = [...prevFormData];
      const updatedField = { [field]: value, name: fields[currentFieldIndex].name }; // Add the name field
      newData[currentFieldIndex] = { ...newData[currentFieldIndex], ...updatedField };
      return newData;
    });
    setMyFormData((prevFormData) => {
      const newData = [...prevFormData];
      const updatedField = { [field]: value, name: fields[currentFieldIndex].name }; // Add the name field
      newData[currentFieldIndex] = { ...newData[currentFieldIndex], ...updatedField };
      return newData;
    })

  };


  const hasValue = (obj) => {
    for (const key in obj) {
      if (key !== 'name') {
        if (obj.hasOwnProperty(key) && obj[key] !== "") {
          return true;
        }
      }
    }
    return false;
  }

  const handleNextField = () => {

    if (currentFieldIndex < fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    } else {
      // All fields have been filled, submit the data
      setMyFormData(formData);
      console.log(formData);
      // You can perform further actions with the collected data here,
      // such as saving it to a database, sending it to a server, etc.
    }
  };

  const handleAcClick = (index) => {
    setCurrentFieldIndex(index);
  }

  const IconForMnType = <AntDesign name="caretdown" size={10} color="black" />


  const renderModalSelector = (field, label) => (
    <ModalSelector
      data={[
        { key: 1, label: 'Yes' },
        { key: 2, label: 'No' },
      ]}
      key={field}
      onChange={(option) => {
        handleInputChange(field, option.label);
      }}
      animationType="fade"
      search={false}
      optionTextStyle={styles.dropdownOptionText}
      cancelStyle={styles.dropdownCancel}
      cancelTextStyle={styles.dropdownCancelText}
      scrollViewAccessibilityLabel={'Scrollable options'}
      cancelButtonAccessibilityLabel={'Cancel Button'}
      style={styles.dropdownContainer}
      searchStyle={styles.searchInput}
      searchTextStyle={styles.searchTextStyle}
      optionContainerStyle={styles.optionContainerStyle}
      optionStyle={styles.optionStyle}
    >
      <TextInput
        label={label}
        key={field}
        mode="outlined"
        outlineColor='#ccc'
        activeOutlineColor="#888"
        value={formData[currentFieldIndex][field] || ''}
        style={{ margin: 10, backgroundColor: '#fff' }}
        right={<TextInput.Icon icon={() => IconForMnType} />}
      />
    </ModalSelector>
  );

  // const Headings = ["MIB", "MAC", "GENCHEM", "ORG", "METAL", "TM", "TP/TN/COD/TOC/FOG", "BIO", "PHYTO", "ZOO"]
  const Headings = ["MIB", "MAC", "GENCHEM", "ORG", "TM", "TP/TN", "COD/TOC", "FOG", "BIO", "PHYTO", "ZOO"]

  return (
    <>
      {loading ?
        // <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        <ActivityIndicator animating={true} color='#09222a' size='small' style={styles.loader} />
        :

        <View style={styles.container}>

          <View style={styles.stageContainer}>
            {fields.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAcClick(index)}
              >
                <Text style={[
                  index < currentFieldIndex ? styles.completedStage : (index === currentFieldIndex ? styles.activeStage : {}),
                  formData[index] && Object.keys(formData[index]).length > 0 ? hasValue(formData[index]) && styles.dataEntered : {},
                ]}>
                  {/* AC {index + 1} */}
                  {Headings[index]}
                </Text>
              </TouchableOpacity>
            ))}

          </View>
          {/* <View style={styles.progressBar}>
        <LinearGradient
          colors={['#3f51b5', '#2196f3']}
          style={[styles.progressValue, { width: `${progress * 100}%` }]}
        />
      </View> */}
          <View style={styles.inputContainer}>
            <Headline style={[styles.Headline, styles.header]}>{fields[currentFieldIndex].name}</Headline>
            {fields[currentFieldIndex].fields.map((field) => {
              if (field === 'Filtration' || field == 'Volume of water Taken (Max.100 Ml)' || field == 'Volume of Container (Ltr.)') {
                return (
                  <View key={field}>
                    {field === 'Filtration' ? (
                      renderModalSelector('Filtration', 'Filtration')
                    )
                      :
                      <TextInput
                        label={field}
                        key={field}
                        mode="outlined"
                        outlineColor='#ccc'
                        activeOutlineColor="#888"
                        keyboardType='decimal-pad'
                        value={formData[currentFieldIndex][field] || ''}
                        // onChangeText={(value) => handleInputChange(field, value)}
                        right={field == 'Volume of water Taken (Max.100 Ml)' ? <TextInput.Affix text="/100 ML" /> : null}
                        onChangeText={(e) => Validate(e, (f) => handleInputChange(field, f))}
                        style={{ margin: 10, backgroundColor: '#fff' }}
                      />

                    }
                  </View>
                );
              }

              if (fields[currentFieldIndex].name === 'Microbiology' && !showRemainingMicrobiologyFields) {
                return null;
              }

              return (
                <View key={field}>
                  {fields[currentFieldIndex].name === 'Microbiology' && field === 'Microbiology Duplicate' ?
                    renderModalSelector(field, 'Microbiology Duplicate')
                    :
                    <TextInput
                      label={field}
                      mode="outlined"
                      outlineColor='#ccc'
                      activeOutlineColor="#888"
                      value={formData[currentFieldIndex][field] || ''}
                      right={field == 'Volume of water Taken (Max.100 Ml)' ? <TextInput.Affix text="/100ML" /> : null}
                      onChangeText={(value) => handleInputChange(field, value)}
                      style={{ margin: 10, backgroundColor: '#fff' }}
                    />
                  }
                </View>
              );
            })}

          </View>


          <View style={styles.buttonContainer}>

            {currentFieldIndex > 0 ? (
              <IconButton
                icon={({ color, size }) => <Ionicons name="md-arrow-back" size={size} color="red" />}
                onPress={() => setCurrentFieldIndex(currentFieldIndex - 1)}
              />
            )
              :
              <Text style={{ opacity: 0 }}>Sample</Text>
            }

            <IconButton
              icon={({ color, size }) =>
                currentFieldIndex === fields.length - 1 ? (
                  <Ionicons name="md-checkmark" size={size} color="green" />
                ) : (
                  <Ionicons name="md-arrow-forward" size={size} color="blue" />
                )
              }
              onPress={handleNextField}
            />

          </View>

        </View>
      }
    </>
  );
};

export default MainScreen;
