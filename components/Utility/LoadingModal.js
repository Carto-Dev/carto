import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Portal, Modal} from 'react-native-paper';

/**
 * Component to indicate loading state.
 * @param visible State for the modal to be visible or not
 */
export const LoadingModalComponent = ({visible}) => {
  return (
    <Portal>
      <Modal visible={visible} dismissable={false}>
        <ActivityIndicator animating={true} color={'white'} size="large" />
      </Modal>
    </Portal>
  );
};
