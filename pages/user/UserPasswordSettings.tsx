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
import {UpdatePasswordDto} from '../../dtos/user/update-password.dto';
import {AuthError} from '../../enum/auth-error.enum';
import {Connectivity} from '../../enum/connectivity-error.enum';
import * as authService from './../../services/auth.service';
import * as userService from './../../services/user.service';

const UserPasswordSettings: React.FC = () => {
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

  const onPasswordUpdate = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    // Set loading state to true.
    setLoading(true);
    try {
      const updatePasswordDto = UpdatePasswordDto.fromJson(values);

      await userService.updatePassword(updatePasswordDto);

      displaySnackbar('Password Updated');
    } catch (error) {
      if (error.message === Connectivity.OFFLINE.toString()) {
        displaySnackbar('You are offline.');
      } else if (error.message === AuthError.USER_NOT_FOUND.toString()) {
        displaySnackbar('User not found, are you logged in?');
      } else if (error.message === AuthError.WRONG_PASSWORD.toString()) {
        displaySnackbar('Your password is wrong');
      } else if (
        error.message === AuthError.ACCOUNT_ALREADY_EXISTS.toString()
      ) {
        displaySnackbar('An account already exists for that email address.');
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
      oldPassword: '',
      newPassword: '',
    },
    onSubmit: onPasswordUpdate,
    validationSchema: yup.object().shape({
      oldPassword: yup.string().min(5).required(),
      newPassword: yup.string().min(5).required(),
    }),
  });

  return (
    <React.Fragment>
      <View style={styles.rootView}>
        <ScrollView>
          <View style={styles.mainView}>
            <Title>Update Password</Title>
            <TextInput
              mode="outlined"
              label="Your Old Password"
              value={formik.values.oldPassword}
              onChangeText={formik.handleChange('oldPassword')}
              onBlur={() => formik.setFieldTouched('oldPassword')}
              autoCapitalize="none"
              secureTextEntry
            />
            <HelperText
              type="error"
              visible={
                formik.touched.oldPassword &&
                (formik.errors.oldPassword ? true : false)
              }>
              {formik.errors.oldPassword}
            </HelperText>
            <TextInput
              mode="outlined"
              label="Your New Password"
              value={formik.values.newPassword}
              onChangeText={formik.handleChange('newPassword')}
              onBlur={() => formik.setFieldTouched('newPassword')}
              autoCapitalize="none"
              secureTextEntry
            />
            <HelperText
              type="error"
              visible={
                formik.touched.newPassword &&
                (formik.errors.newPassword ? true : false)
              }>
              {formik.errors.newPassword}
            </HelperText>
            <Button
              mode="contained"
              icon="content-save"
              disabled={isConnected ? !formik.isValid : true}
              onPress={formik.handleSubmit}
              loading={isLoading}>
              Update Password
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

export default UserPasswordSettings;
