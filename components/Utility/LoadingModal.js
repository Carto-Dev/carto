import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Portal, Modal} from 'react-native-paper';

export const LoadingModalComponent = (props) => {
  return (
    <Portal>
      <Modal visible={props.visible}>
        <ActivityIndicator animating={true} color={'white'} size="large" />
      </Modal>
    </Portal>
  );
};
