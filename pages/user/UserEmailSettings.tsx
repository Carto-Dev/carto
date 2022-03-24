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
import {UpdateEmailAddressDto} from '../../dtos/user/update-email-address.dto';
import {AuthError} from '../../enum/auth-error.enum';
import {Connectivity} from '../../enum/connectivity-error.enum';
import * as authService from './../../services/auth.service';
import * as userService from './../../services/user.service';

const UserEmailSettings: React.FC = () => {
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

  const onEmailAddressUpdate = async (values: {
    emailAddress: string;
    password: string;
  }) => {
    // Set loading state to true.
    setLoading(true);
    try {
      const updateEmailAddressDto = UpdateEmailAddressDto.fromJson(values);

      await userService.updateEmailAddress(updateEmailAddressDto);

      displaySnackbar('Email Address Updated');
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
      emailAddress: user.email,
      password: '',
    },
    onSubmit: onEmailAddressUpdate,
    validationSchema: yup.object().shape({
      emailAddress: yup.string().email().required(),
      password: yup.string().min(5).required(),
    }),
  });

  return (
    <React.Fragment>
      <View style={styles.rootView}>
        <ScrollView>
          <View style={styles.mainView}>
            <Title>Update Email Address</Title>
            <TextInput
              mode="outlined"
              label="Your New Email Address"
              value={formik.values.emailAddress}
              onChangeText={formik.handleChange('emailAddress')}
              onBlur={() => formik.setFieldTouched('emailAddress')}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <HelperText
              type="error"
              visible={
                formik.touched.emailAddress &&
                (formik.errors.emailAddress ? true : false)
              }>
              {formik.errors.emailAddress}
            </HelperText>
            <TextInput
              mode="outlined"
              label="Your Password"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={() => formik.setFieldTouched('password')}
              autoCapitalize="none"
              secureTextEntry
            />
            <HelperText
              type="error"
              visible={
                formik.touched.emailAddress &&
                (formik.errors.emailAddress ? true : false)
              }>
              {formik.errors.emailAddress}
            </HelperText>
            <Button
              mode="contained"
              icon="content-save"
              disabled={isConnected ? !formik.isValid : true}
              onPress={formik.handleSubmit}
              loading={isLoading}>
              Update Email Address
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

export default UserEmailSettings;
