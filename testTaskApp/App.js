import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskOneScreen from './screens/TaskOneScreen';
import TaskTwoScreen from './screens/TaskTwoScreen';
import TaskThreeScreen from './screens/TaskThreeScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Task 1" component={TaskOneScreen} />
          <Tab.Screen name="Task 2" component={TaskTwoScreen} />
          <Tab.Screen name="Task 3" component={TaskThreeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;

