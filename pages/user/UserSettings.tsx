import React from 'react';
import {StyleSheet, View} from 'react-native';
import UserProfileSettings from './UserProfleSettings';

const UserSettings: React.FC = () => {
  return (
    // <View style={styles.rootView}>
    <UserProfileSettings />
    // </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default UserSettings;
