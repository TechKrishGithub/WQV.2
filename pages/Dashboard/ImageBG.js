import { styles } from './style';
import React, { useState } from 'react';
import { ImageBackground,View } from 'react-native';
import {
  Appbar,
  Avatar
} from 'react-native-paper';
import { Card } from 'react-native-elements';
import {FontAwesome5 } from '@expo/vector-icons'; 



const ImageBG=()=>
{
    const originalTitle = "Water Quality";
  const Title = originalTitle.toUpperCase();
    return(
<Card  containerStyle={styles.card}>
    
   <ImageBackground source={require('../../assets/waterQuality.png')} style={styles.image}>
   <View style={styles.overlay} />
   <View style={styles.content}>
   <Appbar.Content title={Title} titleStyle={styles.titleStyle} />
       <Avatar.Icon
         backgroundColor="#205f7f"
         size={50}
         icon={() => <FontAwesome5 name="hand-holding-water" size={25} color="#fff" />}
       />
       </View>
   </ImageBackground>
 </Card>

    )
}

export default ImageBG;