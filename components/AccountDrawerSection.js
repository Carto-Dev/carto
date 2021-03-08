import React from 'react';
import * as AuthUtils from './../utils/auth';
import {List} from 'react-native-paper';

const AccountDrawerSectionComponent = () => {
  const user = AuthUtils.currentUser();

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
        onPress={async () => await AuthUtils.logout()}
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
