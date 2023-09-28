import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { AntDesign,MaterialIcons,Ionicons } from '@expo/vector-icons';
import BottomSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';

const MyCameraApp =(props) => {
    const {value,onDocumentChange}=props;
  const bottomSheetRef = useRef(null);

  // Function to handle image selection from the camera
  const pickFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
        onDocumentChange(result.assets[0].uri);
      bottomSheetRef.current.close();
    }
  };

  // Function to handle image selection from the gallery
  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
        onDocumentChange(result.assets[0].uri);
      bottomSheetRef.current.close();
    }
  };

  return (
    <View style={{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        margin:10
       
    }}>
   
           

      {value ? (
        <TouchableOpacity onPress={() => bottomSheetRef.current.open()}>
        <View style={{
          borderWidth:1,
          borderStyle:'dashed', 
          borderColor:'gray',
          borderRadius:10,
        }}>
        <Image
          source={{ uri: value }}
          style={{ width: 200, height: 200}}
        />
       </View>
       </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => bottomSheetRef.current.open()}>
          <View
            style={{
              width: 200,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth:1,
              borderStyle:'dashed', 
              borderColor:'gray',
              borderRadius:10,
            }}
          >
             {/* <AntDesign name="camera" size={60} color="black" /> */}
             <Ionicons name="camera-sharp" size={60} color="black" />
          </View>
        </TouchableOpacity>
            
      )}
      
    
      <BottomSheet
        ref={bottomSheetRef}
        closeOnDragDown
        height={200}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#ffffff',
          },
        }}
      >
        <TouchableOpacity
          onPress={pickFromCamera}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <AntDesign name="camera" size={24} color="black" style={{ marginRight: 15 }} />
          <Text>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={pickFromGallery}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <AntDesign name="picture" size={24} color="black" style={{ marginRight: 15 }} />
          <Text>Gallery</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
}

export default React.memo(MyCameraApp);
