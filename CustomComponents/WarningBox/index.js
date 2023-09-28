import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Animated, Easing, ActivityIndicator, TouchableOpacity } from 'react-native';
import { IconButton, Portal, Provider } from 'react-native-paper';
import { Ionicons,AntDesign } from '@expo/vector-icons';

const WarningBox = ({ visible, message, onClose, Icon,success }) => {
  const [showContent, setShowContent] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      if (Icon === undefined) {
        setShowContent(true);
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      } else {
        setShowContent(false);
        setTimeout(() => {
          setShowContent(true);
          Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start();
        }, 5000);
      }
    } else {
      setShowContent(false);
      animation.setValue(0);
    }
  }, [visible, animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} transparent animationType="fade">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ 
                backgroundColor:'#3e2298',
                width: '80%', 
                padding: 20, 
                borderRadius: 10,
                borderWidth:1,
                borderColor:'#ccc' 
                }}>
              {showContent ? (
                <>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={onClose}>
                    <AntDesign name="closesquare" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <Animated.View style={{ marginBottom: 10, alignItems: 'center', opacity }}>
                    <Ionicons name={Icon!=='warning'?Icon:'warning-outline'} size={36} color={Icon!=='warning' ? '#67cba3' : '#ce527f'} />
                  </Animated.View>
                  <Animated.Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20,color:Icon!=='warning'?'#fff':'#fa6674', opacity, transform: [{ translateY }] }}>
                    {message}
                  </Animated.Text>
                </>
              ) : (
                <View style={{ alignItems: 'flex-start' }}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )}
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default React.memo(WarningBox);
