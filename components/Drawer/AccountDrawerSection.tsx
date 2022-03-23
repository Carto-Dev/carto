import React from 'react';
import * as authService from './../../services/auth.service';
import {List} from 'react-native-paper';
import {useIsConnected} from 'react-native-offline';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

type Props = {
  navigation: DrawerNavigationHelpers;
};

/**
 * Account Section of the Drawer.
 * Consists of displaying account
 * details and deleting the account as well.
 */
const AccountDrawerSectionComponent: React.FC<Props> = ({navigation}) => {
  // Fetching the current logged in user details.
  const user = authService.currentUser();

  const isConnected = useIsConnected();

  return (
    <List.Accordion
      title="Account Settings"
      left={(props) => <List.Icon {...props} icon="account" />}>
      <List.Item
        title={user.displayName}
        right={(props) => <List.Icon {...props} icon="account-details" />}
        onPress={isConnected ? () => {} : () => {}}
      />
      <List.Item
        title="User Settings"
        onPress={async () => navigation.navigate('UserSettings')}
        right={(props) => <List.Icon {...props} icon="account-edit" />}
      />
      <List.Item
        title="Log Out"
        onPress={async () => await authService.logout()}
        right={(props) => <List.Icon {...props} icon="account-minus" />}
      />
    </List.Accordion>
  );
};

export default AccountDrawerSectionComponent;
