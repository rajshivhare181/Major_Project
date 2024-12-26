import { View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';

const DrawerScreenAnimation = ({ children }) => {
  const drawerProgress = useDrawerProgress(); // Getting the drawer progress

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      drawerProgress.value,
      [0, 1],
      [1, 0.87],
      'clamp'
    );
    const rotateY = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, -10],
      'clamp'
    );

    return {
      transform: [
        { perspective: 800 },
        { scale },
        { rotateY: `${rotateY}deg` }, // RotateY expects a string with 'deg'
      ],
      borderRadius: 10,
      overflow: 'hidden',
    };
  });

  return <Animated.View style={[{ flex: 1 }, animatedStyle]}>{children}</Animated.View>;
};

export default DrawerScreenAnimation;
