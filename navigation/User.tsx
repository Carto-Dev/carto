import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserStackParamsList} from '../types/user-stack.type';
import UserSettings from '../pages/user/UserSettings';

// Products Stack Navigator.
const UserStack = createNativeStackNavigator<UserStackParamsList>();

const UserNavigator: React.FC = () => {
  return (
    <UserStack.Navigator initialRouteName={'UserSettingsPage'}>
      <UserStack.Screen
        name={'UserSettingsPage'}
        component={UserSettings}
        options={{
          headerShown: false,
        }}
      />
    </UserStack.Navigator>
  );
};

export default UserNavigator;
