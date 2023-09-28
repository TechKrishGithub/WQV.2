import { MultiSelect } from 'react-native-element-dropdown';
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import styles from './style';

export const MultiSelectCust=({data,selected,setSelected,icon})=>
{
          const renderDataItem = (item) => {
        
            const check=selected.some(v=>v==item.value);
            return (
                <View style={styles.item}>
                    <Text style={[styles.selectedTextStyle]}>{item.label}</Text>
                    {check&&<AntDesign name="check" size={18} color="gray" style={styles.icon}/>}
                    
                </View>
            );
        };
      
  return(
    <View style={styles.container}>
<MultiSelect
key={data}
style={styles.dropdown}
placeholderStyle={styles.placeholderStyle}
selectedTextStyle={styles.selectedTextStyle}
inputSearchStyle={styles.inputSearchStyle}
iconStyle={styles.iconStyle}
data={data}
labelField="label"
valueField="value"
placeholder="Weather Conditions *"
value={selected}
search
searchPlaceholder="Search Weather Conditions..."
onChange={item => {setSelected(item)}}
renderLeftIcon={()=>icon}
maxHeight={150}
renderItem={renderDataItem}
renderSelectedItem={(item, unSelect) => (
    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
        <View style={styles.selectedStyle}>
            <Text style={styles.textSelectedStyle}>{item.label}</Text>
            <AntDesign color="red" name="delete" size={17} />
        </View>
    </TouchableOpacity>
)}
/>
</View>
  )      
}
