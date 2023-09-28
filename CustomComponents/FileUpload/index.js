import * as DocumentPicker from 'expo-document-picker';
import { View, TouchableOpacity, Alert ,TextInput} from 'react-native';
import { Card, FAB, IconButton, Text} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import styles from './style';
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import RBsheeet from 'react-native-raw-bottom-sheet'



const FileUpload = ({value,onDocumentChange,setSize,mySize}) => {

  const [selectedFile, setSelectedFile] = useState(value);
  const [fileSize, setFileSize] = useState(null);
  const [isPickerOpen, setPickerOpen] = useState(false);

  const sheet=React.useRef();


  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: `application/${selectedFile.extension}`,
      });

      try {
        const response = await fetch('http://182.18.181.115:8091/api/DeepWellLogForm/FilePost', {
          method: 'POST',
          body: ({file:formData}),
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        console.log(response.ok)

        if (response.ok) {
          Alert.alert('File uploaded successfully!');
        } else {
          Alert.alert('Error', 'Failed to upload the file.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to upload the file.');
      }
    } else {
      Alert.alert('Error', 'Please select a file first.');
    }
  };

  const handleFile=async ()=>
  {
    try
    {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false,
    });
    handleUpload(result)
  }
  catch (error) {
    console.error(error);
  }
  }

  const handleCam = async () => {
    sheet.current.open()
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      };
  
      const result = await ImagePicker.launchCameraAsync(options);
  
      if (!result.canceled) {
        // Check if the selected asset exists in the "assets" array
        if (result.assets && result.assets.length > 0) {
          const selectedAsset = result.assets[0];
          handleUpload(selectedAsset);
        } else {
          // If the selected asset is not in the "assets" array, use the "uri" directly
          const { uri } = result;
          handleUpload({uri});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleUpload = async (result) => {
      if (result.type === 'success' || 'image') {
        const { uri } = result;
        const fileInfo = uri.split('/');
       const fileName = result.type==='success'?result.name:fileInfo[fileInfo.length - 1];
        const fileParts = fileName.split('.');
        const fileExtension = fileParts[fileParts.length - 1];

        const fileInfoResponse = await FileSystem.getInfoAsync(uri);
        const { size } = fileInfoResponse;
        const changeSize=parseInt(size/1024)

        if (changeSize > mySize) {
          !selectedFile && setSelectedFile(null);
          setFileSize(null);
          Alert.alert('File Size Limit Exceeded', `Your File Size is ${changeSize} kb, Please select a file below ${mySize} kb  in size.`)
          return;
        }
        selectedFile && selectedFile.size !== changeSize ? setSize(mySize + (selectedFile.size - changeSize)) : null;
        
        !selectedFile?setSize(mySize-changeSize):'';
        const mySelect={ name: fileName, extension: fileExtension, uri ,size: changeSize}
        setSelectedFile({ name: fileName, extension: fileExtension, uri ,size: changeSize});
        onDocumentChange?onDocumentChange(mySelect):null;
        setFileSize(changeSize);
      }
  };

  const handlePreview = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const { uri: localUri } = fileInfo;
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: localUri,
        flags: 1, 
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to preview the file.');
    }
  };

  return (
    <>
    <View style={styles.container}>
    <View style={styles.file}>
    
      {selectedFile ?(
        <TouchableOpacity onPress={() => handlePreview(selectedFile.uri)}>
          <View style={styles.choose}>
            <Text style={[styles.chooseText,{color:'blue'}]}>Preview</Text>
          </View>
        </TouchableOpacity>
      )
    :
    <TouchableOpacity onPress={()=>sheet.current.open()}>
    <View style={styles.choose}>
      <Text style={styles.chooseText}>Choose File</Text>
    </View>
  </TouchableOpacity>
    }
   
      <View style={[styles.choosedFile, { flexDirection: 'row' }]}>
        <View style={{width: '60%' }}>
          <TextInput
            placeholder="No file chosen"
            value={selectedFile ? selectedFile.name : ''}
            style={{ padding: 5, fontSize: 10, color: 'black'}}
            editable={false}
          />
          </View>
          {selectedFile && (
            <View style={{width:'40%'}}>
            <IconButton
              icon="file-edit"
              iconColor="#393194"
              size={25}
              onPress={()=>sheet.current.open()}
            />
            </View>
          )}
        </View>
    </View>      
    </View>
    <RBsheeet 
 ref={sheet}
openDuration={300}
customStyles={{
  container: {
    backgroundColor:'transparent',
  }
}}
 >
  <View style={{margin:20}}>
        <Card style={styles.card}>
        <Card.Title title="Choose File Source" titleStyle={{fontWeight:'bold'}}/>
          <Card.Content>
            <View style={styles.buttonContainer}>
               <FAB
                  icon="camera"
                  label='camera'
                  size='small'
                  uppercase={true}
                  onPress={() => {
                    sheet.current.close();
                    setTimeout(() => {
                      handleCam();
                    }, 100);
                  }}
                 />
                <Text style={{opacity:0}}>For</Text>
                 <FAB
                  icon="folder-open"
                  size='small'
                  label='Gallery'
                  uppercase={true}
                  onPress={() => {
                  sheet.current.close();
                  setTimeout(() => {
                    handleFile();
                  }, 100);
                }}
                 />
            
            </View>
          </Card.Content>
        </Card>
        </View>
      </RBsheeet>
    </>
  );
};

export default React.memo(FileUpload);