import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import WarningBox from '../WarningBox';
import { styles } from './style';


const Timer = (props) => {
  const { run,setRun,setMyElapsedTime,mySub } = props;
  const [isRunning, setIsRunning] = React.useState(false);
  const [timer, setTimer] = React.useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [showWarning,setShowWarning]=React.useState(false);
  const intervalRef = React.useRef();


  React.useEffect(() => { return () => {clearInterval(intervalRef.current)}}, []);

  React.useEffect(()=>{
    Stop();
  },[mySub]);

  const Stop=React.useCallback(async()=>{
    clearInterval(intervalRef.current);
    // Save the elapsed time to state
    setIsRunning(false);
    setRun(false);
    const totalMilliseconds =
      timer.hours * 3600000 +
      timer.minutes * 60000 +
      timer.seconds * 1000 +
      timer.milliseconds;
    setElapsedTime(totalMilliseconds);
    setMyElapsedTime(totalMilliseconds);
    // Reset the timer
    setTimer({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

    // Save the elapsed time to AsyncStorage
    try {
      await AsyncStorage.setItem('elapsedTime', JSON.stringify(totalMilliseconds));
    } catch (error) {
      console.log(error);
    }
    
  },[mySub])


  const startTimer = React.useCallback(() => {
    setIsRunning(true);
    setRun(true);
    intervalRef.current = setInterval(updateTimer, 150)}, []);


//   const stopTimer = React.useCallback(async () => {
//     if(mySub)
//     {
//     setIsRunning(false);
//     setRun(false);
//     clearInterval(intervalRef.current);

//     // Save the elapsed time to state
//     const totalMilliseconds =
//       timer.hours * 3600000 +
//       timer.minutes * 60000 +
//       timer.seconds * 1000 +
//       timer.milliseconds;
//     setElapsedTime(totalMilliseconds);
//     setMyElapsedTime(totalMilliseconds);
//     // Reset the timer
//     setTimer({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

//     // Save the elapsed time to AsyncStorage
//     try {
//       await AsyncStorage.setItem('elapsedTime', JSON.stringify(totalMilliseconds));
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   else
//   {
//     setShowWarning(true);
//   }
// }
//   , [timer]);
  

  const updateTimer = React.useCallback(() => {
    setTimer((prevTimer) => {
      let milliseconds = prevTimer.milliseconds + 100; // Update every 100 milliseconds
      let seconds = prevTimer.seconds;
      let minutes = prevTimer.minutes;
      let hours = prevTimer.hours;

      if (milliseconds >= 1000) {
        seconds += Math.floor(milliseconds / 1000);
        milliseconds %= 1000;
      }

      if (seconds >= 60) {
        minutes += Math.floor(seconds / 60);
        seconds %= 60;
      }

      if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes %= 60;
      }

      return { hours, minutes, seconds, milliseconds };
    });
  }, []);



  const startIcon = <MaterialCommunityIcons name="clock-start" size={15} color="black" />;

  return (
    <>
     {showWarning&&  <WarningBox
    visible={showWarning}
    message="Kindly ensure all data is submitted before halting the timer !"
    onClose={()=>setShowWarning(false)}/>
 }
  
    <View style={styles.Timer}>
    {
    !elapsedTime > 0 &&
    <Text
    style={{
      fontWeight: '700',
      color: 'blue',
      fontSize: 12,
    }}
  >
    Timer:{' '}
    {`${timer.hours.toString().padStart(2, '0')}:${timer.minutes.toString().padStart(2, '0')}:${timer.seconds.toString().padStart(
      2,
      '0'
    )}.${(timer.milliseconds / 10).toString().padStart(2, '0')}`}
  </Text>
  }
     
      {/* {isRunning ? (
        <Button
          icon={() => <Ionicons name="stop-circle" size={20} color="#000" />}
          mode="text"
          onPress={stopTimer}
          style={[styles.ButtonStyle]}
          textColor="#346463"
        >
          <Text style={{ fontSize: 10, fontWeight: '700' }}>Stop Time</Text>
        </Button>
      ) : (
        <Button
          icon={() => startIcon}
          mode="text"
          onPress={startTimer}
          style={styles.ButtonStyle}
          textColor="#346463"
        >
          <Text style={{ fontSize: 10, fontWeight: '700' }}>Start Time</Text>
        </Button>
      )} */}

      {!isRunning &&
        !elapsedTime > 0 &&
         <Button
         icon={() => startIcon}
         mode="text"
         onPress={startTimer}
         style={styles.ButtonStyle}
         textColor="#346463"
       >
         <Text style={{ fontSize: 12, fontWeight: '700' }}>Start Time</Text>
       </Button>
      }

      {
      ! isRunning &&
      elapsedTime > 0 && 
        <Text
          style={{ fontWeight: '700', color: '#f64a6d',fontSize:12 }}
        >
           Duration of Sample Collection:{' '}
    {`${Math.floor(elapsedTime / 3600000) > 0 ? `${Math.floor(elapsedTime / 3600000)} hours ` : ''} ${Math.floor((elapsedTime % 3600000) / 60000) > 0 ? `${Math.floor((elapsedTime % 3600000) / 60000)} min ` : ''} ${Math.floor((elapsedTime % 60000) / 1000)} sec`}
        </Text>
      }
     
    </View>
    </>
  );
}

export default React.memo(Timer);
