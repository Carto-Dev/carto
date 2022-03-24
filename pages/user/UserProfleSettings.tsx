import {useTheme} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsConnected} from 'react-native-offline';
import {
  Button,
  HelperText,
  Snackbar,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import * as yup from 'yup';
import {UpdateUserDto} from '../../dtos/user/update-user.dto';
import {Connectivity} from '../../enum/connectivity-error.enum';
import * as authService from './../../services/auth.service';
import * as userService from './../../services/user.service';

const UserProfileSettings: React.FC = () => {
  const user = authService.currentUser();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState<string>('');

  const theme = useTheme();
  const isConnected = useIsConnected();

  const displaySnackbar = (message: string) => {
    setSnackBarMessage(message);
    setSnackBarVisible(true);
  };

  const onProfileUpdate = async (values: {displayName: string}) => {
    // Set loading state to true.
    setLoading(true);
    try {
      const updateUserDto = UpdateUserDto.fromJson(values);

      await userService.updateUser(updateUserDto);

      displaySnackbar('Profile Updated');
    } catch (error) {
      if (error.message === Connectivity.OFFLINE.toString()) {
        displaySnackbar('You are offline.');
      } else {
        console.log(error);
        displaySnackbar('Something went wrong, please try again later');
      }
    }
    // Set loading state as false.
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      displayName: user.displayName,
    },
    onSubmit: onProfileUpdate,
    validationSchema: yup.object().shape({
      displayName: yup.string().required().min(5),
    }),
  });

  return (
    <React.Fragment>
      <View style={styles.rootView}>
        <ScrollView>
          <View style={styles.mainView}>
            <Title>Update Profile</Title>
            <TextInput
              mode="outlined"
              label="Your Name"
              value={formik.values.displayName}
              onChangeText={formik.handleChange('displayName')}
              onBlur={() => formik.setFieldTouched('displayName')}
              autoCapitalize="none"
              keyboardType="default"
            />
            <HelperText
              type="error"
              visible={
                formik.touched.displayName &&
                (formik.errors.displayName ? true : false)
              }>
              {formik.errors.displayName}
            </HelperText>
            <Button
              mode="contained"
              icon="content-save"
              disabled={isConnected ? !formik.isValid : true}
              onPress={formik.handleSubmit}
              loading={isLoading}>
              Update Profile
            </Button>
          </View>
        </ScrollView>
      </View>
      <Snackbar
        style={{
          backgroundColor: theme.colors.background,
        }}
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        action={{
          label: 'OKAY',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        <Text>{snackbarMessage}</Text>
      </Snackbar>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainView: {
    width: Dimensions.get('screen').width * 0.8,
  },
});

export default UserProfileSettings;
