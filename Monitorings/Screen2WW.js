import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import { TextInput } from 'react-native-paper';
import { Validate } from '../CustomComponents/DecimalValidation';
import DatePicker from '../CustomComponents/DatePicker';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { ModalSelectorCus } from '../CustomComponents';
import { updateAbstractionData,updateDischargeData,updateIndustryDetailsData } from './reducers';


const Screen2WW=({route})=>
{
  const {refKey,refMethod} = route.params;

  const Abstraction = useSelector(state => state.Abstraction);
  const Discharge = useSelector(state => state.Discharge);
  const IndustryDetails= useSelector(state => state.IndustryDetails);
  const dispatch = useDispatch();

  

  const IconForMnType=<AntDesign name="caretdown" size={10} color="black" />


    const handleChange = (field, value,Method) => {
        Method=='Abs'?dispatch(updateAbstractionData({ [field]: value })):Method=='Dis'?dispatch(updateDischargeData({ [field]: value })): dispatch(updateIndustryDetailsData({ [field]: value }));
      };


      const TextInputCus=(value,label,field,Method,Check)=>
      {
        return(
          <>
            <TextInput
            label={label}
            value={value}
            mode='outlined'
            outlineColor='#ccc'            
            activeOutlineColor="#888"
            keyboardType={Check&&'decimal-pad'}
            style={[{backgroundColor:'#fff',margin:10}]}
            onChangeText={Check?(e)=>Validate(e,(f)=>handleChange(field,f,Method)):(e)=>handleChange(field,e,Method)}
            /> 
             {refMethod=='Abstraction'?
             Abstraction[refKey]==''&&
             refKey&&refKey==field&&
             <>
             <Text style={{margin:10,color:'red'}}>Please Enter {label}</Text>
            {alert(`Please Enter ${label.replace('*','')}`)}
            </>
            :
            refMethod=='Discharge'?
            Discharge[refKey]==''&&
            refKey&&refKey==field&&
            <>
            <Text style={{margin:10,color:'red'}}>Please Enter {label}</Text>
           {alert(`Please Enter ${label.replace('*','')}`)}
           </>
            :
            IndustryDetails[refKey]==''&&
            refKey&&refKey==field&&
            <>
            <Text style={{margin:10,color:'red'}}>Please Enter {label}</Text>
           {alert(`Please Enter ${label.replace('*','')}`)}
           </>
            }
            </>
        )
      }


      React.useEffect(()=>{Discharge.ExpiryDate==''&&handleChange('ExpiryDate', new Date().toString(),'Dis');Abstraction.ExpiryDate==''&&handleChange('ExpiryDate', new Date().toString(),'Abs');},[])

    return(

         <ScrollView style={styles.container}>
          <View style={styles.Geograph}>
                <Text style={styles.GeoTit}>Abstraction</Text>
                {TextInputCus(Abstraction.AbstractionSrc,'Abstraction Source *','AbstractionSrc','Abs')}
                {TextInputCus(Abstraction.MonthlyAverage,'Monthly Average','MonthlyAverage','Abs','Check')}
                {TextInputCus(Abstraction.PermitNo,'Permit No. *','PermitNo','Abs','Check')}
                <DatePicker 
                 label='Expiry Date'
                 date={Abstraction.ExpiryDate}   
                 onDateSelect={(selectedDate)=>handleChange('ExpiryDate', selectedDate.toString(),'Abs')} 
               /> 
                   <ModalSelectorCus
                        data={data.Question}
                        initValue='Quarterly Submissions *'
                        onChange={(e)=>handleChange('QuarterlySubmissions',e,'Abs')}
                        mySearch="false"
                        value={Abstraction.QuarterlySubmissions}
                        myIcon={IconForMnType}
                      />
              {refMethod=='Abstraction'&&
             Abstraction[refKey]==''&&
             refKey&&refKey=='QuarterlySubmissions'&&
             <>
             <Text style={{margin:10,color:'red'}}>Please Select Quarterly Submissions *</Text>
              {alert(`Please Select Quarterly Submissions`)}
             </>
             }
               {/* {TextInputCus(Abstraction.QuarterlySubmissions,'Quarterly Submissions','QuarterlySubmissions','Abs')} */}
            {Abstraction[refKey]==''&&
            refKey&&refKey==Abstraction.QuarterlySubmissions&&
            <>
             {alert(`Please Select Quarterly Submissions *`)}
             <Text style={{margin:10,color:'red'}}>Please Select Quarterly Submissions </Text>
            </>
            
            }

               <Text style={styles.GeoTit}>Discharge</Text>
               {TextInputCus(Discharge.Discharge,'Discharge *','Discharge','Dis')}
               {TextInputCus(Discharge.RecepientSource,'Recepient Source','RecepientSource','Dis')}
               {TextInputCus(Discharge.PermitNo,'Permit No. *','PermitNo','Dis','Check')}
               {TextInputCus(Discharge.MonthlyAverage,'Monthly Average','MonthlyAverage','Dis','Check')}
               <DatePicker 
                  label='Expiry Date'
                  date={Discharge.ExpiryDate}   
                  onDateSelect={(selectedDate)=>handleChange('ExpiryDate', selectedDate.toString(),'Dis')} 
              /> 
                   <ModalSelectorCus
                        data={data.Question}
                        initValue='Quarterly Submissions *'
                        onChange={(e)=>handleChange('QuarterlySubmissions',e,'Dis')}
                        mySearch="false"
                        value={Discharge.QuarterlySubmissions}
                        myIcon={IconForMnType}
                      />
                       {refMethod=='Discharge'&&
                        Discharge[refKey]==''&&
                       refKey&&refKey=='QuarterlySubmissions'&&
                       <>
                        {alert(`Please Select Quarterly Submissions`)}
                        <Text style={{margin:10,color:'red'}}>Please Select Quarterly Submissions *</Text>
                       </>
                       
                       }
              {/* {TextInputCus(Discharge.QuarterlySubmissions,'Quarterly Submissions','QuarterlySubmissions','Dis')} */}


              <Text style={styles.GeoTit}>Industry Details</Text>
              {TextInputCus(IndustryDetails.TypeofIndustry,'Type of Industry *','TypeofIndustry')}
              {TextInputCus(IndustryDetails.RawMaterials,'Raw Materials *','RawMaterials')}
              {TextInputCus(IndustryDetails.ChemicalsUsed,'Chemicals Used *','ChemicalsUsed')}
              {TextInputCus(IndustryDetails.ProcessingMethods,'Processing Methods *','ProcessingMethods')}
              {TextInputCus(IndustryDetails.FinalProducts,'Final Products','FinalProducts')}
              {TextInputCus(IndustryDetails.FinalWasteProducts,'Final Waste Products','FinalWasteProducts')}
              {TextInputCus(IndustryDetails.TreatementType,'Treatement Type *','TreatementType')}
              </View>
               </ScrollView>
    )
}


export default React.memo(Screen2WW);