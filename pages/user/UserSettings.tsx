import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import UserDeleteSettings from './UserDeleteSettings';
import UserEmailSettings from './UserEmailSettings';
import UserPasswordSettings from './UserPasswordSettings';
import UserProfileSettings from './UserProfileSettings';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useTheme} from 'react-native-paper';

const renderScene = SceneMap({
  update_profile: UserProfileSettings,
  update_email: UserEmailSettings,
  update_password: UserPasswordSettings,
  delete_account: UserDeleteSettings,
});

const renderTabBar = (props: any) => {
  const theme = useTheme();
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: theme.colors.primary}}
      style={{backgroundColor: theme.colors.background}}
    />
  );
};

const UserSettings: React.FC = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'update_profile', title: 'Update Profile'},
    {key: 'update_email', title: 'Update Email'},
    {key: 'update_password', title: 'Update Password'},
    {key: 'delete_account', title: 'Delete Account'},
  ]);
  return (
    // <View style={styles.rootView}>
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
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
