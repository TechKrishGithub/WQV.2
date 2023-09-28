import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

 const AnimatedClockIcon = () => {
  const rotationRef = useRef(0);
  const iconRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      rotationRef.current += 180;
      if (iconRef.current) {
        iconRef.current.setNativeProps({
          style: { transform: [{ rotate: `${rotationRef.current}deg` }] },
        });
      }
    }, 800); // The interval controls the rotation speed (lower value for faster rotation)

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        ref={iconRef}
        name="timer-sand"
        size={24}
        color="#2e2878"
        style={{
          margin: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default React.memo(AnimatedClockIcon)
