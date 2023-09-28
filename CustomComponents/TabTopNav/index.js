import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const DynamicTabNavigation = ({ screensWithParams }) => {
  return (
     <Tab.Navigator
     screenOptions={{
        tabBarStyle: { backgroundColor: '#f3f8fb' },
        tabBarLabelStyle: { fontWeight:'bold' },
      }}
     >
        {screensWithParams.map(({ screen: ScreenComponent, params }, index) => (
          <Tab.Screen
            key={index}
            name={`Tab${index + 1}`}
            options={{ title: `Waste Water Tab ${index + 1}`}}
            initialParams={params}
            component={ScreenComponent}
          />
        ))}
      </Tab.Navigator>
  );
};

export default DynamicTabNavigation;
