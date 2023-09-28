import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';

const DatePicker=(props)=>
{
    const {date,setDate,onDateSelect,label,onChange}=props;
    const [showPicker,setShowPicker]=React.useState(false);


    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
          setDate&&setDate(selectedDate);
          onDateSelect&&onDateSelect(selectedDate);
          onChange&&onChange(selectedDate)
        }
      };
      const myDate=typeof(date)=='object'?date:date?new Date(date):new Date();
  
    return(
        <>
         <TouchableOpacity style={{margin:10}} onPress={() => setShowPicker(true)}>
        <TextInput
         label={label}
         value={myDate.toLocaleDateString()}
         mode='outlined'
         outlineColor='#ccc'
         activeOutlineColor="#888"
         style={{backgroundColor:'#fff'}}
         readOnly
         right={<TextInput.Icon icon="calendar" onPress={() => setShowPicker(true)}/>}
         />
         </TouchableOpacity>   

         {showPicker && (
        <DateTimePicker
          testID="DatePicker"
          value={myDate}
          mode="date"
          minimumDate={new Date()}
          display="default"
          onChange={handleDateChange}
        />
 
      )}   
        </>
    )
}

export default React.memo(DatePicker);