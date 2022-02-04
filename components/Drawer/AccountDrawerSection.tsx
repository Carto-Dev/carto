import React from 'react';
import * as authService from './../../services/auth.service';
import {List} from 'react-native-paper';

/**
 * Account Section of the Drawer.
 * Consists of displaying account
 * details and deleting the account as well.
 */
const AccountDrawerSectionComponent: React.FC = () => {
  // Fetching the current logged in user details.
  const user = authService.currentUser();

  return (
    <List.Accordion
      title="Account Settings"
      left={(props) => <List.Icon {...props} icon="account" />}>
      <List.Item
        title={user.displayName}
        right={(props) => <List.Icon {...props} icon="account-details" />}
      />
      <List.Item
        title="Log Out"
        onPress={async () => await authService.logout()}
        right={(props) => <List.Icon {...props} icon="account-minus" />}
      />
      <List.Item
        title="Update Account Details"
        right={(props) => <List.Icon {...props} icon="account-edit" />}
      />
      <List.Item
        title="Delete Account"
        right={(props) => <List.Icon {...props} icon="account-remove" />}
      />
    </List.Accordion>
  );
};

export default AccountDrawerSectionComponent;
