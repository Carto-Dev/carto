import React from 'react';
import {StyleSheet} from 'react-native';
import {Portal, Modal, useTheme} from 'react-native-paper';
import LoadingAnimation from '../Lottie/LoadingAnimation';

type Props = {
  visible: boolean;
  message: string;
};

/**
 * Component to indicate loading state.
 * @param visible State for the modal to be visible or not
 * @param message Message to display while loading.
 */
export const LoadingModalComponent: React.FC<Props> = ({visible, message}) => {
  // Theme Hook.
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        style={styles.modalView}
        contentContainerStyle={{
          ...styles.modalContainer,
          backgroundColor: theme.colors.background,
        }}>
        <LoadingAnimation message={message} />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    margin: 30,
    borderRadius: 30,
  },
});
