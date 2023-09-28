// import React, { useEffect, useRef } from 'react';
// import { View, Animated, Easing } from 'react-native';
// import { styles } from './style';

//  const LoadingScreen = () => {
//   const lines = Array.from({ length: 6 }, (_, index) => {
//     const height = useRef(new Animated.Value(25)).current;
//     const color = useRef(new Animated.Value(0)).current;

//     return { height, color };
//   });

//   useEffect(() => {
//     const animationSequence = () => {
//       const animations = lines.map(({ height, color }) =>
//         Animated.sequence([
//           Animated.parallel([
//             Animated.timing(height, {
//               toValue: 40,
//               duration: 500,
//               easing: Easing.inOut(Easing.ease),
//               useNativeDriver: false,
//             }),
//             Animated.timing(color, {
//               toValue: 1,
//               duration: 500,
//               easing: Easing.inOut(Easing.ease),
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.parallel([
//             Animated.timing(height, {
//               toValue: 20,
//               duration: 500,
//               easing: Easing.inOut(Easing.ease),
//               useNativeDriver: false,
//             }),
//             Animated.timing(color, {
//               toValue: 0,
//               duration: 500,
//               easing: Easing.inOut(Easing.ease),
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.delay(100),
//         ])
//       );

//       Animated.loop(Animated.stagger(100, animations)).start();
//     };

//     animationSequence();
//   }, [lines]);

//   return (
//     <View style={styles.container}>
//       {lines.map(({ height, color }, index) => (
//         <Animated.View
//           key={index}
//           style={[
//             styles.line,
//             {
//               height: height,
//               backgroundColor: color.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [`rgba(55, 188, 155, 0.1)`, `rgba(55, 188, 155, 0.8)`],
//               }),
//             },
//           ]}
//         />
//       ))}
//     </View>
//   );
// };

// export default React.memo(LoadingScreen);



import React, { useEffect, memo, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { styles } from './style';

const LoadingScreen = (props) => {
  const {myText}=props;
  const dotColors = ['#9e9cf6', '#9e9cf6', '#9e9cf6'];
  const dotAnimations = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ];
  const textAnimation = useRef(new Animated.Value(0)).current;

  const animate = (animation, delay) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
      { delay: delay }
    ).start();
  };

  useEffect(() => {
    dotAnimations.forEach((animation, index) => {
      animate(animation, index * 200);
    });

    // Animate the text
    Animated.loop(
      Animated.sequence([
        Animated.timing(textAnimation, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(textAnimation, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const dotStyles = dotAnimations.map((animation, index) => ({
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
    backgroundColor: dotColors[index],
  }));

  const textScale = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1], // You can adjust the scale values
  });

  const textOpacity = textAnimation;

  return (
    <View style={styles.container}>
    <View style={{flexDirection:'row'}}>
      {dotStyles.map((style, index) => (
        <Animated.View key={index} style={[styles.dot, style]} />
      ))}
      </View>
      <Animated.Text
        style={[
          styles.text,
            {
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transform: [{ scale: textScale }],
              opacity: textOpacity,
            },
        ]}
      >
       {myText?
      myText:
      'W E I S'
      }
      </Animated.Text>
      
    </View>
  );
};

export default memo(LoadingScreen);
