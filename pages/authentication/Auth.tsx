import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Title,
  Snackbar,
  useTheme,
  Text,
} from 'react-native-paper';
import * as yup from 'yup';
import {useFormik} from 'formik';
import * as authService from './../../services/auth.service';
import {LoadingModalComponent} from '../../components/Utility/LoadingModal';
import {CreateUserDto} from '../../dtos/auth/create-user.dto';
import {LoginUserDto} from '../../dtos/auth/login-user.dto';
import {AuthError} from '../../enum/auth-error.enum';
import {Connectivity} from './../../enum/connectivity-error.enum';
import {useIsConnected} from 'react-native-offline';

/**
 * Login and Registration Pages.
 */
const AuthPage: React.FC = () => {
  // Theme Object.
  const theme = useTheme();

  // Loading and error message states.
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Login or registration state.
  const [isLogin, setLogin] = useState(false);

  // Set snackbar visible or not.
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Password Again and Error states.
  const [passwordAgain, setPasswordAgain] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  const isConnected = useIsConnected();

  // Listen to the error message state and display errors if any.
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Something went wrong!', errorMessage, [
        {
          text: 'Okay',
          onPress: () => {
            setErrorMessage(null);
            setLoading(false);
          },
        },
      ]);
    }
  }, [errorMessage]);

  /**
   * Firebase Login Method
   * @param values Form values
   */
  const onLoginWithEmailAddressAndPassword = async (values: {
    emailAddress: string;
    password: string;
  }) => {
    // Set loading state to true.
    setLoading(true);

    // Set an empty password error state.
    setPasswordError(null);
    try {
      // Create a new DTO object using form values.
      const loginUserDto = new LoginUserDto();
      loginUserDto.fromJson(values);

      // Login with the given DTO.
      await authService.loginWithEmailAddressAndPassword(loginUserDto);
    } catch (error) {
      // Handle errors gracefully
      if (error.message === AuthError.USER_NOT_FOUND.toString()) {
        setErrorMessage('Account with this email address does not exist.');
      } else if (error.message === AuthError.WRONG_PASSWORD.toString()) {
        setErrorMessage('Account with this email address does not exist.');
      } else if (error.message === AuthError.INTERNAL_SERVER_ERROR.toString()) {
        setErrorMessage('Something went wrong please try again later.');
      } else if (error.message === Connectivity.OFFLINE.toString()) {
        setErrorMessage('You are offline.');
      } else {
        setErrorMessage('Something went wrong please try again later.');
      }
    }
    // Set loading state as false.
    setLoading(false);
  };

  /**
   * Server user registration method.
   * @param values Form values
   */
  const onRegisterWithEmailAddressAndPassword = async (values: {
    displayName: string;
    emailAddress: string;
    password: string;
  }) => {
    // Set loading state to true.
    setLoading(true);

    // Set an empty password error state.
    setPasswordError(null);
    try {
      // Create a new DTO object using form values.
      const createUserDto = new CreateUserDto();
      createUserDto.fromJson(values);

      // Register a new account with the given DTO.
      await authService.registerWithEmailAddressAndPassword(createUserDto);

      // Set login form email address values after successfull account creation.
      loginFormik.values.emailAddress = values.emailAddress;

      // Switch form mode.
      onSwitchMode();

      displaySnackbar('Accout created successfully');
    } catch (error) {
      // Handle errors gracefully
      if (error.message === AuthError.ACCOUNT_ALREADY_EXISTS.toString()) {
        displaySnackbar('Account with this email address already exists.');
      } else if (error.message === Connectivity.OFFLINE.toString()) {
        displaySnackbar('You are offline.');
      } else {
        displaySnackbar('Something went wrong please try again later.');
      }
    }

    // Set loading state as false.
    setLoading(false);
  };

  // Login Formik hook with initial values,
  // submit function and validation schema.
  const loginFormik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
    },
    onSubmit: onLoginWithEmailAddressAndPassword,
    validationSchema: yup.object().shape({
      emailAddress: yup.string().email().required(),
      password: yup.string().min(5).required(),
    }),
  });

  // Registration Formik hook with initial values,
  // submit function and validation schema.
  const registrationFormik = useFormik({
    initialValues: {
      displayName: '',
      emailAddress: '',
      password: '',
    },
    onSubmit: onRegisterWithEmailAddressAndPassword,
    validationSchema: yup.object().shape({
      displayName: yup.string().min(5).required(),
      emailAddress: yup.string().email().required(),
      password: yup.string().min(5).required(),
    }),
  });

  // Switch mode to registration/login mode.
  const onSwitchMode = () => setLogin(!isLogin);

  // Password Again state.
  const onReenterPassword = (text: string) => setPasswordAgain(text);

  const [snackbarMessage, setSnackBarMessage] = useState<string>('');

  const displaySnackbar = (message: string) => {
    setSnackBarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="height" style={styles.rootView}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={require('./../../assets/img/app-icons/app-icon.png')}
            />
            <Title style={styles.titleText}>Carto</Title>
          </View>
          <Surface style={styles.surfaceView}>
            <ScrollView>
              {!isLogin && (
                <>
                  <TextInput
                    mode="outlined"
                    label="Enter Your Name"
                    value={registrationFormik.values.displayName}
                    onChangeText={registrationFormik.handleChange(
                      'displayName',
                    )}
                    autoCapitalize="none"
                  />
                  <HelperText
                    type="error"
                    visible={
                      registrationFormik.touched.displayName &&
                      (registrationFormik.errors.displayName ? true : false)
                    }>
                    {registrationFormik.errors.displayName}
                  </HelperText>
                </>
              )}
              <TextInput
                mode="outlined"
                label="Email Address"
                value={
                  isLogin
                    ? loginFormik.values.emailAddress
                    : registrationFormik.values.emailAddress
                }
                onChangeText={
                  isLogin
                    ? loginFormik.handleChange('emailAddress')
                    : registrationFormik.handleChange('emailAddress')
                }
                onBlur={() =>
                  isLogin
                    ? loginFormik.setFieldTouched('emailAddress')
                    : registrationFormik.setFieldTouched('emailAddress')
                }
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <HelperText
                type="error"
                visible={
                  isLogin
                    ? loginFormik.touched.emailAddress &&
                      (loginFormik.errors.emailAddress ? true : false)
                    : registrationFormik.touched.emailAddress &&
                      (registrationFormik.errors.emailAddress ? true : false)
                }>
                {isLogin
                  ? loginFormik.errors.emailAddress
                  : registrationFormik.errors.emailAddress}
              </HelperText>
              <TextInput
                mode="outlined"
                label="Password"
                value={
                  isLogin
                    ? loginFormik.values.password
                    : registrationFormik.values.password
                }
                onChangeText={
                  isLogin
                    ? loginFormik.handleChange('password')
                    : registrationFormik.handleChange('password')
                }
                onBlur={() =>
                  isLogin
                    ? loginFormik.setFieldTouched('password')
                    : registrationFormik.setFieldTouched('password')
                }
                autoCapitalize="none"
                secureTextEntry={true}
              />
              <HelperText
                type="error"
                visible={
                  isLogin
                    ? loginFormik.touched.password &&
                      (loginFormik.errors.password ? true : false)
                    : registrationFormik.touched.password &&
                      (registrationFormik.errors.password ? true : false)
                }>
                {isLogin
                  ? loginFormik.errors.password
                  : registrationFormik.errors.password}
              </HelperText>
              {!isLogin && (
                <>
                  <TextInput
                    mode="outlined"
                    label="Enter Password Again"
                    value={passwordAgain}
                    onChangeText={onReenterPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                  />
                  <HelperText type="error" visible={passwordError}>
                    {passwordError}
                  </HelperText>
                </>
              )}
              <View style={styles.buttonView}>
                <Button
                  mode="contained"
                  icon="login"
                  disabled={
                    isConnected
                      ? isLogin
                        ? !loginFormik.isValid
                        : !registrationFormik.isValid
                      : true
                  }
                  onPress={
                    isLogin
                      ? loginFormik.handleSubmit
                      : registrationFormik.handleSubmit
                  }>
                  {isLogin ? 'Log In' : 'Sign In'}
                </Button>
                <Button
                  mode="contained"
                  icon="toggle-switch"
                  onPress={onSwitchMode}>
                  Switch to {isLogin ? 'Sign In' : 'Log In'}
                </Button>
              </View>
            </ScrollView>
          </Surface>
        </KeyboardAvoidingView>
      </ScrollView>
      <LoadingModalComponent
        visible={isLoading}
        message={isLogin ? 'Logging You In!' : 'Signing You In!'}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={{
          backgroundColor: theme.colors.surface,
        }}
        action={{
          color: theme.colors.primary,
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.get('screen').height * 0.1,
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Dimensions.get('screen').height * 0.03,
  },
  image: {
    height: Dimensions.get('screen').height * 0.3,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: Dimensions.get('screen').height * 0.03,
  },
  surfaceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Dimensions.get('screen').height * 0.03,
    width: Dimensions.get('screen').width * 0.9,
    elevation: 4,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonView: {
    margin: Dimensions.get('screen').height * 0.01,
    padding: Dimensions.get('screen').height * 0.01,
    height: Dimensions.get('screen').height * 0.2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default AuthPage;
